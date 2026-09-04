# AGENTS.md — GradeMotion Engineering & Operations Context

Last Updated: 04 September 2026

---

## 1. Project Overview & Business Model

**GradeMotion** (`grademotion.com`) is an elite, high-ticket private tutoring service specializing in **Cambridge International (CIE) & Edexcel A-Level Further Mathematics**, led by **Tutor Sheefa**.

### Key Value Proposition
- High-touch 1-on-1 tutoring focused on deep conceptual clarity, mark-scheme precision, and exam technique.
- Target Audience: High-performing or struggling students in top international schools (UK, Singapore, Dubai, Hong Kong, and Malaysia).
- Architectural Sales Funnel:
  1. **Top-of-Funnel Discovery (pSEO & GEO Hubs)**: Organic traffic lands on past paper walkthroughs (`/solutions/*`), topic hubs (`/topics/*`), and geo pages (`/tutor/*`). All CTAs strictly route visitors back to the core Sales Page (`/#cta` or `/#pricing`) so they experience the full sales copywriting before applying.
  2. **Conversion Engine (Homepage Sales Page)**: Delivers deep copywriting persuasion — VSL video, 15-year background, IB 42 points proof, 4-step Grade Shift Framework, student grade transformations (80% A/A*), and pricing tiers.
  3. **High-Intent Lead Capture (Interactive Modal Form)**: Clicking any diagnostic CTA opens the form modal (Name, Email, WhatsApp Phone with country picker, Exam Board, Target Grade/Date). Submissions trigger an instant real-time Telegram alert to Tutor Sheefa and operations via `/api/send-telegram`.
  4. **Post-Application Scheduling & Community Enrolment (`thank-you.html`)**: Instant redirection to the thank-you portal where applicants can immediately lock in their live 1-on-1 slot on the Cal.com calendar (`/schedule?type=diagnostic`) and join the Free Telegram VIP group.
  5. **Post-Diagnostic Consultation & Closing**: Tutor Sheefa assesses syllabus gaps, conducts the 1-on-1 session, and presents targeted checkout links via the Closer Desk (`/desk`) for a 2-Hour Evaluation Session (with 100% Rollover Upgrade Guarantee) or Full Sprints (Topic Surgery, Exam Readiness, Intensive Bootcamp).

---

## 2. Tech Stack & Architecture

- **Core Frontend**: Modular Vanilla HTML5, semantic markup, zero external bloated frameworks.
- **Styling**: Modern, refined CSS with design tokens (`css/style.min.css`), inlined into `index.html` during build to eliminate render-blocking resources.
- **Build System**: `node build.js` concatenates section templates (`sections/*.html`) into static `index.html` and `thank-you.html`.
- **Typography**: Locally hosted *Plus Jakarta Sans* (`/fonts`) for ultra-fast loading without Google Fonts DNS lookups.
- **Serverless API**: `api/send-telegram.js` (Node.js ESM/CommonJS function on Vercel) for real-time lead alerts to Telegram.
- **Deployment & Hosting**: Vercel Production (`www.grademotion.com`) connected to GitHub repository (`opsfunnelmatter-png/AG-GradeMotion`).
- **Clean Routing**: `vercel.json` with `cleanUrls: true` and custom rewrite rules.

---

## 3. Payment Infrastructure & Stripe Configuration

All payments are processed via Stripe Live APIs with dedicated, branded GradeMotion checkout landing pages to maintain brand continuity.

### Strict Currency Isolation Architecture
To protect premium international pricing and prevent international students from seeing domestic Malaysian rates:
- **International Path (`/pay/usd/*`)**: 100% USD only, no currency toggle, zero mention of MYR.
- **Malaysian Path (`/pay/my/*`)**: 100% MYR only, tailored for local bank cards and Malaysian clients.
- **Objection-Killer Trial**: 2-Hour Evaluation Session with a **100% Rollover Upgrade Guarantee** (the full evaluation fee is credited toward any subsequent 8-hr or 16-hr sprint upgrade). Kept off public pricing tables and used exclusively for post-diagnostic direct closing.

### Live Stripe Products & Payment Links

| Package | Duration | USD Price & Link | MYR Price & Link |
| :--- | :---: | :--- | :--- |
| **Evaluation Session** *(Trial)* | 2 Hours | **$210**<br>[Stripe Link](https://buy.stripe.com/28E6oz1Vk5fog4Ccm74ZG0v)<br>Landing: `/pay/usd/trial` | **RM 380**<br>[Stripe Link](https://buy.stripe.com/7sYbIT6bA8rAf0y0Dp4ZG0w)<br>Landing: `/pay/my/trial` |
| **Topic Surgery Sprint** | 8 Hours | **$760**<br>[Stripe Link](https://buy.stripe.com/aFa9ALbvUazIaKieuf4ZG0p)<br>Landing: `/pay/usd/topic-surgery` | **RM 1,440**<br>[Stripe Link](https://buy.stripe.com/fZu7sD6bAazI19I0Dp4ZG0q)<br>Landing: `/pay/my/topic-surgery` |
| **Exam Readiness Sprint** | 16 Hours | **$1,360**<br>[Stripe Link](https://buy.stripe.com/4gMeV59nM23cg4CadZ4ZG0r)<br>Landing: `/pay/usd/exam-readiness` | **RM 2,560**<br>[Stripe Link](https://buy.stripe.com/8x2bIT6bA4bk3hQeuf4ZG0s)<br>Landing: `/pay/my/exam-readiness` |
| **Intensive Bootcamp** | 40 Hours | **$2,980**<br>[Stripe Link](https://buy.stripe.com/4gMcMXczY0Z83hQcm74ZG0t)<br>Landing: `/pay/usd/bootcamp` | **RM 5,600**<br>[Stripe Link](https://buy.stripe.com/00w28j8jI9vEbOm0Dp4ZG0u)<br>Landing: `/pay/my/bootcamp` |

---

## 4. Communication & WhatsApp Sales Playbook

All student/parent communications are conducted in **100% polished English**, reflecting the standards of international schools and elite academic consulting.

### WhatsApp Follow-Up Templates

#### A. 2-Hour Evaluation Session (Objection-Killer Trial)
- **Local (MYR):**
  > Hi [Name], thank you for joining the diagnostic session earlier! Based on our assessment, targeting [Topic] with exam-specific methodology will make an immediate impact on your upcoming papers. If you'd like to experience Tutor Sheefa's teaching dynamic first with zero long-term commitment, we can start with a 2-Hour Evaluation Session (RM 380).
  > 
  > 🛡️ 100% Rollover Upgrade Guarantee: If you decide to continue with an 8-Hour or 16-Hour sprint after this session, the entire RM 380 will be credited 100% towards your upgrade package.
  > 
  > You can confirm your slot and proceed with enrolment here:
  > 👉 https://www.grademotion.com/pay/my/trial
- **International (USD):**
  > Hi [Name], thank you for joining the diagnostic session earlier! Based on our assessment, targeting [Topic] with exam-specific methodology will make an immediate impact on your upcoming papers. If you'd like to experience Tutor Sheefa's teaching dynamic first with zero long-term commitment, we can start with a 2-Hour Evaluation Session ($210 USD).
  > 
  > 🛡️ 100% Rollover Upgrade Guarantee: If you decide to continue with an 8-Hour or 16-Hour sprint after this session, the entire $210 will be credited 100% towards your upgrade package.
  > 
  > You can confirm your slot and proceed with enrolment here:
  > 👉 https://www.grademotion.com/pay/usd/trial

#### B. Full Sprints (8-Hour & 16-Hour Packages)
- **Local (MYR):**
  > Hi [Name], great speaking with you earlier! We’ve outlined the targeted roadmap for your A-Level Further Mathematics preparation to secure that A/A* grade. Here are the direct enrolment links for the sprint packages we discussed:
  > 👉 8-Hour Topic Surgery (RM 1,440): https://www.grademotion.com/pay/my/topic-surgery
  > 👉 16-Hour Exam Readiness (RM 2,560): https://www.grademotion.com/pay/my/exam-readiness
  > Once completed, we will reserve your weekly schedule and send over your onboarding pack right away.
- **International (USD):**
  > Hi [Name], great speaking with you earlier! We’ve outlined the targeted roadmap for your A-Level Further Mathematics preparation to secure that A/A* grade. Here are the direct enrolment links for the sprint packages we discussed:
  > 👉 8-Hour Topic Surgery ($760 USD): https://www.grademotion.com/pay/usd/topic-surgery
  > 👉 16-Hour Exam Readiness ($1,360 USD): https://www.grademotion.com/pay/usd/exam-readiness
  > Once completed, we will reserve your weekly schedule and send over your onboarding pack right away.

---

## 5. Project Roadmap & Milestones

- [x] **Phase 1: High-Performance Landing Page**
  - Section-based HTML architecture assembled statically via `build.js`.
  - Inlined minified CSS and local font loading for perfect Core Web Vitals (CLS: 0, 100% PageSpeed).
  - WebP asset conversion and responsive media embeds.
- [x] **Phase 2: Geographic & Currency Isolation**
  - Dynamic client-side country detection on the homepage pricing table for local Malaysian visitors.
  - Zero leakage of MYR rates to foreign IP addresses.
- [x] **Phase 3: Stripe Payment Gateway & Private Checkout Infrastructure**
  - Stripe MCP connected with live restricted keys.
  - Products, prices, and payment links generated for all tiers.
  - Isolated branded checkout pages created under `/pay/usd/*` and `/pay/my/*`.
  - 2-Hour Evaluation Session ($210 USD / RM 380 MYR) created with 100% rollover guarantee.
  - Internal Unindexed Closer Desk Portal created at `/desk` (aliases `/sheefa`, `/hub`) with live personalization inputs and 1-click copy for Tutor Sheefa.
  - Vercel routes configured and deployed to production.
- [x] **Phase 4: Cal.com Live Calendar, Dynamic Timezone Scheduling & Brand Alignment**
  - Cal.com MCP configured in `~/.gemini/config/mcp_config.json`.
  - Cal.com API v2 connected to `grademotion.edu@gmail.com` (`grademotion-education-e3u8yd`).
  - Event types streamlined: Free Diagnostic Session (60 mins, slug `diagnostic`) and 1-on-1 Regular Class (120 mins, slug `class`).
  - Dedicated scheduling portal deployed at `/schedule` and `/book` with browser-based automatic timezone detection for international students and Malaysia Time (UTC+8) for Tutor Sheefa.
  - Interactive "Change Date" reset control and smooth vertical scrolling for seamless date/slot re-selection on desktop and mobile.
  - 100% polished English copy across all public booking interfaces.
  - Full brand uniformity synchronized across `/schedule`, `/book`, `/desk`, `/sheefa`, and `/hub`:
    - Official GradeMotion banner logo (`gm1.webp` with fallback `gm1.png`).
    - Authentic GradeMotion **A+** favicon suite (`favicon.png` 512px, `apple-touch-icon.png` 180px, `favicon-32x32.png`, `favicon-16x16.png`, and multi-resolution `favicon.ico`).
  - 1-click booking links & dashboard button integrated into Closer Desk at `/desk`.
- [x] **Phase 5: Programmatic SEO (pSEO) & YouTube Video Transcript Engine**
  - YouTube automated transcript extractor (`scripts/extract-transcripts.py`) pulls spoken audio text for all 22 videos from `@tutorsheefa` (26,000+ words).
  - Curriculum databases compiled in `data/topics.json` and `data/questions.json`.
  - 2-Layer evergreen taxonomy built:
    - 6 Evergreen Topic Hubs (`/topics/*`): Matrices, Complex Numbers, Differential Equations, Hyperbolic Functions, Polar Coordinates, Series & Vectors.
    - 22 Past Paper Question Walkthroughs (`/solutions/*`): Edexcel May 2025 CP1 & CP2 with responsive embeds, LaTeX formulas (KaTeX), examiner traps, unedited audio transcripts, and cross-board Cambridge CIE 9231 notes.
    - Directory master hubs at `/solutions` and `/topics`.
  - Dynamic `sitemap.xml` with Google Video Sitemap tags (`<video:video>`).
  - Integrated into static build pipeline (`generate-pseo.js`).
  - 8 High-Ticket Geo-Targeted Landing Pages (`/tutor/*`): Dubai, Abu Dhabi, Riyadh, Jeddah, Singapore, Hong Kong, London, and Malaysia.
  - Generative Engine Optimization (GEO) architecture: Schema.org `EducationalOrganization`, `Person`, and `FAQPage` paired with strict currency isolation (100% USD for international vs 100% MYR for Malaysia).
  - Directory master hub at `/tutor`.
  - **Funnel & Copywriting Alignment**: Synchronized all CTA buttons across all pSEO & GEO pages to strictly route visitors back to the core Sales Page (`/#cta` and `/#pricing`) to ensure prospects absorb Tutor Sheefa's high-converting copywriting before booking via the interactive Diagnostic Modal form.
- [ ] **Phase 6: Automated Post-Payment Workflows & Webhooks**
  - Automated welcome email / WhatsApp onboarding notification upon Stripe webhook receipt.
