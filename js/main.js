/* Master Imóveis: comportamento e movimento.
   Tudo que é conteúdo funciona sem este arquivo; aqui ficam busca, formulários,
   menu e a camada de animação (GSAP + ScrollTrigger + Lenis, via CDN). */
(() => {
  'use strict';

  const CONFIG = {
    // Sistema de busca atual da Master (Universal Software). Troque aqui se mudar.
    busca: 'https://www.masterimoveis.net.br/',
    buscaNovaAba: true,
    whatsapp: '5527997600816',        // atendimento: (27) 99760-0816
    whatsappCaptacao: '5527996493746' // anuncie seu imóvel: (27) 99649-3746
  };

  const doc = document.documentElement;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  const state = { lenis: null, inAscent: false, motion: false };

  /* ------------------------------------------------------------------------
     Utilidades
     ------------------------------------------------------------------------ */

  const buscaUrl = ({ finalidade = 'venda', tipo = 'imoveis', cidade = 'todas-as-cidades', bairro = 'todos-os-bairros', quartos = '0-quartos' } = {}) =>
    `${CONFIG.busca}${finalidade}/${tipo}/${cidade}/${bairro}/${quartos}/0-suite-ou-mais/0-vaga/0-banheiro-ou-mais/todos-os-condominios?valorminimo=0&valormaximo=0&pagina=1`;

  const waUrl = (numero, texto) => `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

  // Abre em nova aba e diz se o navegador deixou (para oferecer o link se bloquear).
  const abrir = (url) => {
    const w = window.open(url, '_blank');
    if (!w) return false;
    try { w.opener = null; } catch (err) { /* janela de outra origem */ }
    return true;
  };

  const debounce = (fn, ms = 150) => {
    let id;
    return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), ms); };
  };

  /* ------------------------------------------------------------------------
     Busca do hero
     ------------------------------------------------------------------------ */

  function initBusca() {
    const form = $('#busca');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const [cidade, bairro] = String(data.get('local') || 'todas-as-cidades|todos-os-bairros').split('|');
      const url = buscaUrl({
        finalidade: data.get('finalidade') || 'venda',
        tipo: data.get('tipo') || 'imoveis',
        cidade,
        bairro,
        quartos: data.get('quartos') || '0-quartos'
      });
      if (!CONFIG.buscaNovaAba || !abrir(url)) window.location.href = url;
    });

    const toggle = $('.search__code-toggle', form);
    const box = $('#codigo-box');
    const input = $('#codigo');
    const botao = $('[data-codigo]', form);

    toggle.addEventListener('click', () => {
      const aberto = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!aberto));
      box.hidden = aberto;
      if (!aberto) input.focus();
    });

    const consultar = () => {
      const codigo = input.value.trim();
      if (!codigo) {
        input.setAttribute('aria-invalid', 'true');
        input.placeholder = 'Digite o código';
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      const url = waUrl(CONFIG.whatsapp, `Olá! Quero informações sobre o imóvel de código ${codigo}.`);
      if (!abrir(url)) window.location.href = url;
    };

    botao.addEventListener('click', consultar);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); consultar(); }
    });
  }

  /* ------------------------------------------------------------------------
     Abas (destaques) e alternador Comprar/Alugar (bairros)
     ------------------------------------------------------------------------ */

  function placeEdge(group) {
    const edge = $('.tabs__edge', group);
    const active = $('[aria-selected="true"], [aria-checked="true"]', group);
    if (!edge || !active) return;
    edge.style.setProperty('--x', `${active.offsetLeft}px`);
    edge.style.setProperty('--s', (active.offsetWidth / 100).toFixed(3));
  }

  function arrowNav(buttons, index, key) {
    if (key !== 'ArrowRight' && key !== 'ArrowLeft') return -1;
    return (index + (key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
  }

  function initListings() {
    const group = $('.listings .tabs');
    if (!group) return;
    const buttons = $$('[role="tab"]', group);
    const panels = buttons.map((b) => document.getElementById(b.getAttribute('aria-controls')));

    const select = (i, focus) => {
      buttons.forEach((b, j) => {
        const on = i === j;
        b.setAttribute('aria-selected', String(on));
        b.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
      });
      placeEdge(group);
      if (focus) buttons[i].focus();
      if (state.motion) {
        window.gsap.fromTo($$('.card', panels[i]),
          { y: 26, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07, ease: 'expo.out', overwrite: true });
      }
    };

    buttons.forEach((b, i) => {
      b.addEventListener('click', () => select(i));
      b.addEventListener('keydown', (e) => {
        const next = arrowNav(buttons, i, e.key);
        if (next > -1) { e.preventDefault(); select(next, true); }
      });
    });
    panels.forEach((p, j) => { p.hidden = j !== 0; });
    placeEdge(group);
  }

  function initPlaces() {
    const group = $('.places .tabs');
    if (!group) return;
    const buttons = $$('[role="radio"]', group);
    const links = $$('.city__list a');

    const set = (btn, focus) => {
      buttons.forEach((b) => {
        const on = b === btn;
        b.setAttribute('aria-checked', String(on));
        b.tabIndex = on ? 0 : -1;
      });
      links.forEach((a) => { a.href = buscaUrl({ finalidade: btn.dataset.fin, cidade: a.dataset.c, bairro: a.dataset.b }); });
      placeEdge(group);
      if (focus) btn.focus();
    };

    buttons.forEach((b, i) => {
      b.tabIndex = b.getAttribute('aria-checked') === 'true' ? 0 : -1;
      b.addEventListener('click', () => set(b));
      b.addEventListener('keydown', (e) => {
        const next = arrowNav(buttons, i, e.key);
        if (next > -1) { e.preventDefault(); set(buttons[next], true); }
      });
    });
    placeEdge(group);
  }

  /* ------------------------------------------------------------------------
     Formulário "Anuncie seu imóvel": valida e escreve a mensagem do WhatsApp
     ------------------------------------------------------------------------ */

  function mascaraTelefone(input) {
    input.addEventListener('input', () => {
      const d = input.value.replace(/\D/g, '').slice(0, 11);
      if (d.length <= 2) { input.value = d; return; }
      const corte = d.length > 10 ? 7 : 6;
      input.value = d.length <= corte
        ? `(${d.slice(0, 2)}) ${d.slice(2)}`
        : `(${d.slice(0, 2)}) ${d.slice(2, corte)}-${d.slice(corte)}`;
    });
  }

  function shake(el) {
    if (reduceMotion.matches) return;
    el.classList.remove('is-shake');
    void el.offsetWidth;
    el.classList.add('is-shake');
  }

  function initLeadForm() {
    const form = $('#form-anuncie');
    if (!form) return;
    const f = form.elements;
    const status = $('.lead-form__status', form);
    mascaraTelefone(f.telefone);

    const regras = {
      nome: (v) => v.trim().length >= 2 || 'Informe seu nome.',
      telefone: (v) => v.replace(/\D/g, '').length >= 10 || 'Informe um telefone com DDD, por exemplo (27) 99999-9999.',
      email: (v) => !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Confira o e-mail: falta algo como nome@provedor.com.br.',
      local: (v) => v.trim().length >= 3 || 'Informe o bairro e a cidade do imóvel.'
    };

    const checar = (nome) => {
      const campo = f[nome];
      const erro = document.getElementById(`err-${nome}`);
      const r = regras[nome](campo.value);
      const ok = r === true;
      campo.setAttribute('aria-invalid', String(!ok));
      if (ok) {
        campo.removeAttribute('aria-describedby');
        erro.textContent = '';
      } else {
        campo.setAttribute('aria-describedby', erro.id);
        erro.textContent = r;
      }
      return ok;
    };

    Object.keys(regras).forEach((nome) => {
      f[nome].addEventListener('blur', () => { if (f[nome].value) checar(nome); });
      f[nome].addEventListener('input', () => { if (f[nome].getAttribute('aria-invalid') === 'true') checar(nome); });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nomes = Object.keys(regras);
      const resultados = nomes.map(checar);
      const primeiroErro = nomes.find((_, i) => !resultados[i]);
      if (primeiroErro) {
        status.textContent = '';
        f[primeiroErro].focus();
        shake(form);
        return;
      }

      const quer = f.intencao.value === 'vender' ? 'vender' : 'alugar';
      const linhas = [
        `Olá! Quero ${quer} meu imóvel com a Master.`,
        `Nome: ${f.nome.value.trim()}`,
        `Telefone: ${f.telefone.value.trim()}`,
        f.email.value.trim() && `E-mail: ${f.email.value.trim()}`,
        `Imóvel: ${f.tipo.value}`,
        `Bairro e cidade: ${f.local.value.trim()}`,
        f.mensagem.value.trim() && `Detalhes: ${f.mensagem.value.trim()}`
      ].filter(Boolean);
      const url = waUrl(CONFIG.whatsappCaptacao, linhas.join('\n'));

      status.textContent = '';
      if (abrir(url)) {
        status.textContent = 'Pronto. A conversa abriu no WhatsApp em outra aba: é só enviar a mensagem.';
      } else {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = 'abrir a conversa no WhatsApp';
        status.append('O navegador bloqueou a nova aba. Seus dados continuam aqui: ', link, '.');
      }
    });
  }

  /* ------------------------------------------------------------------------
     Cabeçalho, WhatsApp flutuante, link ativo
     ------------------------------------------------------------------------ */

  function initHeader() {
    const header = $('.site-header');
    const hero = $('.hero');
    const wa = $('.wa-float');
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const heroH = hero ? hero.offsetHeight : 600;
      const menuOpen = !$('#menu').hidden;
      if (menuOpen) return;

      header.classList.toggle('is-solid', y > heroH - header.offsetHeight - 10);
      if (y < heroH * 0.6) header.classList.remove('is-hidden');
      else if (y > lastY + 4) header.classList.add('is-hidden');
      else if (y < lastY - 4) header.classList.remove('is-hidden');
      if (state.inAscent && y >= lastY) header.classList.add('is-hidden');

      wa.classList.toggle('is-on', y > heroH * 0.85 && !state.inAscent);
      lastY = y;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });

    // o botão flutuante sai de cena onde a página já oferece WhatsApp e campos para digitar
    const vistos = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) vistos.add(e.target); else vistos.delete(e.target); });
      wa.classList.toggle('is-away', vistos.size > 0);
    }, { rootMargin: '0px 0px -10% 0px' });
    ['#form-anuncie', '#contato', '.site-footer'].forEach((sel) => { const el = $(sel); if (el) io.observe(el); });
    update();
    return update;
  }

  function initActiveLinks() {
    const links = $$('.site-nav a');
    const map = { andares: 'andares', destaques: 'andares', bairros: 'bairros', sobre: 'sobre', anunciar: 'anunciar', contato: 'contato' };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = map[entry.target.id];
        links.forEach((a) => {
          if (a.getAttribute('href') === `#${id}`) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    const hero = $('.hero');
    if (hero) new IntersectionObserver(([e]) => { if (e.isIntersecting) links.forEach((a) => a.removeAttribute('aria-current')); }, { rootMargin: '-45% 0px -50% 0px' }).observe(hero);
  }

  /* ------------------------------------------------------------------------
     Menu em tela cheia
     ------------------------------------------------------------------------ */

  function initMenu() {
    const toggle = $('.menu-toggle');
    const menu = $('#menu');
    const close = $('.menu__close', menu);
    let lastFocus = null;

    const focaveis = () => $$('a[href], button:not([disabled])', menu);

    const abrirMenu = () => {
      lastFocus = document.activeElement;
      menu.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (state.lenis) state.lenis.stop();
      requestAnimationFrame(() => close.focus());
      if (state.motion) {
        window.gsap.fromTo($$('.menu__nav a, .menu__foot a', menu),
          { yPercent: 40, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.7, stagger: 0.045, ease: 'expo.out' });
      }
    };

    const fecharMenu = (devolverFoco = true) => {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (state.lenis) state.lenis.start();
      if (devolverFoco && lastFocus) lastFocus.focus();
    };

    toggle.addEventListener('click', abrirMenu);
    close.addEventListener('click', () => fecharMenu());
    menu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.preventDefault(); fecharMenu(); return; }
      if (e.key !== 'Tab') return;
      const f = focaveis();
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    $$('a[href^="#"]', menu).forEach((a) => a.addEventListener('click', () => fecharMenu(false)));
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (m) => {
      if (m.matches && !menu.hidden) fecharMenu(false);
    });
  }

  /* Links internos: rolagem suave pela Lenis quando ela existe, e foco no destino. */
  function initAnchors() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (state.lenis) state.lenis.scrollTo(target, { duration: 1.4 });
      else target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }

  /* ------------------------------------------------------------------------
     Movimento
     ------------------------------------------------------------------------ */

  // Quebra um título em palavras, cada uma dentro de uma fenda (.w > .wi).
  function splitWords(el) {
    if (el.dataset.splitDone) return $$('.wi', el);
    const wrap = (node) => {
      const w = document.createElement('span');
      w.className = 'w';
      const wi = document.createElement('span');
      wi.className = 'wi';
      w.append(wi);
      node.replaceWith(w);
      wi.append(node);
    };
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(document.createTextNode(part)); return; }
            const w = document.createElement('span');
            w.className = 'w';
            const wi = document.createElement('span');
            wi.className = 'wi';
            wi.textContent = part;
            w.append(wi);
            frag.append(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          if (child.hasAttribute('data-nosplit')) wrap(child);
          else walk(child);
        }
      });
    };
    walk(el);
    el.dataset.splitDone = '1';
    return $$('.wi', el);
  }

  function heroIntro(gsap) {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.fromTo('.site-header__bar', { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.1)
      .fromTo('.site-header .brand__blk', { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.1 }, 0.25)
      // a palavra MASTER nasce atrás das torres e sobe até assentar no horizonte
      .fromTo('.hero__word > span', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'power1.out' }, 0.15)
      .fromTo('.hero__word > span', { yPercent: 64 }, { yPercent: 0, duration: 2.2 }, 0.15)
      .fromTo('.hero__title .wi', { yPercent: 112, y: 0 }, { yPercent: 0, y: 0, duration: 1.25, stagger: 0.055 }, 0.6)
      .fromTo('.swash path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.14 }, 1.35)
      .fromTo(['.hero__lede', '.hero__meta'], { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08 }, 1.05)
      .fromTo('.search', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.2 }, 0.95)
      .fromTo('.hero__rail', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 }, 1.4);
    return tl;
  }

  function heroScroll(gsap) {
    gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    })
      .to('.hero__sky', { yPercent: 11 }, 0)      // o céu anda mais devagar que a cidade
      .to('.hero__word', { yPercent: 58 }, 0)     // a palavra afunda atrás das torres
      .to('.hero__content', { yPercent: -14, autoAlpha: 0.15 }, 0);
  }

  function addTags(gsap, tl, tags, at) {
    tags.forEach((tag, k) => {
      const b = $('b', tag);
      tl.fromTo(tag, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18, immediateRender: false }, at + k * 0.1)
        .fromTo(b, { x: -14 }, { x: 0, duration: 0.32, ease: 'power2.out', immediateRender: false }, at + k * 0.1);
    });
  }

  // A subida: palco fixado, cada andar entra de cima como se a câmera subisse a fachada.
  function initAscent(gsap, ScrollTrigger) {
    const section = $('.ascent');
    if (!section) return;
    const stage = $('.ascent__stage', section);
    const intro = $('.ascent__intro', section);
    const floors = $$('.floor', section);
    const finale = $('.ascent__finale', section);
    const slab = $('.ascent__slab', section);
    const hud = $('.hud', section);
    const rail = $('.hud__rail', section);
    const num = $('.hud__num', section);
    const nome = $('.hud__name', section);
    const stops = $$('.hud__stop', section);
    const TOPO = 21;
    const PAUSA = 0.8;

    section.classList.add('is-live');

    // régua medida: um tique por andar
    const paradas = floors.map((f) => +f.dataset.n);
    for (let n = 0; n <= TOPO; n++) {
      const tick = document.createElement('span');
      tick.className = paradas.includes(n) ? 'hud__tick hud__tick--stop' : 'hud__tick';
      tick.style.setProperty('--p', (n / TOPO).toFixed(4));
      rail.prepend(tick);
    }

    [...floors, finale].forEach((el, i) => { el.style.zIndex = String(i + 1); });

    const clips = floors.map((f) => $('.floor__clip', f));
    const imgs = floors.map((f) => $('.floor__img', f));
    const bodies = floors.map((f) => $('.floor__body', f));
    const tags = floors.map((f) => $$('.tag', f));
    const finaleClip = $('.finale__clip', finale);
    const finaleImg = $('.finale__img', finale);
    const finaleBody = $('.finale__body', finale);

    const estreito = window.matchMedia('(max-width: 640px)').matches;
    const portal = estreito
      ? 'inset(46% 14% 0% 14% round 36vw 36vw 0vw 0vw)'
      : 'inset(44% 36% 0% 36% round 14vw 14vw 0vw 0vw)';
    const cheio = 'inset(0% 0% 0% 0% round 0vw 0vw 0vw 0vw)';
    const fechadoTopo = 'inset(0% 0% 100% 0%)';
    const aberto = 'inset(0% 0% 0% 0%)';

    gsap.set(imgs[0], { scale: 1.32 });
    gsap.set([...bodies, finaleBody], { autoAlpha: 0, y: 36 });
    gsap.set(tags.flat(), { autoAlpha: 0 });
    gsap.set(hud, { autoAlpha: 0 });

    const contador = { v: 0 };
    const rotulo = (v) => (v <= 0 ? 'T' : v >= TOPO ? 'C' : String(v).padStart(2, '0'));
    let mostrado = null;
    const render = () => {
      rail.style.setProperty('--prog', (contador.v / TOPO).toFixed(4));
      const v = Math.round(contador.v);
      if (v === mostrado) return;
      mostrado = v;
      const r = rotulo(v);
      num.textContent = r;
      const parada = floors.find((f) => +f.dataset.n === v);
      nome.textContent = parada ? parada.dataset.name : `${v}º andar`;
      stops.forEach((s) => s.classList.toggle('is-on', s.textContent === r));
    };

    const tl = gsap.timeline({ defaults: { ease: 'none' } });

    // 1. entra pelo térreo: o arco da portaria abre até a tela inteira
    tl.to(intro, { autoAlpha: 0, y: -90, duration: 0.55, ease: 'power1.in' }, 0)
      .fromTo(clips[0], { clipPath: portal }, { clipPath: cheio, duration: 1, ease: 'power2.inOut' }, 0)
      .to(imgs[0], { scale: 1, duration: 1, ease: 'power2.inOut' }, 0)
      .to(hud, { autoAlpha: 1, duration: 0.3 }, 0.62)
      .to(bodies[0], { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.68);
    addTags(gsap, tl, tags[0], 0.8);

    // 2. sobe andar por andar: a cena desce, o próximo andar entra de cima e o painel conta os andares
    let t = 1 + PAUSA;
    for (let i = 0; i < floors.length - 1; i++) {
      const destino = +floors[i + 1].dataset.n;
      tl.to(bodies[i], { autoAlpha: 0, y: -28, duration: 0.24, ease: 'power1.in' }, t)
        .to(tags[i], { autoAlpha: 0, duration: 0.18 }, t)
        .to(imgs[i], { yPercent: 16, scale: 1.08, opacity: 0.3, duration: 1, ease: 'power1.inOut' }, t)
        .fromTo(clips[i + 1], { clipPath: fechadoTopo }, { clipPath: aberto, duration: 1, ease: 'power2.inOut' }, t)
        .fromTo(imgs[i + 1], { yPercent: -14, scale: 1.12 }, { yPercent: 0, scale: 1, duration: 1, ease: 'power2.inOut', immediateRender: false }, t)
        .fromTo(slab, { y: 0 }, { y: () => stage.clientHeight, duration: 1, ease: 'power2.inOut', immediateRender: false }, t)
        .fromTo(slab, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.08, immediateRender: false }, t)
        .to(slab, { autoAlpha: 0, duration: 0.14 }, t + 0.86)
        .to(contador, { v: destino, duration: 1, ease: 'power1.inOut', onUpdate: render }, t)
        .to(bodies[i + 1], { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' }, t + 0.72);
      addTags(gsap, tl, tags[i + 1], t + 0.84);
      t += 1 + PAUSA;
    }

    // 3. da cobertura, a câmera recua e mostra Vitória inteira
    const ultimo = floors.length - 1;
    tl.to(bodies[ultimo], { autoAlpha: 0, y: -28, duration: 0.24, ease: 'power1.in' }, t)
      .to(tags[ultimo], { autoAlpha: 0, duration: 0.18 }, t)
      .to(imgs[ultimo], { scale: 0.9, opacity: 0.25, duration: 1, ease: 'power1.inOut' }, t)
      .to(hud, { autoAlpha: 0, duration: 0.3 }, t + 0.1)
      .fromTo(finaleClip, { clipPath: fechadoTopo }, { clipPath: aberto, duration: 1, ease: 'power2.inOut' }, t)
      .fromTo(finaleImg, { scale: 1.3 }, { scale: 1, duration: 1.4, ease: 'power2.out', immediateRender: false }, t)
      .to(finaleBody, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, t + 0.8);
    t += 1.4 + PAUSA;
    tl.to({}, { duration: 0.001 }, t);

    const porUnidade = () => window.innerHeight * (estreito ? 0.5 : 0.55);

    ScrollTrigger.create({
      animation: tl,
      trigger: section,
      start: 'top top',
      end: () => `+=${Math.round(tl.duration() * porUnidade())}`,
      pin: stage,
      scrub: 0.9,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onToggle: (self) => {
        state.inAscent = self.isActive;
        $('.wa-float').classList.toggle('is-on', !self.isActive && window.scrollY > 400);
      }
    });
    render();
  }

  function initReveals(gsap, ScrollTrigger) {
    // títulos: palavras sobem de dentro da fenda
    $$('[data-split]').forEach((el) => {
      const words = splitWords(el);
      gsap.set(words, { yPercent: 112 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 86%',
        once: true,
        onEnter: () => gsap.to(words, { yPercent: 0, duration: 1.15, stagger: 0.05, ease: 'expo.out' })
      });
    });

    // fotos: o recorte abre e a imagem assenta
    $$('[data-reveal="clip"]').forEach((el) => {
      const r = getComputedStyle(el).borderTopLeftRadius || '0px';
      const img = $('img, iframe', el);
      const fechado = `inset(12% 10% 12% 10% round ${r})`;
      gsap.set(el, { clipPath: fechado });
      if (img && img.tagName === 'IMG') gsap.set(img, { scale: 1.18 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 84%',
        once: true,
        onEnter: () => {
          gsap.fromTo(el, { clipPath: fechado }, { clipPath: `inset(0% 0% 0% 0% round ${r})`, duration: 1.5, ease: 'expo.out' });
          if (img && img.tagName === 'IMG') gsap.to(img, { scale: 1, duration: 1.8, ease: 'expo.out' });
        }
      });
    });

    // listas: itens entram em sequência, com teto no atraso total
    const listas = [...$$('[data-reveal="stagger"]'), $('.services__list'), $('.cities')].filter(Boolean);
    listas.forEach((list) => {
      const items = Array.from(list.children);
      gsap.set(items, { autoAlpha: 0, y: 26 });
      ScrollTrigger.create({
        trigger: list,
        start: 'top 88%',
        once: true,
        onEnter: () => gsap.to(items, { autoAlpha: 1, y: 0, duration: 0.95, stagger: Math.min(0.08, 0.5 / items.length), ease: 'expo.out' })
      });
    });

    // cards da vitrine
    const painel = $('#painel-venda');
    if (painel) {
      const cards = $$('.card', painel);
      gsap.set(cards, { autoAlpha: 0, y: 34 });
      ScrollTrigger.create({
        trigger: painel,
        start: 'top 86%',
        once: true,
        onEnter: () => gsap.to(cards, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.09, ease: 'expo.out' })
      });
    }

    // parallax dentro das molduras
    $$('[data-parallax]').forEach((img) => {
      const frame = img.closest('figure, .owners__media') || img.parentElement;
      gsap.fromTo(img, { yPercent: -6 }, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    // 30 anos: o número sobe como o painel de um elevador
    $$('[data-count]').forEach((el) => {
      const fim = parseInt(el.dataset.count, 10);
      const proxy = { v: 0 };
      el.textContent = '00';
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => gsap.to(proxy, {
          v: fim,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = String(Math.round(proxy.v)).padStart(2, '0'); }
        })
      });
    });
  }

  function initMagnetic(gsap) {
    if (!finePointer.matches) return;
    $$('.magnetic, .floor-btn, .circle-cta__ring').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.28);
        yTo((e.clientY - r.top - r.height / 2) * 0.28);
      });
      el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
  }

  function whenHeroReady(cb) {
    let done = false;
    const go = () => { if (!done) { done = true; cb(); } };
    const img = new Image();
    img.src = 'assets/img/hero-praia-do-canto.webp';
    (img.decode ? img.decode() : Promise.resolve()).then(go, go);
    setTimeout(go, 1200);
  }

  function initMotion() {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger || reduceMotion.matches) {
      doc.classList.remove('motion');
      return;
    }
    state.motion = true;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (window.Lenis) {
      const lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      state.lenis = lenis;
    }

    initAscent(gsap, ScrollTrigger);
    initReveals(gsap, ScrollTrigger);
    heroScroll(gsap);
    initMagnetic(gsap);
    whenHeroReady(() => heroIntro(gsap));

    const refresh = debounce(() => ScrollTrigger.refresh(), 200);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
  }

  /* ------------------------------------------------------------------------
     Início
     ------------------------------------------------------------------------ */

  function init() {
    $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
    initBusca();
    initListings();
    initPlaces();
    initLeadForm();
    initMenu();
    initAnchors();
    initActiveLinks();
    initMotion();
    initHeader();

    window.addEventListener('resize', debounce(() => $$('.tabs').forEach(placeEdge), 120));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => $$('.tabs').forEach(placeEdge));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
