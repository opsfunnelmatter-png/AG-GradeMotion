const fs = require('fs');
const path = require('path');

const topicsPath = path.join(__dirname, 'data', 'topics.json');
const questionsPath = path.join(__dirname, 'data', 'questions.json');

if (!fs.existsSync(topicsPath) || !fs.existsSync(questionsPath)) {
    console.error('Missing data files. Run python scripts/compile_database.py first.');
    process.exit(1);
}

const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

// Lookup helper
const topicsMap = {};
topics.forEach(t => { topicsMap[t.slug] = t; });

// Ensure output directories
const solutionsDir = path.join(__dirname, 'solutions');
const topicsDir = path.join(__dirname, 'topics');
fs.makedirsSync = function(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};
fs.makedirsSync(solutionsDir);
fs.makedirsSync(topicsDir);

// Shared Head & KaTeX
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
    <title>${escapeHtml(title)} | GradeMotion</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="https://www.grademotion.com${canonicalPath}">
    
    <!-- Open Graph & Social -->
    <meta property="og:site_name" content="GradeMotion">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="https://www.grademotion.com${canonicalPath}">
    <meta property="og:type" content="article">
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

    <!-- KaTeX Mathematical Typography -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js" crossorigin="anonymous"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js" crossorigin="anonymous"
            onload="renderMathInElement(document.body, {delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}], throwOnError: false});"></script>

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
            --pink-soft: rgba(255, 74, 149, 0.08);
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
        
        /* Navbar */
        .site-header { position: sticky; top: 0; z-index: 1000; background: var(--header-bg); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border-subtle); }
        .nav-inner { max-width: 1240px; margin: 0 auto; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { display: flex; align-items: center; text-decoration: none; }
        .nav-logo img { height: 38px; width: auto; }
        .nav-links { display: flex; align-items: center; gap: 24px; list-style: none; }
        .nav-links a { color: var(--text-muted); font-size: 14.5px; font-weight: 600; text-decoration: none; transition: color 0.2s ease; }
        .nav-links a:hover, .nav-links a.active { color: var(--purple-main); }
        .nav-btn { background: var(--purple-main); color: #fff !important; padding: 9px 18px; border-radius: 999px; font-weight: 700; font-size: 13.5px; transition: all 0.2s ease; }
        .nav-btn:hover { background: var(--purple-hover); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(123, 44, 191, 0.25); }

        /* Breadcrumbs */
        .breadcrumbs-bar { max-width: 1240px; margin: 0 auto; padding: 18px 24px 0 24px; width: 100%; }
        .breadcrumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 13px; color: var(--text-light); list-style: none; }
        .breadcrumbs a { color: var(--text-muted); text-decoration: none; font-weight: 500; }
        .breadcrumbs a:hover { color: var(--purple-main); text-decoration: underline; }
        .breadcrumbs .sep { color: var(--border-strong); }
        .breadcrumbs .current { color: var(--purple-main); font-weight: 600; }

        /* Container */
        .main-content { max-width: 1240px; margin: 0 auto; padding: 24px 24px 60px 24px; width: 100%; flex: 1; }
        
        /* Typography */
        h1 { font-size: 32px; font-weight: 800; line-height: 1.25; color: var(--purple-deep); letter-spacing: -0.02em; margin-bottom: 12px; }
        h2 { font-size: 22px; font-weight: 700; color: var(--purple-deep); letter-spacing: -0.01em; margin: 32px 0 16px 0; display: flex; align-items: center; gap: 10px; }
        h3 { font-size: 17px; font-weight: 700; color: var(--purple-main); margin-bottom: 8px; }
        p { margin-bottom: 14px; font-size: 15.5px; color: var(--text-muted); }

        /* Badges */
        .badge-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
        .badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; }
        .badge-purple { background: rgba(123, 44, 191, 0.08); color: var(--purple-main); border: 1px solid rgba(123, 44, 191, 0.18); }
        .badge-pink { background: rgba(255, 74, 149, 0.08); color: var(--pink-accent); border: 1px solid rgba(255, 74, 149, 0.2); }
        .badge-zinc { background: rgba(0, 0, 0, 0.04); color: #4B5563; border: 1px solid rgba(0, 0, 0, 0.08); }

        /* CIE Cross-Board Notice */
        .cross-board-banner { background: #FFFFFF; border: 1px solid var(--border-subtle); border-left: 4px solid var(--purple-main); border-radius: var(--radius-md); padding: 14px 18px; margin-bottom: 24px; box-shadow: var(--card-shadow); display: flex; gap: 14px; align-items: flex-start; }
        .cross-board-icon { font-size: 20px; line-height: 1; }
        .cross-board-text { font-size: 13.5px; color: var(--text-muted); line-height: 1.55; }
        .cross-board-text strong { color: var(--purple-deep); }

        /* Layout Grid */
        .layout-grid { display: grid; grid-template-columns: 1fr 340px; gap: 32px; align-items: start; }
        @media (max-width: 960px) {
            .layout-grid { grid-template-columns: 1fr; }
            .site-header .nav-links { display: none; }
            h1 { font-size: 26px; }
        }

        /* Video Player Card */
        .video-card { background: #000; border-radius: var(--radius-lg); overflow: hidden; box-shadow: 0 16px 40px rgba(23, 10, 44, 0.18); position: relative; padding-top: 56.25%; margin-bottom: 28px; }
        .video-card iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }

        /* Content Cards */
        .content-card { background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 26px; margin-bottom: 24px; box-shadow: var(--card-shadow); }
        
        /* Math Blocks */
        .formula-box { background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px 20px; margin: 16px 0; overflow-x: auto; }
        .formula-box .title { font-size: 13px; font-weight: 700; color: var(--purple-main); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }

        /* Examiner Traps */
        .trap-card { background: #FFF5F7; border: 1px solid rgba(255, 74, 149, 0.25); border-left: 4px solid var(--pink-accent); border-radius: var(--radius-md); padding: 18px 20px; margin: 20px 0; }
        .trap-card h3 { color: #C2185B; display: flex; align-items: center; gap: 8px; font-size: 15px; margin-bottom: 10px; }
        .trap-card ul { padding-left: 20px; margin: 0; }
        .trap-card li { font-size: 14px; color: #6E1A34; margin-bottom: 8px; line-height: 1.55; }

        /* Solution Steps */
        .step-item { border-left: 2px solid var(--purple-main); padding-left: 18px; margin: 20px 0; position: relative; }
        .step-item::before { content: ''; position: absolute; left: -6px; top: 4px; width: 10px; height: 10px; border-radius: 50%; background: var(--purple-main); }
        .step-item h4 { font-size: 15.5px; font-weight: 700; color: var(--purple-deep); margin-bottom: 6px; }
        .step-item p { font-size: 14.5px; margin-bottom: 8px; }

        /* Transcript Accordion */
        details.transcript-details { background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px 18px; margin-top: 24px; }
        details.transcript-details summary { font-size: 14px; font-weight: 700; color: var(--purple-deep); cursor: pointer; user-select: none; display: flex; align-items: center; justify-content: space-between; }
        details.transcript-details .transcript-body { margin-top: 14px; font-size: 13.5px; color: var(--text-muted); line-height: 1.7; max-height: 320px; overflow-y: auto; padding-right: 10px; }

        /* Prev / Next Question Nav */
        .pager-nav { display: flex; justify-content: space-between; gap: 16px; margin: 36px 0; padding-top: 20px; border-top: 1px solid var(--border-subtle); }
        .pager-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; border-radius: var(--radius-md); background: var(--bg-surface); border: 1px solid var(--border-subtle); color: var(--text-main); text-decoration: none; font-size: 14px; font-weight: 600; transition: all 0.2s ease; box-shadow: var(--card-shadow); }
        .pager-btn:hover { border-color: var(--purple-main); color: var(--purple-main); transform: translateY(-1px); }

        /* Sticky Sidebar */
        .sidebar { position: sticky; top: 86px; display: flex; flex-direction: column; gap: 20px; }
        .tutor-card { background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--card-shadow); text-align: center; }
        .tutor-card img { width: 88px; height: 88px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(123, 44, 191, 0.15); margin-bottom: 12px; }
        .tutor-name { font-size: 17px; font-weight: 800; color: var(--purple-deep); margin-bottom: 2px; }
        .tutor-title { font-size: 13px; color: var(--purple-main); font-weight: 600; margin-bottom: 12px; }
        .tutor-desc { font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 18px; text-align: left; }

        .cta-box { background: linear-gradient(135deg, #7B2CBF 0%, #5A189A 100%); color: #fff; border-radius: var(--radius-lg); padding: 24px; box-shadow: 0 14px 32px rgba(123, 44, 191, 0.28); }
        .cta-box h3 { color: #fff; font-size: 18px; font-weight: 800; margin-bottom: 8px; }
        .cta-box p { color: rgba(255, 255, 255, 0.88); font-size: 13px; line-height: 1.5; margin-bottom: 18px; }
        .cta-box .btn-main { display: block; text-align: center; background: #fff; color: var(--purple-main); font-weight: 800; font-size: 14px; padding: 12px 18px; border-radius: 999px; text-decoration: none; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(0,0,0,0.12); }
        .cta-box .btn-main:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0,0,0,0.18); }
        .cta-box .guarantee { font-size: 11.5px; color: rgba(255, 255, 255, 0.75); text-align: center; margin-top: 10px; }

        .related-card { background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 20px; box-shadow: var(--card-shadow); }
        .related-card h4 { font-size: 14.5px; font-weight: 700; color: var(--purple-deep); margin-bottom: 14px; }
        .related-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .related-list a { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; color: var(--text-muted); text-decoration: none; line-height: 1.4; transition: color 0.2s ease; }
        .related-list a:hover { color: var(--purple-main); }
        .related-list a .num { font-weight: 700; color: var(--purple-main); min-width: 26px; }

        /* Footer */
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
            <li><a href="/solutions" class="${canonicalPath.startsWith('/solutions') ? 'active' : ''}">Past Paper Solutions</a></li>
            <li><a href="/topics" class="${canonicalPath.startsWith('/topics') ? 'active' : ''}">Topic Guides</a></li>
            <li><a href="/schedule">1-on-1 Schedule</a></li>
            <li><a href="/schedule?type=diagnostic" class="nav-btn">Free Diagnostic &rarr;</a></li>
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
            <h5>Past Paper Walkthroughs</h5>
            <ul>
                <li><a href="/solutions">May 2025 Edexcel CP1 & CP2 Solutions</a></li>
                <li><a href="/topics/matrices-and-linear-transformations">3x3 Matrices & Determinants</a></li>
                <li><a href="/topics/complex-numbers-loci-and-roots">Complex Numbers & Argand Loci</a></li>
                <li><a href="/topics/differential-equations">Differential Equations Guide</a></li>
                <li><a href="/topics/hyperbolic-functions-and-calculus">Hyperbolic Functions & Calculus</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h5>Admissions & Tutoring</h5>
            <ul>
                <li><a href="/schedule">Book 1-on-1 Lesson Slot</a></li>
                <li><a href="/pay/usd/trial">2-Hour Evaluation Trial ($210 USD)</a></li>
                <li><a href="/pay/my/trial">2-Hour Evaluation Trial (RM 380 MYR)</a></li>
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

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ----------------------------------------------------
// GENERATOR 1: Past Paper Question Solutions
// ----------------------------------------------------
console.log(`Generating ${questions.length} Past Paper Solution pages...`);

questions.forEach((q, idx) => {
    const topic = topicsMap[q.topicSlug] || topics[0];
    const prevQ = idx > 0 ? questions[idx - 1] : null;
    const nextQ = idx < questions.length - 1 ? questions[idx + 1] : null;

    // Filter other questions in same paper
    const paperQuestions = questions.filter(item => item.paper === q.paper);

    const canonicalPath = `/solutions/${q.slug}`;
    const questionDir = path.join(solutionsDir, q.slug);
    fs.makedirsSync(questionDir);

    const schemaJson = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.grademotion.com/" },
                    { "@type": "ListItem", "position": 2, "name": "Solutions", "item": "https://www.grademotion.com/solutions" },
                    { "@type": "ListItem", "position": 3, "name": `${q.board} ${q.year} ${q.paper}`, "item": `https://www.grademotion.com/solutions#${q.paper.replace(/\s+/g, '-').toLowerCase()}` },
                    { "@type": "ListItem", "position": 4, "name": `${q.questionNum} Solution`, "item": `https://www.grademotion.com${canonicalPath}` }
                ]
            },
            {
                "@type": "VideoObject",
                "name": q.title,
                "description": q.metaDescription,
                "thumbnailUrl": `https://i.ytimg.com/vi/${q.id}/hqdefault.jpg`,
                "uploadDate": "2025-05-20T00:00:00Z",
                "contentUrl": `https://www.youtube.com/watch?v=${q.id}`,
                "embedUrl": `https://www.youtube-nocookie.com/embed/${q.id}`,
                "publisher": {
                    "@type": "Organization",
                    "name": "GradeMotion",
                    "logo": { "@type": "ImageObject", "url": "https://www.grademotion.com/gm1.webp" }
                }
            },
            {
                "@type": "EducationalWebPage",
                "name": q.title,
                "description": q.metaDescription,
                "learningResourceType": "Exam Solution Walkthrough",
                "educationalLevel": "A-Level Further Mathematics",
                "assesses": topic.title
            }
        ]
    };

    let html = getHead(q.title, q.metaDescription, canonicalPath, schemaJson);

    // Breadcrumbs
    html += `
<div class="breadcrumbs-bar">
    <nav aria-label="Breadcrumb">
        <ol class="breadcrumbs">
            <li><a href="/">Home</a></li>
            <li class="sep">/</li>
            <li><a href="/solutions">Past Paper Solutions</a></li>
            <li class="sep">/</li>
            <li><a href="/solutions">${escapeHtml(q.board)} ${escapeHtml(q.year)} ${escapeHtml(q.paper)}</a></li>
            <li class="sep">/</li>
            <li class="current">${escapeHtml(q.questionNum)}: ${escapeHtml(topic.title.split(':')[0])}</li>
        </ol>
    </nav>
</div>

<main class="main-content">
    <div class="badge-row">
        <span class="badge badge-purple">${escapeHtml(q.board)} GCE A-Level</span>
        <span class="badge badge-zinc">${escapeHtml(q.paper)} (${escapeHtml(q.paperCode)})</span>
        <span class="badge badge-pink">${escapeHtml(q.series)} ${escapeHtml(q.year)} &bull; ${escapeHtml(q.questionNum)}</span>
    </div>

    <h1>${escapeHtml(q.title)}</h1>
    <p style="font-size: 16px; margin-bottom: 24px;">
        Comprehensive worked solution and examiner mark-scheme analysis by <strong>Tutor Sheefa</strong>. Focuses on mark allocation, algebraic traps, and step-by-step mathematical reasoning.
    </p>

    <!-- Cross-Board Notice -->
    <div class="cross-board-banner">
        <div class="cross-board-icon">&#128204;</div>
        <div class="cross-board-text">
            <strong>Studying Cambridge International (CIE 9231)?</strong> While this question was set in the Edexcel Further Maths examination, the underlying mathematical theory and examiner rubric for <em>${escapeHtml(topic.title)}</em> are <strong>100% applicable to CIE Paper 1 & 2</strong>.
        </div>
    </div>

    <div class="layout-grid">
        <!-- Main Column -->
        <div>
            <!-- Video Player -->
            <div class="video-card">
                <iframe src="https://www.youtube-nocookie.com/embed/${q.id}?rel=0" title="${escapeHtml(q.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
            </div>

            <!-- Archetype Box -->
            <div class="content-card">
                <h2>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B2CBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    The Exam Archetype: ${escapeHtml(q.archetype)}
                </h2>
                <p>
                    Examiners do not invent new mathematics each year &mdash; they test <strong>consistent structural archetypes</strong>. In this paper, ${escapeHtml(q.questionNum)} tests your ability to navigate the boundary between conceptual algebra and precise numerical computation.
                </p>
                <div class="formula-box">
                    <div class="title">Core Formulae Tested</div>
                    ${q.keyFormulas.map(f => `<p style="margin-bottom: 6px; font-size: 16px;">$$${f}$$</p>`).join('')}
                </div>
            </div>

            <!-- Examiner Traps & Common Penalties -->
            <div class="trap-card">
                <h3>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C2185B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    Examiner Traps &amp; Common Mark-Scheme Penalties
                </h3>
                <ul>
                    ${q.examinerTraps.map(trap => `<li>${escapeHtml(trap)}</li>`).join('')}
                </ul>
            </div>

            <!-- Step by step solution -->
            <div class="content-card">
                <h2>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B2CBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                    Formal Mathematical Solution
                </h2>
                <p style="margin-bottom: 20px;">
                    Below is the full step-by-step derivation meeting official mark-scheme criteria for method (M) and accuracy (A) marks:
                </p>

                ${q.solutionSteps.map(step => `
                    <div class="step-item">
                        <h4>${escapeHtml(step.heading)}</h4>
                        <p>${escapeHtml(step.explanation)}</p>
                        <div class="formula-box" style="margin: 8px 0 14px 0;">
                            $$${step.math}$$
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Spoken Audio Transcript (Collapsible) -->
            ${q.transcriptText ? `
            <details class="transcript-details">
                <summary>
                    <span>&#127897;&#65039; Read Spoken Video Explanation (${q.transcriptSnippetsCount} segments, ${q.transcriptText.split(' ').length} words)</span>
                    <span style="font-size: 12px; color: var(--purple-main);">&#9662; Expand</span>
                </summary>
                <div class="transcript-body">
                    <p style="font-style: italic; margin-bottom: 12px; font-size: 12.5px; color: var(--text-light);">
                        Unedited transcript of Tutor Sheefa's spoken audio instructions during the walkthrough:
                    </p>
                    <p>${escapeHtml(q.transcriptText)}</p>
                </div>
            </details>
            ` : ''}

            <!-- Previous / Next Pager -->
            <div class="pager-nav">
                <div>
                    ${prevQ ? `
                    <a href="/solutions/${prevQ.slug}" class="pager-btn">
                        &larr; Previous: ${escapeHtml(prevQ.questionNum)}
                    </a>` : ''}
                </div>
                <div>
                    ${nextQ ? `
                    <a href="/solutions/${nextQ.slug}" class="pager-btn">
                        Next: ${escapeHtml(nextQ.questionNum)} &rarr;
                    </a>` : ''}
                </div>
            </div>
        </div>

        <!-- Sidebar -->
        <aside class="sidebar">
            <!-- Tutor Card -->
            <div class="tutor-card">
                <img src="/Tutor%20Sheefa.webp" alt="Tutor Sheefa" width="88" height="88">
                <div class="tutor-name">Tutor Sheefa</div>
                <div class="tutor-title">Further Mathematics Specialist</div>
                <p class="tutor-desc">
                    10+ years of high-ticket coaching with an 80% A/A* track record for CIE 9231 &amp; Edexcel IAL students entering Imperial, Cambridge, Oxford, and UCL.
                </p>
                <a href="/schedule" class="nav-btn" style="display: block; width: 100%;">View Lesson Availability &rarr;</a>
            </div>

            <!-- Direct CTA Box -->
            <div class="cta-box">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #FFD1E6; font-weight: 700; margin-bottom: 6px;">Evaluation Session</div>
                <h3>Stuck on ${escapeHtml(topic.title.split(':')[0])}?</h3>
                <p>
                    Book a private 2-Hour Evaluation Session. We diagnose your exact syllabus gaps and install university-grade exam technique.
                </p>
                <a href="/pay/usd/trial" class="btn-main">Enrol Trial ($210 USD) &rarr;</a>
                <div style="margin-top: 8px; text-align: center;">
                    <a href="/pay/my/trial" style="color: rgba(255,255,255,0.9); font-size: 12px; text-decoration: underline;">Or Enrol in MYR (RM 380) &rarr;</a>
                </div>
                <div class="guarantee">&#128737;&#65039; 100% Rollover Credit Guarantee toward sprint upgrades</div>
            </div>

            <!-- Evergreen Topic Link -->
            <div class="related-card">
                <h4>Evergreen Topic Guide</h4>
                <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">
                    Understand the broader conceptual framework behind this question:
                </p>
                <a href="/topics/${topic.slug}" style="display: block; background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px 14px; text-decoration: none; color: var(--purple-main); font-weight: 700; font-size: 13.5px;">
                    ${escapeHtml(topic.title)} &rarr;
                </a>
            </div>

            <!-- All Questions in Paper -->
            <div class="related-card">
                <h4>All Questions in ${escapeHtml(q.paper)}</h4>
                <ul class="related-list">
                    ${paperQuestions.map(item => `
                        <li>
                            <a href="/solutions/${item.slug}" style="${item.slug === q.slug ? 'color: var(--purple-main); font-weight: 700;' : ''}">
                                <span class="num">${escapeHtml(item.questionNum)}</span>
                                <span>${escapeHtml(item.title.split('|')[0].split(':')[1] || item.title)}</span>
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
    fs.writeFileSync(path.join(questionDir, 'index.html'), html, 'utf8');
});

console.log('Finished generating Past Paper Solution pages.');

// ----------------------------------------------------
// GENERATOR 2: Evergreen Topic Hub Pages
// ----------------------------------------------------
console.log(`Generating ${topics.length} Evergreen Topic Hub pages...`);

topics.forEach(t => {
    const canonicalPath = `/topics/${t.slug}`;
    const topicDir = path.join(topicsDir, t.slug);
    fs.makedirsSync(topicDir);

    // Find all questions associated with this topic
    const topicQuestions = questions.filter(q => q.topicSlug === t.slug);

    const schemaJson = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.grademotion.com/" },
                    { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.grademotion.com/topics" },
                    { "@type": "ListItem", "position": 3, "name": t.title, "item": `https://www.grademotion.com${canonicalPath}` }
                ]
            },
            {
                "@type": "Course",
                "name": `${t.title} - A-Level Further Mathematics Guide`,
                "description": t.description,
                "provider": {
                    "@type": "Organization",
                    "name": "GradeMotion",
                    "sameAs": "https://www.grademotion.com"
                }
            }
        ]
    };

    let html = getHead(`${t.title} | A-Level Further Maths Guide`, t.description, canonicalPath, schemaJson);

    html += `
<div class="breadcrumbs-bar">
    <nav aria-label="Breadcrumb">
        <ol class="breadcrumbs">
            <li><a href="/">Home</a></li>
            <li class="sep">/</li>
            <li><a href="/topics">Topic Guides</a></li>
            <li class="sep">/</li>
            <li class="current">${escapeHtml(t.title)}</li>
        </ol>
    </nav>
</div>

<main class="main-content">
    <div class="badge-row">
        <span class="badge badge-purple">Evergreen Topic Hub</span>
        <span class="badge badge-zinc">Edexcel 9FM0: ${escapeHtml(t.syllabusCodes.edexcel)}</span>
        <span class="badge badge-pink">Cambridge CIE 9231: ${escapeHtml(t.syllabusCodes.cie)}</span>
    </div>

    <h1>${escapeHtml(t.title)}</h1>
    <p style="font-size: 16.5px; max-width: 820px; margin-bottom: 28px;">
        ${escapeHtml(t.description)}
    </p>

    <div class="layout-grid">
        <!-- Main Content -->
        <div>
            <!-- Core Conceptual Framework -->
            <div class="content-card">
                <h2>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B2CBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                    Core Theory &amp; Formula Architecture
                </h2>
                <p>
                    Every exam board evaluates student comprehension through precise mathematical definitions and rigorous proof structures:
                </p>

                ${t.coreConcepts.map(c => `
                    <div class="step-item" style="margin: 22px 0;">
                        <h4>${escapeHtml(c.name)}</h4>
                        <p>${escapeHtml(c.explanation)}</p>
                        <div class="formula-box">
                            $$${c.latex}$$
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Examiner Traps -->
            <div class="trap-card">
                <h3>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C2185B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    Frequent Pitfalls &amp; Mark-Scheme Traps
                </h3>
                <p style="font-size: 13.5px; color: #6E1A34; margin-bottom: 10px;">
                    Analysis of chief examiner reports across Cambridge and Edexcel past series:
                </p>
                <ul>
                    ${t.examinerTraps.map(trap => `<li>${escapeHtml(trap)}</li>`).join('')}
                </ul>
            </div>

            <!-- Real Exam Exemplars (Video Walkthroughs) -->
            <div class="content-card">
                <h2>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B2CBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    Past Paper Exemplars (${topicQuestions.length} Worked Walkthroughs)
                </h2>
                <p>
                    Watch how Tutor Sheefa breaks down real past exam questions on this exact topic step-by-step:
                </p>

                <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 20px;">
                    ${topicQuestions.map(q => `
                        <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 14px; background: var(--bg-subtle);">
                            <div style="max-width: 520px;">
                                <div style="display: flex; gap: 6px; margin-bottom: 4px;">
                                    <span class="badge badge-purple" style="font-size: 11px;">${escapeHtml(q.paper)} &bull; ${escapeHtml(q.questionNum)}</span>
                                    <span class="badge badge-zinc" style="font-size: 11px;">${escapeHtml(q.series)} ${escapeHtml(q.year)}</span>
                                </div>
                                <h4 style="font-size: 15px; color: var(--purple-deep); margin-bottom: 4px;">${escapeHtml(q.title)}</h4>
                                <p style="font-size: 12.5px; margin: 0; color: var(--text-light);">${escapeHtml(q.archetype)}</p>
                            </div>
                            <a href="/solutions/${q.slug}" class="nav-btn" style="font-size: 12.5px; padding: 8px 16px;">
                                Watch &amp; Solution &rarr;
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <!-- Sidebar -->
        <aside class="sidebar">
            <!-- Sprint Recommendation Box -->
            <div class="cta-box">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #FFD1E6; font-weight: 700; margin-bottom: 6px;">Recommended Sprint</div>
                <h3>${escapeHtml(t.recommendedPackage.name)}</h3>
                <p>
                    Targeted 1-on-1 sprint with Tutor Sheefa. Eliminate weaknesses, master non-standard questions, and lock in your predicted A/A*.
                </p>
                <div style="font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 14px;">
                    $${t.recommendedPackage.usd} USD <span style="font-size: 13px; font-weight: 500; opacity: 0.8;">/ RM ${t.recommendedPackage.myr} MYR</span>
                </div>
                <a href="${t.recommendedPackage.urlUsd}" class="btn-main">Enrol in Sprint (USD) &rarr;</a>
                <div style="margin-top: 8px; text-align: center;">
                    <a href="${t.recommendedPackage.urlMyr}" style="color: rgba(255,255,255,0.9); font-size: 12px; text-decoration: underline;">Enrol in MYR (RM ${t.recommendedPackage.myr}) &rarr;</a>
                </div>
                <div class="guarantee">&#128737;&#65039; 100% Rollover Upgrade Guarantee eligible</div>
            </div>

            <!-- Other Topic Hubs -->
            <div class="related-card">
                <h4>All Topic Hubs</h4>
                <ul class="related-list">
                    ${topics.map(other => `
                        <li>
                            <a href="/topics/${other.slug}" style="${other.slug === t.slug ? 'color: var(--purple-main); font-weight: 700;' : ''}">
                                <span>&bull;</span>
                                <span>${escapeHtml(other.title)}</span>
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
    fs.writeFileSync(path.join(topicDir, 'index.html'), html, 'utf8');
});

console.log('Finished generating Evergreen Topic Hub pages.');

// ----------------------------------------------------
// GENERATOR 3: Solutions Directory Index (/solutions/index.html)
// ----------------------------------------------------
console.log('Generating Master Solutions Directory (/solutions/index.html)...');

const cp1Questions = questions.filter(q => q.paper.includes('CP1'));
const cp2Questions = questions.filter(q => q.paper.includes('CP2'));

const solutionsIndexSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "A-Level Further Maths Past Paper Worked Solutions | GradeMotion",
    "description": "Video walkthroughs, step-by-step LaTeX solutions, and mark scheme examiner analysis for Edexcel & CIE A-Level Further Mathematics past papers.",
    "url": "https://www.grademotion.com/solutions"
};

let solutionsIndexHtml = getHead(
    "A-Level Further Maths Past Paper Worked Solutions",
    "Step-by-step worked video solutions and mark scheme analysis for Edexcel GCE Further Mathematics May 2025 Core Pure 1 and Core Pure 2 by Tutor Sheefa.",
    "/solutions",
    solutionsIndexSchema
);

solutionsIndexHtml += `
<div class="breadcrumbs-bar">
    <nav aria-label="Breadcrumb">
        <ol class="breadcrumbs">
            <li><a href="/">Home</a></li>
            <li class="sep">/</li>
            <li class="current">Past Paper Solutions</li>
        </ol>
    </nav>
</div>

<main class="main-content">
    <div class="badge-row">
        <span class="badge badge-purple">GradeMotion Open Library</span>
        <span class="badge badge-zinc">22 Video Solutions</span>
        <span class="badge badge-pink">May 2025 Series</span>
    </div>

    <h1>A-Level Further Maths Past Paper Solutions</h1>
    <p style="font-size: 16.5px; max-width: 820px; margin-bottom: 32px;">
        High-definition video walkthroughs and formal mathematical derivations for every single question on the <strong>Edexcel GCE Further Maths May 2025</strong> examination, led by specialist <strong>Tutor Sheefa</strong>.
    </p>

    <!-- Topics Grid Strip -->
    <div style="margin-bottom: 40px;">
        <h2 style="margin-top: 0;">Explore by Topic Guides</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
            ${topics.map(t => `
                <a href="/topics/${t.slug}" style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px; text-decoration: none; display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--card-shadow); transition: all 0.2s ease;">
                    <h3 style="font-size: 15.5px; margin-bottom: 6px;">${escapeHtml(t.title)}</h3>
                    <p style="font-size: 12.5px; margin: 0; color: var(--text-light); line-height: 1.4;">${escapeHtml(t.description.slice(0, 100))}...</p>
                    <div style="font-size: 12px; font-weight: 700; color: var(--purple-main); margin-top: 12px;">View Topic Guide &rarr;</div>
                </a>
            `).join('')}
        </div>
    </div>

    <!-- Core Pure 1 -->
    <div id="core-pure-1" style="margin-bottom: 48px;">
        <h2>
            <span class="badge badge-purple" style="font-size: 15px; padding: 6px 14px;">Edexcel May 2025 CP1</span>
            Core Pure Mathematics 1 (9FM0/01)
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; margin-top: 16px;">
            ${cp1Questions.map(q => `
                <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 22px; box-shadow: var(--card-shadow); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <span class="badge badge-purple">${escapeHtml(q.questionNum)}</span>
                            <span style="font-size: 12px; color: var(--text-light);">${escapeHtml(q.paper)}</span>
                        </div>
                        <h3 style="font-size: 16px; line-height: 1.4; margin-bottom: 8px;">${escapeHtml(q.title.split('|')[0].split(':')[1] || q.title)}</h3>
                        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px;">${escapeHtml(q.metaDescription.slice(0, 120))}...</p>
                    </div>
                    <a href="/solutions/${q.slug}" class="nav-btn" style="text-align: center; display: block; width: 100%;">
                        Watch Video &amp; Solution &rarr;
                    </a>
                </div>
            `).join('')}
        </div>
    </div>

    <!-- Core Pure 2 -->
    <div id="core-pure-2" style="margin-bottom: 48px;">
        <h2>
            <span class="badge badge-pink" style="font-size: 15px; padding: 6px 14px;">Edexcel May 2025 CP2</span>
            Core Pure Mathematics 2 (9FM0/02)
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; margin-top: 16px;">
            ${cp2Questions.map(q => `
                <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 22px; box-shadow: var(--card-shadow); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <span class="badge badge-pink">${escapeHtml(q.questionNum)}</span>
                            <span style="font-size: 12px; color: var(--text-light);">${escapeHtml(q.paper)}</span>
                        </div>
                        <h3 style="font-size: 16px; line-height: 1.4; margin-bottom: 8px;">${escapeHtml(q.title.split('|')[0].split(':')[1] || q.title)}</h3>
                        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px;">${escapeHtml(q.metaDescription.slice(0, 120))}...</p>
                    </div>
                    <a href="/solutions/${q.slug}" class="nav-btn" style="text-align: center; display: block; width: 100%;">
                        Watch Video &amp; Solution &rarr;
                    </a>
                </div>
            `).join('')}
        </div>
    </div>
</main>
`;

solutionsIndexHtml += getFooter();
fs.writeFileSync(path.join(solutionsDir, 'index.html'), solutionsIndexHtml, 'utf8');
console.log('Saved /solutions/index.html');

// ----------------------------------------------------
// GENERATOR 4: Topics Directory Index (/topics/index.html)
// ----------------------------------------------------
console.log('Generating Master Topics Directory (/topics/index.html)...');

let topicsIndexHtml = getHead(
    "A-Level Further Mathematics Topic Guides & Syllabus Hub",
    "In-depth guides for A-Level Further Maths: Matrices, Complex Numbers, Differential Equations, Hyperbolic Functions, and Polar Coordinates for Edexcel and CIE.",
    "/topics",
    {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "A-Level Further Mathematics Topic Guides | GradeMotion",
        "url": "https://www.grademotion.com/topics"
    }
);

topicsIndexHtml += `
<div class="breadcrumbs-bar">
    <nav aria-label="Breadcrumb">
        <ol class="breadcrumbs">
            <li><a href="/">Home</a></li>
            <li class="sep">/</li>
            <li class="current">Topic Guides</li>
        </ol>
    </nav>
</div>

<main class="main-content">
    <div class="badge-row">
        <span class="badge badge-purple">GradeMotion Syllabus Hub</span>
        <span class="badge badge-zinc">Edexcel 9FM0 &bull; CIE 9231</span>
        <span class="badge badge-pink">Evergreen Architecture</span>
    </div>

    <h1>A-Level Further Mathematics Topic Guides</h1>
    <p style="font-size: 16.5px; max-width: 820px; margin-bottom: 32px;">
        Deep-dive conceptual masteries, essential formula sheets, examiner mark-scheme pitfalls, and real past exam question walkthroughs.
    </p>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px;">
        ${topics.map(t => {
            const count = questions.filter(q => q.topicSlug === t.slug).length;
            return `
            <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 26px; box-shadow: var(--card-shadow); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                        <span class="badge badge-purple">${escapeHtml(t.subject)}</span>
                        <span class="badge badge-zinc">${count} Walkthroughs</span>
                    </div>
                    <h3 style="font-size: 18px; color: var(--purple-deep); margin-bottom: 10px;">${escapeHtml(t.title)}</h3>
                    <p style="font-size: 14px; color: var(--text-muted); line-height: 1.55; margin-bottom: 16px;">${escapeHtml(t.description)}</p>
                </div>
                <a href="/topics/${t.slug}" class="nav-btn" style="text-align: center; display: block; width: 100%;">
                    Open Topic Guide &rarr;
                </a>
            </div>
            `;
        }).join('')}
    </div>
</main>
`;

topicsIndexHtml += getFooter();
fs.writeFileSync(path.join(topicsDir, 'index.html'), topicsIndexHtml, 'utf8');
console.log('Saved /topics/index.html');

// ----------------------------------------------------
// GENERATOR 5: Google-Compliant Video Sitemap (sitemap.xml)
// ----------------------------------------------------
console.log('Generating dynamic sitemap.xml...');

const today = new Date().toISOString().split('T')[0];

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <!-- Core Static Pages -->
  <url>
    <loc>https://www.grademotion.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.grademotion.com/schedule</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.grademotion.com/solutions</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.grademotion.com/topics</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.grademotion.com/tutor</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- International Tutoring Hubs (Geo-Targeted) -->
${(fs.existsSync(path.join(__dirname, 'data', 'locations.json')) ? JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'locations.json'), 'utf8')) : []).map(l => `  <url>
    <loc>https://www.grademotion.com/tutor/${l.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`).join('\n')}

  <!-- Evergreen Topic Hubs -->
${topics.map(t => `  <url>
    <loc>https://www.grademotion.com/topics/${t.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`).join('\n')}

  <!-- Past Paper Solution Pages with Rich Video Sitemap Tags -->
${questions.map(q => `  <url>
    <loc>https://www.grademotion.com/solutions/${q.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <video:video>
      <video:thumbnail_loc>https://i.ytimg.com/vi/${q.id}/hqdefault.jpg</video:thumbnail_loc>
      <video:title>${escapeXml(q.title)}</video:title>
      <video:description>${escapeXml(q.metaDescription)}</video:description>
      <video:player_loc>https://www.youtube-nocookie.com/embed/${q.id}</video:player_loc>
      <video:publication_date>2025-05-20T00:00:00Z</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>`).join('\n')}
</urlset>
`;

function escapeXml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml, 'utf8');
console.log('sitemap.xml generated successfully with full video sitemap metadata!');
