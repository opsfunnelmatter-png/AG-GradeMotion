# AGENTS.md — GradeMotion Engineering & Operations Context

Last Updated: 04 September 2026

---

## 1. Project Overview & Business Model

**GradeMotion** (`grademotion.com`) is an elite, high-ticket private tutoring service specializing in **Cambridge International (CIE) & Edexcel A-Level Further Mathematics**, led by **Tutor Sheefa**.

### Key Value Proposition
- High-touch 1-on-1 tutoring focused on deep conceptual clarity, mark-scheme precision, and exam technique.
- Target Audience: High-performing or struggling students in top international schools (UK, Singapore, Dubai, Hong Kong, and Malaysia).
- Sales Funnel:
  1. Student/Parent books a free or low-friction **Diagnostic Assessment Session**.
  2. Post-diagnostic consultation led by Tutor Sheefa / operations.
  3. Private distribution of targeted checkout links (Evaluation session or Full Sprint).
  4. Instant enrollment confirmation, onboarding pack dispatch, and recurring schedule lock-in.

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
- [ ] **Phase 4: Post-Payment Automation & Scheduling (Next Steps)**
  - Automated Cal.com / Calendly schedule redirect upon Stripe successful payment (`thank-you.html`).
  - Automated welcome email / WhatsApp onboarding notification upon Stripe webhook receipt.
