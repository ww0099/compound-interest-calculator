# Compound Interest Calculator

> **Live Site**：[top.net.im](https://top.net.im) &nbsp;|&nbsp; **Author**：[WW0099](https://github.com/WW0099) &nbsp;|&nbsp; **License**：[MIT](LICENSE)

A free, open-source suite of financial calculators — compound interest, retirement, inflation, and loan — built for global users in English and Chinese. All calculations run locally in your browser; no data is ever uploaded to a server.

---

## Calculators

| Calculator | Route | Solve Modes |
|---|---|---|
| **Compound Interest** | `/` | Future Value, Present Value, Rate, Years, Contribution |
| **Retirement** | `/retirement` | Accumulation + Withdrawal phases, 4% rule, 3 solve modes |
| **Inflation** | `/inflation` | Purchasing power, nominal amount needed, trend chart |
| **Loan** | `/loan` | Payment, Amount, Rate, Term + amortization schedule + pie/line charts |

Each calculator includes interactive Chart.js visualizations, side-by-side scenario comparison, and a history panel to track past calculations.

---

## Features

- **5-in-1 compound calculator** — solve for FV, PV, rate, years, or periodic contribution
- **3 retirement modes** — accumulation goal, withdrawal sustainability, and 4% rule
- **Full amortization table** — loan calculator with principal/interest breakdown per period
- **Bilingual UI** — English & Simplified Chinese, toggle in one click
- **JSON-LD structured data** — 11 Schema types + BreadcrumbList on all 22 routes
- **E-E-A-T ready** — About, Methodology, References, Disclaimer, and Privacy pages
- **GDPR cookie consent** — Accept All / Essential Only with detailed usage breakdown
- **Zero data collection** — calculations stay in your browser, no tracking, no accounts
- **Responsive design** — works on desktop, tablet, and mobile

---

## Tech Stack

| Technology | Version | Notes |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.2.6 | App Router, `output: 'export'` (fully static) |
| [React](https://react.dev/) | 19 | Client Components with hooks |
| [TypeScript](https://www.typescriptlang.org/) | 5.7.3 | `strict: true` |
| [Tailwind CSS](https://tailwindcss.com/) | 4.2.0 | Utility-first, light mode |
| [shadcn/ui](https://ui.shadcn.com/) | BaseUI React | `data-slot` attribute selectors |
| [Chart.js](https://www.chartjs.org/) | 4.5.1 | Direct canvas API via `useRef` |
| [Lucide React](https://lucide.dev/) | 1.16 | Icon library |

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/WW0099/compound-interest-calculator.git
cd compound-interest-calculator

# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Build for production
npm run build
# → static files in out/

# Preview locally
npx serve out
```

**Prerequisites**：Node.js ≥ 18, npm ≥ 9 (or pnpm).

---

## Project Structure

```
compound-interest-calculator/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (JSON-LD, preconnect, footer, cookie consent)
│   ├── page.tsx                  # Home — compound interest calculator
│   ├── retirement/               # Retirement calculator
│   ├── inflation/                # Inflation calculator
│   ├── loan/                     # Loan calculator
│   ├── blog/                     # 8 bilingual finance articles
│   ├── about/                    # About us (E-E-A-T)
│   ├── methodology/              # Formulas & assumptions
│   ├── references/               # 10 authoritative citations
│   ├── privacy/                  # Privacy Policy (GDPR + CCPA)
│   ├── terms/                    # Terms of Service
│   ├── disclaimer/               # Financial disclaimer (YMYL)
│   └── contact/                  # Contact page
├── components/
│   ├── compound-calculator.tsx   # ★ Main calculator component
│   ├── calculator-group.tsx      # Input/result form group
│   ├── growth-chart.tsx          # Chart.js growth visualization
│   ├── history-panel.tsx         # Generic history panel
│   ├── json-ld.tsx               # ★ Shared JSON-LD components
│   ├── knowledge-section.tsx     # Educational content section
│   ├── blog-layout.tsx           # Blog article layout (JSON-LD + related articles)
│   ├── legal-layout.tsx          # Legal page layout (E-E-A-T nav)
│   ├── cookie-consent.tsx        # GDPR cookie consent banner
│   ├── site-footer.tsx           # Global footer (E-E-A-T + legal links)
│   └── ui/                       # shadcn/ui primitives
├── lib/
│   ├── finance.ts                # ★ Compound interest engine (5 solve modes)
│   ├── retirement.ts             # ★ Retirement engine (2-phase projection)
│   ├── inflation.ts              # ★ Inflation engine (purchasing power)
│   ├── loan.ts                   # ★ Loan engine (4 solve modes + amortization)
│   ├── math.ts                   # ★ Shared bisection solver
│   ├── format.ts                 # ★ Shared currency/percent formatter
│   ├── i18n.ts                   # Bilingual UI dictionary
│   ├── types.ts                  # TypeScript types + defaults
│   └── utils.ts                  # cn() utility
├── spec/
│   ├── handoff.md                # ★ Project handoff SSOT
│   ├── adsense-readiness.md      # AdSense review checklist
│   └── link-building.md          # Backlink tracking
├── public/                       # Static assets (icons, OG images, ads.txt, _headers)
├── sitemap.xml                   # 22 URLs with priority & changefreq
├── robots.txt                    # Allows all crawlers + ad bots
├── CNAME                         # top.net.im
├── .github/workflows/deploy.yml  # CI/CD → GitHub Pages
└── next.config.mjs               # output: 'export', poweredByHeader: false
```

---

## Routes (22 Total)

| Route | Page |
|---|---|
| `/` | Compound Interest Calculator (home) |
| `/retirement` | Retirement Calculator |
| `/inflation` | Inflation Calculator |
| `/loan` | Loan Calculator |
| `/about` | About Us |
| `/methodology` | Methodology & Formulas |
| `/references` | References & Citations |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/disclaimer` | Financial Disclaimer |
| `/contact` | Contact |
| `/blog` | Blog Index |
| `/blog/compound-vs-simple-interest` | Compound vs Simple Interest |
| `/blog/rule-of-72` | The Rule of 72 |
| `/blog/500-per-month-30-years` | $500/Month for 30 Years |
| `/blog/inflation-hidden-tax` | Inflation: The Hidden Tax |
| `/blog/monthly-vs-annual-compounding` | Monthly vs Annual Compounding |
| `/blog/beginner-guide-retirement` | Beginner's Guide to Retirement |
| `/blog/capital-gains-tax` | Capital Gains Tax Explained |
| `/blog/cagr-vs-average-return` | CAGR vs Average Return |

---

## Deployment

Push to `master` triggers GitHub Actions:

```yaml
# .github/workflows/deploy.yml
npm ci → npm run build → peaceiris/actions-gh-pages → Cloudflare CDN
```

The site is served via **GitHub Pages** behind **Cloudflare** (CDN, HSTS, CSP headers). See [CLOUDFLARE-SETUP.md](CLOUDFLARE-SETUP.md) for configuration details.

---

## Code Conventions

- **Bilingual**：Each page defines its own `en` / `zh` content dictionary, toggled via `useState<Lang>`
- **Chinese quotes**：Use `「」` in JS strings — never ASCII `"` for quotation in Chinese text
- **Styling**：Light mode only, `primary: #1a365d`, `accent: #3182ce`
- **Build**：`npm run build` must pass with zero TypeScript errors before commit
- **Static only**：No API Routes, no Server Components with data fetching, no ISR
- **New calculators**：`lib/xxx.ts` (engine) + `app/xxx/page.tsx` (metadata) + `app/xxx/xxx-page.tsx` (client)

---

## YMYL & E-E-A-T

This is a **YMYL** (Your Money or Your Life) financial site. Trust signals:

- **Open source** — all formulas auditable on GitHub
- **Methodology page** — every equation documented with assumptions
- **References page** — 10 authoritative sources (Investopedia, SEC, Federal Reserve, etc.)
- **Full disclaimer** — 10-section financial disclaimer stating the tool is educational, not advisory
- **JSON-LD** — 11 Schema types across all pages for search engine trust signals
- **No data collection** — calculations are client-side only

---

## License

MIT © [WW0099](https://github.com/WW0099)

---

**Disclaimer**：This tool is for educational purposes only. It does not constitute financial advice. Consult a qualified professional before making investment decisions.
