# Iniciativa Liberal Trofa — site do núcleo

Site do núcleo territorial da Trofa. Next.js 16 (App Router) + Tailwind 4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
```

## Onde mudar cada coisa

| O quê | Ficheiro |
|---|---|
| Menu, email, redes sociais, link do WhatsApp | `lib/site.ts` |
| Propostas, manifestos (campo `href` para o PDF) | `lib/propostas.ts` |
| Notícias, artigos e comunicados (com data) | `lib/imprensa.ts` |
| Eventos futuros e "outros eventos" | `lib/eventos.ts` |
| Candidatos, programas, diário de campanha | `lib/autarquicas.ts` |
| Cores | `app/globals.css` |
| Imagens | `public/images/` · PDFs em `public/programas/` |
| Galerias de fotos (LIT, Aqui há Parlamento) | copiar as fotos para `public/images/eventos/lit/` ou `public/images/eventos/aqui-ha-parlamento/` — aparecem sozinhas |
| Equipa e plenário (mudar `realizado` para `true` após o plenário) | `lib/equipa.ts` |

Os formulários (adesão, contactos, ideias, denúncia, encomendas) abrem o programa
de email do utilizador, dirigidos a `trofa@liberal.pt`.
