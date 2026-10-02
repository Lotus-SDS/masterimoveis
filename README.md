# Master Imóveis: proposta de novo site

Site de página única para a **Master Imóveis** (Vitória, ES; CRECI 2917-J), feito como proposta:
a imobiliária ainda não é cliente. É HTML, CSS e JavaScript puros, sem etapa de build.

**Para ver:** abra `index.html` no navegador (duplo clique funciona). É preciso internet, porque
as fontes (Google Fonts), as bibliotecas de animação (GSAP e Lenis, pelo jsDelivr) e o mapa vêm de CDN.
Para publicar, basta subir a pasta em qualquer hospedagem estática (Hostinger, Netlify, Vercel,
GitHub Pages).

## A ideia

As referências (páginas "Nexora" e "Homevia" e o vídeo "Aurelia Residences" do Pinterest)
viraram um conceito só: **do térreo à cobertura**.

- **Abertura:** foto real da Praia do Canto na hora azul. A palavra MASTER, na fonte da logo,
  nasce atrás das torres e sobe até assentar no horizonte. A silhueta dos prédios foi recortada
  da própria foto e está embutida no CSS.
- **A subida:** a rolagem vira um elevador. Entra-se pelo arco da portaria e sobe-se andar por
  andar (lojas → salas → apartamentos → vista para o mar → coberturas). O painel conta os andares
  um a um, etiquetas aparecem presas às fotos e, no fim, a câmera recua para Vitória à noite, com a
  Terceira Ponte.
- **Paleta:** azul-noite e travertino. O vermelho Master fica no que se move (abas, régua do
  elevador, traço sob "investimento") e no botão principal de cada seção.

## Estrutura

```
index.html                página completa
css/styles.css            estilos (tokens no topo; responsivo e movimento reduzido no fim)
js/main.js                busca, formulários, menu e toda a animação
assets/img/               fotos em WebP + um .json ao lado de cada uma com a origem
assets/favicon.svg        os três prédios da logo
video/                    vídeos de apresentação (celular e desktop) e o script que os grava
PRODUCT.md / DESIGN.md    contexto do produto e sistema visual (para quem continuar o trabalho)
.impeccable/review/       capturas de tela da revisão (desktop, celular e quadros da animação)
```

Seções: hero com busca · serviços · a subida (5 andares + Vitória) · destaques (Comprar/Alugar) ·
25 bairros em 6 cidades · a Master (30 anos, missão, visão, valores) · anuncie seu imóvel ·
contato com mapa · rodapé.

## O que é real e o que é ilustrativo

**Real, tirado do site atual da Master (29/09/2026):** nome, CRECI 2917-J, endereço (R. das
Palmeiras, 795, salas 306 e 307, Santa Lúcia), telefones (27) 3434-5959 e (27) 99760-0816,
WhatsApp de captação (27) 99649-3746, e-mail, horários, os "30 anos no mercado capixaba", os
serviços, missão, visão e valores, o slogan "o melhor investimento da sua vida está aqui", a frase
"parceira ideal para alugar seu imóvel com rapidez e segurança", os **12 tipos de imóvel** e os
**25 bairros em 6 cidades** cadastrados no sistema deles, e o link da Área do Cliente.

**Ilustrativo:** os seis imóveis da vitrine de destaques (fotos, metragens e valores). Cada card
mostra o selo "Ilustrativo" e "Valor de exemplo", e a seção avisa que, no site final, a vitrine
lê os destaques do sistema da Master. Também são ilustrativos os números de andar da subida
(4º, 9º, 16º): são só a metáfora do elevador.

**A logo** é um redesenho vetorial fiel à original (três prédios vermelhos + MASTER IMÓVEIS),
porque o arquivo deles é um PNG pequeno (230 px).

## Como a busca funciona

O formulário do hero, os links dos andares, os bairros e os cards montam endereços no **sistema de
busca que a Master já usa** (Universal Software), no mesmo formato do site atual. Os resultados abrem
em outra aba. Assim o site pode ir ao ar sem mexer no back-office deles.

> **Atenção:** no dia 29/09/2026, a API de imóveis do site atual retornava erro 500 (a vitrine
> deles não mostra nada). Enquanto isso não for corrigido, as páginas de resultado podem vir vazias.
> Isso é um bom argumento na conversa com a Master.

"Sabe o código do imóvel?" abre o WhatsApp com o código já escrito.

## Formulário "Anuncie seu imóvel"

Não tem servidor: o formulário valida os campos e abre o WhatsApp de captação com a mensagem já
escrita (quero alugar/vender, nome, telefone, tipo, bairro, detalhes). Se o navegador bloquear a
nova aba, os dados continuam no formulário e aparece um link para abrir a conversa.

Números e destinos ficam em `CONFIG`, no topo de `js/main.js`:

```js
const CONFIG = {
  busca: 'https://www.masterimoveis.net.br/',  // sistema de busca atual
  buscaNovaAba: true,
  whatsapp: '5527997600816',        // atendimento
  whatsappCaptacao: '5527996493746' // anuncie seu imóvel
};
```

## Movimento e acessibilidade

- GSAP + ScrollTrigger (parallax, subida fixada na tela, entradas) e Lenis (rolagem suave).
- **Sem JavaScript, com "reduzir movimento" ligado no sistema ou se o CDN falhar, nada fica
  escondido:** a subida vira uma lista de andares em tela cheia e todo o conteúdo aparece parado.
- Navegação por teclado, foco visível, menu com foco preso e Esc, abas com setas, mensagens de erro
  ligadas aos campos, contraste AA e botões, abas e campos com pelo menos 44 px de altura.

## Fotos e créditos

- **Vitória** (hero, Terceira Ponte, Praia do Canto, Curva da Jurema): Vitor Jubini / MTur Destinos,
  Wikimedia Commons, **domínio público**. O crédito aparece nas legendas e no rodapé.
- **Interiores, loja e imóveis da vitrine:** Unsplash (Licença Unsplash, uso comercial livre).
  Nenhuma dessas fotos é de imóvel da Master.
- O `.json` ao lado de cada imagem registra a origem exata (link e tratamento aplicado).

## Vídeos de apresentação

Em `video/` há a rolagem completa do site, pronta para mandar:

- `master-imoveis-celular-whatsapp.mp4`: vertical, 720 px de largura, 10,5 MB (abaixo do limite de
  16 MB do WhatsApp). **É o arquivo para mandar à Master.**
- `master-imoveis-celular.mp4`: a mesma rolagem em 1080 px de largura (33,5 MB), para quando o
  tamanho não importa.
- `master-imoveis-desktop.mp4`: 1920×1080, 52,8 s (26,5 MB), para proposta, e-mail e portfólio.

O roteiro mostra a abertura (MASTER subindo atrás das torres), a busca sendo usada, a subida
completa do térreo à cobertura, a vitrine, os bairros, os 30 anos, o "Anuncie" e o contato.

`video/gravar-video.mjs` regera os dois. Ele trava o relógio das animações: cada quadro avança
exatamente 1/30 s no GSAP, na Lenis e nas transições CSS, então o vídeo sai liso mesmo que cada
print leve mais que isso. Precisa de Node, `playwright` (com o Chromium) e um ffmpeg com libx264:

```
npm i playwright ffmpeg-static
npx playwright install chromium
MODO=celular FFMPEG=node_modules/ffmpeg-static/ffmpeg node video/gravar-video.mjs
MODO=desktop FFMPEG=node_modules/ffmpeg-static/ffmpeg node video/gravar-video.mjs
```

## Antes de ir ao ar (quando a Master fechar)

1. Definir o domínio e trocar `og:image` por um endereço absoluto (`https://…/assets/img/og-master.jpg`)
   e acrescentar `<link rel="canonical">`. Hoje o `og:image` é relativo, então a prévia do WhatsApp
   só aparece com o site publicado.
2. Trocar a vitrine ilustrativa pelos destaques reais do sistema da Master e tirar os selos.
3. Conferir o link "Coberturas à venda": ele usa o tipo `apto-cobertura`, que aparece no menu do
   site atual mas não na lista de tipos da API.
4. Revisar com eles os textos de "A Master" (resumidos a partir da página "Sobre").
