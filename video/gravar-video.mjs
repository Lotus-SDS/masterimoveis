// Grava a rolagem do site em MP4 com o relógio das animações travado quadro a quadro.
//
// Uso:
//   MODO=celular node gravar-video.mjs [saida.mp4]
//   MODO=desktop node gravar-video.mjs [saida.mp4]
//
// Variáveis:
//   MODO ........ celular (390x844, 3x -> 1080 px de largura) ou desktop (1440x810, 2x -> 1920x1080)
//   SITE_URL .... endereço do site (padrão: ../index.html ao lado deste script)
//   FFMPEG ...... caminho do ffmpeg com libx264 (padrão: ffmpeg do sistema)
//   PLAYWRIGHT .. caminho do módulo playwright ou playwright-core (padrão: 'playwright')
//   ATE ......... grava só até este segundo (para testes rápidos)
//
// Como funciona: antes de qualquer script da página, Date.now, performance.now e
// requestAnimationFrame são trocados por um relógio que só anda quando este script manda.
// Cada quadro avança exatamente 1/30 s no GSAP, no ScrollTrigger e na Lenis. As transições
// CSS são pausadas e avançadas na mão. Os quadros vão direto para o ffmpeg (sem disco).

import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const MODO = process.env.MODO || 'celular';
const aqui = path.dirname(fileURLToPath(import.meta.url));
const SAIDA = path.resolve(process.argv[2] || path.join(aqui, `master-imoveis-${MODO}.mp4`));
const SITE = process.env.SITE_URL || new URL('../index.html', import.meta.url).href;
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const ATE = process.env.ATE ? parseFloat(process.env.ATE) : Infinity;
const FPS = 30;
const DT = 1000 / FPS;

const { chromium } = await import(process.env.PLAYWRIGHT || 'playwright');

const PRESETS = {
  celular: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, largura: 1080 },
  desktop: { viewport: { width: 1440, height: 810 }, deviceScaleFactor: 2, largura: 1920 }
};
const preset = PRESETS[MODO];
if (!preset) throw new Error(`MODO desconhecido: ${MODO}`);

/* ---------- relógio controlado (roda dentro da página, antes de tudo) ---------- */
const relogio = () => {
  const realRAF = window.requestAnimationFrame.bind(window);
  const perf0 = performance.now();
  const data0 = Date.now();
  let passado = 0;
  let fila = [];
  let seq = 0;
  window.__cap = {
    realRAF,
    avancar(ms) {
      passado += ms;
      const agora = perf0 + passado;
      const lote = fila;
      fila = [];
      for (const [, cb] of lote) {
        try { cb(agora); } catch (e) { console.error(e); }
      }
    },
    // transições e animações CSS andam no mesmo passo do relógio
    passoCss(ms) {
      for (const a of document.getAnimations()) {
        if (a.playState === 'running') a.pause();
        if (a.playState === 'paused') a.currentTime = (a.currentTime || 0) + ms;
      }
    },
    quadroReal: () => new Promise((r) => realRAF(() => r()))
  };
  window.requestAnimationFrame = (cb) => { seq += 1; fila.push([seq, cb]); return seq; };
  window.cancelAnimationFrame = (id) => { fila = fila.filter(([n]) => n !== id); };
  performance.now = () => perf0 + passado;
  Date.now = () => data0 + passado;
};

/* ---------- curvas de rolagem ---------- */
const suave = (x) => 0.5 - Math.cos(Math.PI * x) / 2;
// perfil trapezoidal: acelera, anda constante, freia (bom para a subida longa)
const trapezio = (x, borda = 0.12) => {
  const v = 1 / (1 - borda);
  if (x < borda) return (v * x * x) / (2 * borda);
  if (x > 1 - borda) { const y = 1 - x; return 1 - (v * y * y) / (2 * borda); }
  return v * (x - borda / 2);
};

/* ---------- roteiro ---------- */
function roteiro(m) {
  const passos = [];
  let y = 0;
  const pausa = (s) => passos.push({ tipo: 'pausa', dur: s });
  const ir = (destino, s, curva = suave) => { passos.push({ tipo: 'rolar', de: y, para: destino, dur: s, curva }); y = destino; };
  const fazer = (js) => passos.push({ tipo: 'acao', js });
  const max = m.docH - m.vh;
  const clamp = (v) => Math.max(0, Math.min(max, Math.round(v)));
  const inicioSubida = m.aTop;
  const fimSubida = m.aTop + m.aH - m.vh;

  // 1. abertura: MASTER sobe atrás das torres
  pausa(3.8);

  // 2. busca em uso
  if (MODO === 'celular') {
    ir(clamp(m.search + m.searchH - m.vh + 24), 1.6);
    pausa(0.4);
  }
  fazer(`document.querySelector('#busca input[value="aluguel"]').click()`);
  pausa(0.6);
  fazer(`(() => { const s = document.querySelector('#busca select[name="tipo"]'); s.focus(); s.value = 'apartamento'; s.dispatchEvent(new Event('change', { bubbles: true })); })()`);
  pausa(0.6);
  fazer(`(() => { const s = document.querySelector('#busca select[name="local"]'); s.focus(); s.value = 'vitoria|praia-do-canto'; s.dispatchEvent(new Event('change', { bubbles: true })); })()`);
  pausa(0.6);
  fazer(`(() => { const s = document.querySelector('#busca select[name="quartos"]'); s.focus(); s.value = '2-quartos'; s.dispatchEvent(new Event('change', { bubbles: true })); })()`);
  pausa(0.9);
  fazer(`document.activeElement && document.activeElement.blur()`);

  // 3. a subida: do térreo à cobertura e o recuo para Vitória
  ir(inicioSubida, MODO === 'celular' ? 1.4 : 1.8);
  pausa(0.9);
  ir(fimSubida, 19, trapezio);
  pausa(1.2);

  // 4. destaques
  ir(clamp(m.destaques), 1.6);
  pausa(1.0);
  if (MODO === 'celular') {
    passos.push({ tipo: 'carrossel', dur: 2.6 });
    pausa(0.4);
  } else {
    pausa(0.6);
    fazer(`document.getElementById('tab-aluguel').click()`);
    pausa(1.8);
  }

  // 5. bairros
  ir(clamp(m.bairros), 1.8);
  pausa(1.1);
  if (MODO === 'celular') { ir(clamp(m.bairros + m.bairrosH - m.vh), 3.2); pausa(0.5); }

  // 6. a Master: 30 anos
  ir(clamp(MODO === 'celular' ? m.sobreTitulo - 120 : m.sobre), 1.9);
  pausa(1.9);
  if (MODO === 'celular') { ir(clamp(m.sobreTitulo + 520), 1.8); pausa(0.4); }

  // 7. anuncie
  ir(clamp(m.anunciar), 1.9);
  pausa(1.4);
  if (MODO === 'celular') { ir(clamp(m.anunciar + m.anunciarH - m.vh), 2.4); pausa(0.4); }

  // 8. contato e rodapé
  ir(clamp(m.contato), 1.9);
  pausa(1.3);
  ir(max, 2.6);
  pausa(2.6);
  return passos;
}

/* ---------- gravação ---------- */
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'] });
const ctx = await browser.newContext({ ...preset, reducedMotion: 'no-preference', locale: 'pt-BR' });
await ctx.addInitScript(relogio);
const page = await ctx.newPage();
page.on('pageerror', (e) => console.error('pageerror:', e.message));
await page.goto(SITE, { waitUntil: 'networkidle', timeout: 120000 });

// tudo carregado e decodificado antes do primeiro quadro; captura sem encaixe de rolagem no carrossel
await page.evaluate(async () => {
  document.querySelectorAll('img[loading="lazy"], iframe[loading="lazy"]').forEach((el) => { el.loading = 'eager'; });
  await document.fonts.ready;
  await Promise.all(Array.from(document.images).map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; setTimeout(r, 8000); }))));
  await Promise.all(Array.from(document.images).map((img) => (img.decode ? img.decode().catch(() => {}) : null)));
  const st = document.createElement('style');
  st.textContent = '.cards{scroll-snap-type:none!important;scroll-behavior:auto!important}';
  document.head.append(st);
});
await page.waitForTimeout(1500);
// deixa os scripts se organizarem sem o tempo andar (medidas, ScrollTrigger)
for (let i = 0; i < 6; i++) await page.evaluate(async () => { window.__cap.avancar(0); await window.__cap.quadroReal(); });

const m = await page.evaluate(() => {
  const topo = (sel) => { const el = document.querySelector(sel); return el.getBoundingClientRect().top + window.scrollY; };
  const alto = (sel) => document.querySelector(sel).offsetHeight;
  const ascent = document.querySelector('.ascent');
  const spacer = ascent.parentElement.classList.contains('pin-spacer') ? ascent.parentElement : (ascent.querySelector('.pin-spacer') || ascent);
  return {
    vh: window.innerHeight,
    docH: document.documentElement.scrollHeight,
    aTop: spacer.getBoundingClientRect().top + window.scrollY,
    aH: spacer.offsetHeight,
    search: topo('#busca'), searchH: alto('#busca'),
    destaques: topo('#destaques'),
    bairros: topo('#bairros'), bairrosH: alto('#bairros'),
    sobre: topo('#sobre'), sobreTitulo: topo('#about-title'),
    anunciar: topo('#anunciar'), anunciarH: alto('#anunciar'),
    contato: topo('#contato')
  };
});
const passos = roteiro(m);
const total = passos.reduce((s, p) => s + (p.dur || 0), 0);
const duracao = Math.min(total, ATE);
const quadros = Math.round(duracao * FPS);
console.log(`[${MODO}] medidas`, JSON.stringify(m));
console.log(`[${MODO}] ${duracao.toFixed(1)} s, ${quadros} quadros -> ${SAIDA}`);

const fadeOut = Math.max(0, duracao - 0.8).toFixed(2);
const ff = spawn(FFMPEG, [
  '-hide_banner', '-loglevel', 'error', '-y',
  '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
  '-vf', `scale=${preset.largura}:-2:flags=lanczos,setsar=1,fade=t=in:st=0:d=0.5,fade=t=out:st=${fadeOut}:d=0.8,format=yuv420p`,
  '-c:v', 'libx264', '-preset', 'slow', '-crf', process.env.CRF || '20', '-profile:v', 'high',
  '-movflags', '+faststart', SAIDA
], { stdio: ['pipe', 'inherit', 'inherit'] });
const escrever = (buf) => new Promise((r) => (ff.stdin.write(buf) ? r() : ff.stdin.once('drain', r)));

// linha do tempo: que passo vale em cada instante
const marcos = [];
{ let t = 0; for (const p of passos) { marcos.push({ ...p, t0: t }); t += p.dur || 0; } }
const feitas = new Set();
let carrosselMax = null;
const t0 = Date.now();

for (let f = 0; f < quadros; f++) {
  const t = f / FPS;
  let alvoY = null;
  let carrossel = null;
  const acoes = [];
  for (let i = 0; i < marcos.length; i++) {
    const p = marcos[i];
    if (p.tipo === 'acao' && p.t0 <= t && !feitas.has(i)) { feitas.add(i); acoes.push(p.js); }
    if (p.tipo === 'rolar' && t >= p.t0) {
      const x = Math.min(1, (t - p.t0) / p.dur);
      alvoY = p.de + (p.para - p.de) * p.curva(x);
    }
    if (p.tipo === 'carrossel' && t >= p.t0 && t <= p.t0 + p.dur) carrossel = suave((t - p.t0) / p.dur);
  }
  if (carrossel !== null && carrosselMax === null) {
    carrosselMax = await page.evaluate(() => { const c = document.querySelector('#painel-venda'); return c.scrollWidth - c.clientWidth; });
  }
  await page.evaluate(async ({ alvoY, acoes, carrossel, carrosselMax, dt }) => {
    if (alvoY !== null && Math.abs(window.scrollY - alvoY) > 0.3) window.scrollTo({ top: alvoY, behavior: 'instant' });
    if (carrossel !== null) document.querySelector('#painel-venda').scrollLeft = carrossel * carrosselMax;
    for (const js of acoes) (0, eval)(js);
    await window.__cap.quadroReal();          // o navegador entrega o evento de rolagem
    window.__cap.avancar(dt);                 // GSAP, ScrollTrigger e Lenis andam 1/30 s
    window.__cap.passoCss(dt);                // transições CSS no mesmo passo
    await window.__cap.quadroReal();
    await window.__cap.quadroReal();          // pinta
  }, { alvoY, acoes, carrossel, carrosselMax, dt: DT });
  await escrever(await page.screenshot({ type: 'jpeg', quality: 94 }));
  if (f % 150 === 0) console.log(`[${MODO}] quadro ${f}/${quadros} (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
}

ff.stdin.end();
await new Promise((r) => ff.on('close', r));
await browser.close();
console.log(`[${MODO}] pronto em ${((Date.now() - t0) / 1000).toFixed(0)} s: ${SAIDA}`);
