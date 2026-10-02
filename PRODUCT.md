# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML, CSS and JavaScript, no build step. GSAP (ScrollTrigger) and Lenis loaded from a CDN for parallax, pinned scroll sequences and smooth scrolling. Confirmed by the user on 2026-09-29. Hosting and domain undecided.

## Users

**Audience that decides now: the owners of Master Imóveis.** The site is a speculative proposal; Master Imóveis is not a client yet. They will judge it against their current site (a Bootstrap template by Universal Software whose featured-listings API currently returns HTTP 500, so the home page shows no properties).

**Audience the site represents:** people in Greater Vitória (ES) looking to rent or buy a home or a commercial space, and owners who want to rent out or sell a property through an agency. Mostly local, searching by neighborhood, type and number of bedrooms.

## Product Purpose

Master Imóveis is a real estate agency in Vitória/ES. The site presents the agency, lets visitors search for properties to rent or buy, captures owners who want to list a property, and routes every visitor to a conversation (phone, WhatsApp, e-mail).

Success, in order:
1. Now: Master Imóveis wants to talk about replacing its site.
2. After a deal: visitors search, contact the agency, and owners list properties.

## Positioning

Thirty years in the Capixaba real estate market, one agency covering the full cycle: rentals, sales of new and third-party properties, property management, appraisals and consulting. Inventory spans residential and commercial types across six cities.

## Operating Context

- Office: R. das Palmeiras, 795, salas 306 e 307, Santa Lúcia, Vitória/ES, CEP 29056-210.
- Hours: Monday to Friday 08h–18h; Saturday on-call 08h–12h.
- Listings live in Master's CRM (Universal Software). Search URLs follow the pattern
  `/{aluguel|venda}/{tipo}/{cidade}/{bairro}/{n-quartos}/0-suite-ou-mais/0-vaga/0-banheiro-ou-mais/todos-os-condominios?valorminimo=0&valormaximo=0&pagina=1`.
- Tenant/owner portal ("Área do Cliente"): http://www.portalunsoft.com.br/area-do-cliente/master

## Capabilities and Constraints

- One-page static site; forms have no backend and compose a WhatsApp message instead.
- Search builds a URL for Master's existing search pages (their listing API is broken at the time of writing, so results may be empty until they fix it).
- Language: pt-BR only.
- Content must stay visible without JavaScript and under `prefers-reduced-motion`.

## Brand Commitments

- Name: **Master Imóveis**. CRECI **2917-J**.
- Logo: three ascending red blocks (buildings) over the heavy condensed wordmark "MASTER" and the spaced "IMÓVEIS". Brand red `#c72923`, secondary `#883035`, black. The user chose to keep Master red as the accent.
- Slogan used on their site: "o Melhor Investimento da sua vida está aqui!"
- Marketing line used on their site: "A Master é a parceira ideal para alugar seu imóvel com rapidez e segurança!"
- Visual references pinned by the user: the "Nexora" and "Homevia" real-estate landing pages and the "Aurelia Residences" scroll video (Pinterest pin 1086563847660886256).

## Evidence on Hand

Real, from masterimoveis.net.br (fetched 2026-09-29):
- Phones (27) 3434-5959 and (27) 99760-0816 (WhatsApp 55 27 99760-0816). Listing-intake WhatsApp 55 27 99649-3746. E-mail atendimento@masterimoveis.net.br.
- "Atuando há 30 anos no Mercado Imobiliário Capixaba". Services: gestão imobiliária, locações, vendas de imóveis novos e de terceiros, avaliações e consultoria imobiliária. Mission, vision and values text from /sobre.
- Property types in their system (12): Apartamento, Casa, Conjunto de Salas, Espaço corporativo, Galpão, Kitnet, Loja, Lote em condomínio, Prédio, Prédio Comercial, Sala, Terreno.
- Neighborhoods in their system (25) across Vitória, Vila Velha, Serra, Cariacica, Guarapari and Domingos Martins.
- Their logo PNG (230×249) and the "parceira ideal" campaign image.

Absent, never fabricate:
- Real listings (addresses, prices, photos, codes). Featured cards are illustrative and must say so on the page.
- Client counts, deals closed, awards, testimonials, team names and photos.
- Social media profiles (none linked on their site).

## Product Principles

1. **Their facts, not ours.** Every number and claim comes from Master's own site; illustrative listings are labeled as illustrative.
2. **Every path ends in a conversation.** Search, listing intake and contact all lead to a phone call, WhatsApp or e-mail with the context already filled in.
3. **Wired to their system.** Search and "Área do Cliente" point at Master's existing CRM URLs so the site can go live without rebuilding their back office.
4. **Their brand, raised.** Keep the red, the ascending-buildings mark and the slogan; change the craft level, not the identity.

## Accessibility & Inclusion

WCAG AA contrast, full keyboard navigation, visible focus, 44px touch targets, and a complete static experience under `prefers-reduced-motion` or without JavaScript.
