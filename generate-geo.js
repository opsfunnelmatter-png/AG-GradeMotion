const fs = require('fs');
const path = require('path');

const locationsPath = path.join(__dirname, 'data', 'locations.json');
if (!fs.existsSync(locationsPath)) {
    console.error('Missing data/locations.json file.');
    process.exit(1);
}

const locations = JSON.parse(fs.readFileSync(locationsPath, 'utf8'));

// Ensure output directory
const tutorDir = path.join(__dirname, 'tutor');
if (!fs.existsSync(tutorDir)) {
    fs.mkdirSync(tutorDir, { recursive: true });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getHead(title, description, canonicalPath, schemaJson) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Google tag (gtag.js) -->
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      (function() {
        var gtmLoaded = false;
        function loadGtag() {
          if (gtmLoaded) return;
          gtmLoaded = true;
          var script = document.createElement('script');
          script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-18375169008';
          script.async = true;
          document.head.appendChild(script);
          gtag('js', new Date());
          gtag('config', 'AW-18375169008');
        }
        ['touchstart', 'scroll', 'mousemove', 'keydown'].forEach(function(e) {
          window.addEventListener(e, loadGtag, { once: true, passive: true });
        });
        setTimeout(loadGtag, 3500);
      })();
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="google-site-verification" content="6i9WnFjYPC8PO_egd7pTwFnHvjRH8VlzptKxlKoSiBw">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="https://www.grademotion.com${canonicalPath}">
    
    <!-- Open Graph & Social -->
    <meta property="og:site_name" content="GradeMotion">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="https://www.grademotion.com${canonicalPath}">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">

    <!-- Fonts & Favicon -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

    ${schemaJson ? `<script type="application/ld+json">\n${JSON.stringify(schemaJson, null, 2)}\n</script>` : ''}

    <style>
        :root {
            --bg-body: #FBF9FF;
            --bg-surface: #FFFFFF;
            --bg-subtle: #F6F0FD;
            --header-bg: rgba(251, 249, 255, 0.92);
            --purple-main: #7B2CBF;
            --purple-deep: #170A2C;
            --purple-hover: #5A189A;
            --pink-accent: #FF4A95;
            --border-subtle: rgba(123, 44, 191, 0.12);
            --border-strong: rgba(123, 44, 191, 0.22);
            --text-main: #170A2C;
            --text-muted: #5C4D75;
            --text-light: #7E6F95;
            --card-shadow: 0 10px 30px rgba(123, 44, 191, 0.05);
            --hover-shadow: 0 16px 36px rgba(123, 44, 191, 0.12);
            --radius-md: 14px;
            --radius-lg: 20px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; -webkit-tap-highlight-color: transparent; }
        body { background: var(--bg-body); color: var(--text-main); line-height: 1.65; min-height: 100vh; display: flex; flex-direction: column; -webkit-font-smoothing: antialiased; }
        
        .site-header { position: sticky; top: 0; z-index: 1000; background: var(--header-bg); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border-subtle); }
        .nav-inner { max-width: 1240px; margin: 0 auto; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { display: flex; align-items: center; text-decoration: none; }
        .nav-logo img { height: 38px; width: auto; }
        .nav-links { display: flex; align-items: center; gap: 24px; list-style: none; }
        .nav-links a { color: var(--text-muted); font-size: 14.5px; font-weight: 600; text-decoration: none; transition: color 0.2s ease; }
        .nav-links a:hover, .nav-links a.active { color: var(--purple-main); }
        .nav-btn { background: var(--purple-main); color: #fff !important; padding: 9px 18px; border-radius: 999px; font-weight: 700; font-size: 13.5px; text-decoration: none; transition: all 0.2s ease; display: inline-block; }
        .nav-btn:hover { background: var(--purple-hover); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(123, 44, 191, 0.25); }

        .breadcrumbs-bar { max-width: 1240px; margin: 0 auto; padding: 18px 24px 0 24px; width: 100%; }
        .breadcrumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 13px; color: var(--text-light); list-style: none; }
        .breadcrumbs a { color: var(--text-muted); text-decoration: none; font-weight: 500; }
        .breadcrumbs a:hover { color: var(--purple-main); text-decoration: underline; }
        .breadcrumbs .sep { color: var(--border-strong); }
        .breadcrumbs .current { color: var(--purple-main); font-weight: 600; }

        .main-content { max-width: 1240px; margin: 0 auto; padding: 24px 24px 60px 24px; width: 100%; flex: 1; }
        
        h1 { font-size: 34px; font-weight: 800; line-height: 1.22; color: var(--purple-deep); letter-spacing: -0.02em; margin-bottom: 14px; }
        h2 { font-size: 24px; font-weight: 700; color: var(--purple-deep); letter-spacing: -0.01em; margin: 36px 0 16px 0; display: flex; align-items: center; gap: 10px; }
        h3 { font-size: 18px; font-weight: 700; color: var(--purple-deep); margin-bottom: 8px; }
        p { margin-bottom: 14px; font-size: 15.5px; color: var(--text-muted); }

        .badge-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
        .badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px; border-radius: 999px; font-size: 12.5px; font-weight: 700; }
        .badge-purple { background: rgba(123, 44, 191, 0.08); color: var(--purple-main); border: 1px solid rgba(123, 44, 191, 0.18); }
        .badge-pink { background: rgba(255, 74, 149, 0.08); color: var(--pink-accent); border: 1px solid rgba(255, 74, 149, 0.2); }
        .badge-zinc { background: rgba(0, 0, 0, 0.04); color: #4B5563; border: 1px solid rgba(0, 0, 0, 0.08); }

        .layout-grid { display: grid; grid-template-columns: 1fr 360px; gap: 36px; align-items: start; }
        @media (max-width: 960px) {
            .layout-grid { grid-template-columns: 1fr; }
            .site-header .nav-links { display: none; }
            h1 { font-size: 28px; }
        }

        .content-card { background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 28px; margin-bottom: 24px; box-shadow: var(--card-shadow); }

        .school-chips { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0 24px 0; }
        .school-chip { background: var(--bg-subtle); border: 1px solid var(--border-subtle); color: var(--purple-deep); font-weight: 600; font-size: 13px; padding: 6px 14px; border-radius: 999px; }

        .trust-strip { display: flex; flex-wrap: wrap; gap: 16px; margin: 20px 0; padding: 14px 18px; background: rgba(123, 44, 191, 0.04); border-radius: var(--radius-md); font-size: 13.5px; font-weight: 700; color: var(--purple-deep); }

        .pricing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; }
        @media (max-width: 600px) { .pricing-grid { grid-template-columns: 1fr; } }
        .pricing-card { background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.2s ease; }
        .pricing-card:hover { border-color: var(--purple-main); transform: translateY(-2px); box-shadow: var(--card-shadow); }
        .pricing-card .p-title { font-size: 15px; font-weight: 700; color: var(--purple-deep); margin-bottom: 4px; }
        .pricing-card .p-price { font-size: 24px; font-weight: 800; color: var(--purple-main); margin-bottom: 8px; }
        .pricing-card .p-desc { font-size: 12.5px; color: var(--text-muted); line-height: 1.4; margin-bottom: 14px; }

        /* FAQ Accordions */
        .faq-item { border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin-bottom: 12px; background: var(--bg-surface); overflow: hidden; }
        .faq-item summary { padding: 16px 20px; font-weight: 700; font-size: 15px; color: var(--purple-deep); cursor: pointer; user-select: none; display: flex; justify-content: space-between; align-items: center; }
        .faq-item .faq-ans { padding: 0 20px 18px 20px; font-size: 14px; color: var(--text-muted); line-height: 1.6; }

        /* Sticky Sidebar */
        .sidebar { position: sticky; top: 86px; display: flex; flex-direction: column; gap: 20px; }
        .tutor-card { background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--card-shadow); text-align: center; }
        .tutor-card img { width: 92px; height: 92px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(123, 44, 191, 0.15); margin-bottom: 12px; }
        .tutor-name { font-size: 18px; font-weight: 800; color: var(--purple-deep); margin-bottom: 2px; }
        .tutor-title { font-size: 13.5px; color: var(--purple-main); font-weight: 600; margin-bottom: 12px; }
        .tutor-desc { font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 18px; text-align: left; }

        .cta-box { background: linear-gradient(135deg, #7B2CBF 0%, #5A189A 100%); color: #fff; border-radius: var(--radius-lg); padding: 24px; box-shadow: 0 14px 32px rgba(123, 44, 191, 0.28); }
        .cta-box h3 { color: #fff; font-size: 18px; font-weight: 800; margin-bottom: 8px; }
        .cta-box p { color: rgba(255, 255, 255, 0.88); font-size: 13px; line-height: 1.5; margin-bottom: 18px; }
        .cta-box .btn-main { display: block; text-align: center; background: #fff; color: var(--purple-main); font-weight: 800; font-size: 14px; padding: 12px 18px; border-radius: 999px; text-decoration: none; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(0,0,0,0.12); }
        .cta-box .btn-main:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0,0,0,0.18); }
        .cta-box .guarantee { font-size: 11.5px; color: rgba(255, 255, 255, 0.75); text-align: center; margin-top: 10px; }

        .site-footer { background: #110524; color: #B3A4C8; padding: 48px 24px; border-top: 1px solid rgba(255,255,255,0.08); margin-top: 60px; font-size: 13.5px; }
        .footer-inner { max-width: 1240px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 32px; }
        .footer-col h5 { color: #fff; font-size: 15px; font-weight: 700; margin-bottom: 14px; }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .footer-col a { color: #B3A4C8; text-decoration: none; }
        .footer-col a:hover { color: #fff; }
        .footer-bottom { max-width: 1240px; margin: 32px auto 0 auto; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center; font-size: 12px; color: #7B6894; }
    </style>
</head>
<body>

<header class="site-header">
    <div class="nav-inner">
        <a href="/" class="nav-logo" aria-label="GradeMotion Home">
            <img src="/gm1.webp" alt="GradeMotion" width="108" height="45">
        </a>
        <ul class="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/tutor" class="active">Worldwide Tutoring</a></li>
            <li><a href="/solutions">Past Papers</a></li>
            <li><a href="/topics">Topic Guides</a></li>
            <li><a href="/schedule">1-on-1 Schedule</a></li>
            <li><a href="https://forms.gle/grademotion-free-diagnostic" target="_blank" class="nav-btn">Free Diagnostic &rarr;</a></li>
        </ul>
    </div>
</header>
`;
}

function getFooter() {
    return `
<footer class="site-footer">
    <div class="footer-inner">
        <div class="footer-col" style="max-width: 380px;">
            <h5>GradeMotion</h5>
            <p style="font-size: 13px; line-height: 1.6; color: #B3A4C8; margin-bottom: 12px;">
                Elite 1-on-1 tutoring for Cambridge International (CIE 9231) and Edexcel (9FM0) A-Level Further Mathematics. Directed by Tutor Sheefa (10+ years, 42 IB points).
            </p>
            <div style="font-size: 12px; color: #7B6894;">
                &copy; ${new Date().getFullYear()} GradeMotion. All rights reserved.
            </div>
        </div>
        <div class="footer-col">
            <h5>International Tutoring Hubs</h5>
            <ul>
                <li><a href="/tutor/dubai-a-level-further-maths">Dubai &amp; UAE</a></li>
                <li><a href="/tutor/abu-dhabi-a-level-further-maths">Abu Dhabi</a></li>
                <li><a href="/tutor/riyadh-a-level-further-maths">Riyadh (Saudi Arabia)</a></li>
                <li><a href="/tutor/singapore-a-level-further-maths">Singapore</a></li>
                <li><a href="/tutor/hong-kong-a-level-further-maths">Hong Kong</a></li>
                <li><a href="/tutor/london-a-level-further-maths">London (UK)</a></li>
                <li><a href="/tutor/malaysia-a-level-further-maths">Malaysia (KTJ &amp; GIS)</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h5>Academic Resources</h5>
            <ul>
                <li><a href="/solutions">May 2025 Edexcel Solutions</a></li>
                <li><a href="/topics">Syllabus Topic Guides</a></li>
                <li><a href="/schedule">1-on-1 Lesson Calendar</a></li>
                <li><a href="https://www.youtube.com/@tutorsheefa" target="_blank" rel="noopener">YouTube: @tutorsheefa</a></li>
            </ul>
        </div>
    </div>
    <div class="footer-bottom">
        Cambridge Assessment International Education and Pearson Edexcel are registered trademarks. GradeMotion is an independent elite tutoring consultancy and is not affiliated with or endorsed by Cambridge International or Pearson.
    </div>
</footer>
</body>
</html>`;
}

// ----------------------------------------------------
// GENERATOR 1: 8 Geo-Targeted Location Pages
// ----------------------------------------------------
console.log(`Generating ${locations.length} Geo-Targeted landing pages...`);

locations.forEach(loc => {
    const canonicalPath = `/tutor/${loc.slug}`;
    const pageDir = path.join(tutorDir, loc.slug);
    if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });

    const schemaJson = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.grademotion.com/" },
                    { "@type": "ListItem", "position": 2, "name": "Worldwide Tutoring", "item": "https://www.grademotion.com/tutor" },
                    { "@type": "ListItem", "position": 3, "name": `${loc.city} Further Maths Tutor`, "item": `https://www.grademotion.com${canonicalPath}` }
                ]
            },
            {
                "@type": "EducationalOrganization",
                "name": `GradeMotion - A-Level Further Maths Tutor ${loc.city}`,
                "url": `https://www.grademotion.com${canonicalPath}`,
                "logo": "https://www.grademotion.com/gm1.webp",
                "description": loc.metaDescription,
                "areaServed": [loc.city, loc.country],
                "founder": {
                    "@type": "Person",
                    "name": "Tutor Sheefa",
                    "jobTitle": "A-Level Further Mathematics Specialist Tutor",
                    "description": "Specialist tutor with 42 IB points and 15+ years of coaching Cambridge CIE 9231 and Edexcel 9FM0 Further Mathematics students toward Imperial, Cambridge, Oxford, and UCL admissions.",
                    "knowsAbout": [
                        "Cambridge International CIE 9231 Further Mathematics",
                        "Pearson Edexcel 9FM0 Further Mathematics",
                        "Imperial College Engineering & Computing Admissions",
                        "STEP, MAT & TMUA Mathematics Assessments"
                    ]
                }
            },
            {
                "@type": "FAQPage",
                "mainEntity": loc.faqs.map(f => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f.a
                    }
                }))
            }
        ]
    };

    let html = getHead(loc.metaTitle, loc.metaDescription, canonicalPath, schemaJson);

    html += `
<div class="breadcrumbs-bar">
    <nav aria-label="Breadcrumb">
        <ol class="breadcrumbs">
            <li><a href="/">Home</a></li>
            <li class="sep">/</li>
            <li><a href="/tutor">Worldwide Tutoring</a></li>
            <li class="sep">/</li>
            <li class="current">${escapeHtml(loc.city)}</li>
        </ol>
    </nav>
</div>

<main class="main-content">
    <div class="badge-row">
        <span class="badge badge-purple">${loc.flag} ${escapeHtml(loc.country)} Specialist</span>
        <span class="badge badge-pink">${escapeHtml(loc.timezoneBadge)}</span>
        <span class="badge badge-zinc">80% A/A* Success Rate</span>
    </div>

    <h1>${escapeHtml(loc.heroTitle)}</h1>
    <p style="font-size: 17px; max-width: 860px; margin-bottom: 20px; color: var(--purple-deep); font-weight: 500;">
        ${escapeHtml(loc.heroSubtitle)}
    </p>

    <div class="trust-strip">
        <span>⭐ 5.0 Rating</span>
        <span>✓ 8,000+ Advanced Lessons</span>
        <span>✓ Imperial · Cambridge · Oxford · LSE Placements</span>
        <span>🛡️ 100% Rollover Upgrade Guarantee</span>
    </div>

    <div class="layout-grid">
        <!-- Left Content -->
        <div>
            <!-- Premier Schools Targeted -->
            <div class="content-card">
                <h2>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B2CBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                    Specialist Coaching for Students at Premier ${escapeHtml(loc.city)} Schools
                </h2>
                <p>
                    Students attending top British international schools face intense pressure to secure predicted A/A* grades for high-tariff UK university courses. Tutor Sheefa provides rigorous, 1-on-1 mentorship specifically calibrated to the examination boards and standards used across premier schools in ${escapeHtml(loc.city)}:
                </p>
                <div class="school-chips">
                    ${loc.schools.map(s => `<span class="school-chip">&#127891; ${escapeHtml(s)}</span>`).join('')}
                </div>
                <p style="font-size: 14.5px; margin-bottom: 0;">
                    ${escapeHtml(loc.curriculumFocus)}
                </p>
            </div>

            <!-- Timezone & Scheduling Advantage -->
            <div class="content-card">
                <h2>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B2CBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    Timezone Synchronized: ${escapeHtml(loc.timezoneName)}
                </h2>
                <p>
                    ${escapeHtml(loc.timezoneDetails)}
                </p>
                <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 16px 20px; margin-top: 14px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px;">
                    <div>
                        <div style="font-size: 14px; font-weight: 700; color: var(--purple-deep);">Live Slot Availability</div>
                        <div style="font-size: 12.5px; color: var(--text-light);">Browser automatically converts slots to your local time</div>
                    </div>
                    <a href="/schedule" class="nav-btn" style="font-size: 13px; padding: 8px 16px;">
                        Open Calendar Booking &rarr;
                    </a>
                </div>
            </div>

            <!-- Video Proof: Tutor Sheefa in Action -->
            <div class="content-card">
                <h2>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B2CBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    Teaching Dynamic &amp; Pedagogical Precision
                </h2>
                <p>
                    Experience Tutor Sheefa's step-by-step examination walkthrough on a challenging Further Pure Mathematics paper:
                </p>
                <div style="background: #000; border-radius: var(--radius-md); overflow: hidden; position: relative; padding-top: 56.25%; margin-top: 16px;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube-nocookie.com/embed/2La5fjgOZfw?rel=0" title="Tutor Sheefa A-Level Further Maths Walkthrough" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                </div>
            </div>

            <!-- Tuition Packages & Pricing -->
            <div class="content-card">
                <h2>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B2CBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                    Private Tutoring Packages (${escapeHtml(loc.pricing.currencyCode)})
                </h2>
                <p>
                    Transparent, fixed investment tiers designed to dismantle specific syllabus obstacles and secure university entrance:
                </p>

                <div class="pricing-grid">
                    <!-- Trial -->
                    <div class="pricing-card">
                        <div>
                            <div class="p-title">2-Hour Evaluation Session</div>
                            <div class="p-price">${loc.pricing.currencySymbol}${loc.pricing.trial.price} <span style="font-size: 13px; font-weight: 500; color: var(--text-light);">${loc.pricing.currencyCode}</span></div>
                            <div class="p-desc">Deep diagnostic audit and live 2-hour coaching session. Includes our 100% Rollover Upgrade Guarantee.</div>
                        </div>
                        <a href="${loc.pricing.trial.url}" class="nav-btn" style="text-align: center; width: 100%;">Enrol Evaluation &rarr;</a>
                    </div>

                    <!-- Topic Surgery -->
                    <div class="pricing-card">
                        <div>
                            <div class="p-title">8-Hour Topic Surgery</div>
                            <div class="p-price">${loc.pricing.currencySymbol}${loc.pricing.surgery.price} <span style="font-size: 13px; font-weight: 500; color: var(--text-light);">${loc.pricing.currencyCode}</span></div>
                            <div class="p-desc">Targeted eradication of 1–2 difficult syllabus areas (e.g. 3D Vectors, Differential Equations, Argand Loci).</div>
                        </div>
                        <a href="${loc.pricing.surgery.url}" class="nav-btn" style="text-align: center; width: 100%;">Enrol Sprint &rarr;</a>
                    </div>

                    <!-- Exam Readiness -->
                    <div class="pricing-card">
                        <div>
                            <div class="p-title">16-Hour Exam Readiness</div>
                            <div class="p-price">${loc.pricing.currencySymbol}${loc.pricing.readiness.price} <span style="font-size: 13px; font-weight: 500; color: var(--text-light);">${loc.pricing.currencyCode}</span></div>
                            <div class="p-desc">Comprehensive past-paper walkthroughs, mark-scheme conditioning, and high-speed exam strategy.</div>
                        </div>
                        <a href="${loc.pricing.readiness.url}" class="nav-btn" style="text-align: center; width: 100%;">Enrol Sprint &rarr;</a>
                    </div>

                    <!-- Bootcamp -->
                    <div class="pricing-card">
                        <div>
                            <div class="p-title">40-Hour Intensive Bootcamp</div>
                            <div class="p-price">${loc.pricing.currencySymbol}${loc.pricing.bootcamp.price} <span style="font-size: 13px; font-weight: 500; color: var(--text-light);">${loc.pricing.currencyCode}</span></div>
                            <div class="p-desc">Full-curriculum overhaul from foundations to guaranteed A/A* university admission readiness.</div>
                        </div>
                        <a href="${loc.pricing.bootcamp.url}" class="nav-btn" style="text-align: center; width: 100%;">Enrol Bootcamp &rarr;</a>
                    </div>
                </div>
            </div>

            <!-- GEO FAQ Block -->
            <div class="content-card">
                <h2>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B2CBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    Frequently Asked Questions for ${escapeHtml(loc.city)} Families
                </h2>
                
                ${loc.faqs.map(f => `
                    <details class="faq-item">
                        <summary>
                            <span>${escapeHtml(f.q)}</span>
                            <span style="color: var(--purple-main); font-size: 18px;">+</span>
                        </summary>
                        <div class="faq-ans">${escapeHtml(f.a)}</div>
                    </details>
                `).join('')}
            </div>
        </div>

        <!-- Right Sticky Sidebar -->
        <aside class="sidebar">
            <div class="tutor-card">
                <img src="/Tutor%20Sheefa.webp" alt="Tutor Sheefa" width="92" height="92">
                <div class="tutor-name">Tutor Sheefa</div>
                <div class="tutor-title">A-Level Further Maths Specialist</div>
                <p class="tutor-desc">
                    Former 42 IB points achiever with 15+ years of dedicated coaching for Cambridge CIE 9231 and Edexcel 9FM0. Proven track record placing students at Imperial, Cambridge, Oxford, and LSE.
                </p>
                <a href="/schedule" class="nav-btn" style="display: block; width: 100%;">Schedule Lesson &rarr;</a>
            </div>

            <div class="cta-box">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #FFD1E6; font-weight: 700; margin-bottom: 6px;">Evaluation Session</div>
                <h3>2-Hour Diagnostic &amp; Teaching Evaluation</h3>
                <p>
                    Experience Tutor Sheefa's diagnostic methodology firsthand with zero long-term commitment.
                </p>
                <div style="font-size: 26px; font-weight: 800; color: #fff; margin-bottom: 14px;">
                    ${loc.pricing.currencySymbol}${loc.pricing.trial.price} <span style="font-size: 14px; font-weight: 500; opacity: 0.85;">${loc.pricing.currencyCode}</span>
                </div>
                <a href="${loc.pricing.trial.url}" class="btn-main">Enrol Evaluation Session &rarr;</a>
                <div class="guarantee">&#128737;&#65039; 100% of this fee is credited toward subsequent sprint upgrades</div>
            </div>

            <div class="content-card" style="padding: 20px;">
                <h4 style="font-size: 14.5px; font-weight: 700; color: var(--purple-deep); margin-bottom: 12px;">Worldwide Tutoring Hubs</h4>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
                    ${locations.map(other => `
                        <li>
                            <a href="/tutor/${other.slug}" style="font-size: 13px; color: ${other.slug === loc.slug ? 'var(--purple-main); font-weight: 700;' : 'var(--text-muted);'}; text-decoration: none;">
                                ${other.flag} Further Maths Tutor ${escapeHtml(other.city)}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </aside>
    </div>
</main>
`;

    html += getFooter();
    fs.writeFileSync(path.join(pageDir, 'index.html'), html, 'utf8');
});

console.log('Finished generating Geo-Targeted landing pages.');

// ----------------------------------------------------
// GENERATOR 2: Master Tutoring Directory (/tutor/index.html)
// ----------------------------------------------------
console.log('Generating Master Tutoring Directory (/tutor/index.html)...');

const tutorIndexSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Worldwide A-Level Further Mathematics Tutoring Hub | GradeMotion",
    "description": "Private 1-on-1 Cambridge (CIE 9231) & Edexcel (9FM0) Further Maths tutoring for international students across UAE, Saudi Arabia, Singapore, Hong Kong, UK, and Malaysia.",
    "url": "https://www.grademotion.com/tutor"
};

let tutorIndexHtml = getHead(
    "Worldwide A-Level Further Mathematics Tutoring | GradeMotion",
    "Private 1-on-1 Cambridge & Edexcel Further Maths tutoring across Dubai, Abu Dhabi, Riyadh, Jeddah, Singapore, Hong Kong, London, and Malaysia by Tutor Sheefa.",
    "/tutor",
    tutorIndexSchema
);

tutorIndexHtml += `
<div class="breadcrumbs-bar">
    <nav aria-label="Breadcrumb">
        <ol class="breadcrumbs">
            <li><a href="/">Home</a></li>
            <li class="sep">/</li>
            <li class="current">Worldwide Tutoring Hubs</li>
        </ol>
    </nav>
</div>

<main class="main-content">
    <div class="badge-row">
        <span class="badge badge-purple">International Elite Tutoring</span>
        <span class="badge badge-zinc">8 Target Regions</span>
        <span class="badge badge-pink">CIE 9231 &bull; Edexcel 9FM0</span>
    </div>

    <h1>Worldwide A-Level Further Mathematics Tutoring</h1>
    <p style="font-size: 16.5px; max-width: 840px; margin-bottom: 32px;">
        GradeMotion provides dedicated 1-on-1 specialist coaching for high-performing students enrolled in premier British curriculum schools across the Middle East, Asia, and the United Kingdom.
    </p>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px;">
        ${locations.map(loc => `
            <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 26px; box-shadow: var(--card-shadow); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <span style="font-size: 28px;">${loc.flag}</span>
                        <span class="badge badge-purple">${escapeHtml(loc.timezoneBadge.split('•')[0])}</span>
                    </div>
                    <h3 style="font-size: 19px; margin-bottom: 8px;">${escapeHtml(loc.city)}</h3>
                    <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.5; margin-bottom: 14px;">${escapeHtml(loc.heroSubtitle)}</p>
                    
                    <div style="font-size: 12px; color: var(--purple-main); font-weight: 700; margin-bottom: 6px;">Key Schools Served:</div>
                    <div style="font-size: 12.5px; color: var(--text-light); line-height: 1.4; margin-bottom: 18px;">
                        ${loc.schools.slice(0, 3).map(s => escapeHtml(s)).join(' &bull; ')}
                    </div>
                </div>
                <a href="/tutor/${loc.slug}" class="nav-btn" style="text-align: center; display: block; width: 100%;">
                    View ${escapeHtml(loc.city)} Tutoring &rarr;
                </a>
            </div>
        `).join('')}
    </div>
</main>
`;

tutorIndexHtml += getFooter();
fs.writeFileSync(path.join(tutorDir, 'index.html'), tutorIndexHtml, 'utf8');
console.log('Saved /tutor/index.html');

// ----------------------------------------------------
// GENERATOR 3: Update sitemap.xml with Location Pages
// ----------------------------------------------------
const sitemapPath = path.join(__dirname, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
    let sitemap = fs.readFileSync(sitemapPath, 'utf8');
    const today = new Date().toISOString().split('T')[0];

    let locationEntries = `  <!-- International Tutoring Hubs (Geo-Targeted) -->\n  <url>\n    <loc>https://www.grademotion.com/tutor</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;

    locations.forEach(loc => {
        locationEntries += `  <url>\n    <loc>https://www.grademotion.com/tutor/${loc.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
    });

    if (!sitemap.includes('/tutor/')) {
        sitemap = sitemap.replace('</urlset>', `${locationEntries}</urlset>`);
        fs.writeFileSync(sitemapPath, sitemap, 'utf8');
        console.log('sitemap.xml updated with 8 Geo-Targeted locations + /tutor hub.');
    }
}
