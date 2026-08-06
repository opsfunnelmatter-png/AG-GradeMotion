const fs = require('fs');
const path = require('path');

const SECTIONS = [
    "sections/01_hero.html",
    "sections/02_who_this_is_for.html",
    "sections/03_why_students_improve.html",
    "sections/05_vsl.html",
    "sections/03b_soft_cta_1.html",
    "sections/06_student_results_summary.html",
    "sections/07_how_it_works.html",
    "sections/08_framework.html",
    "sections/09_telegram_community.html",
    "sections/09b_telegram_lead_capture.html",
    "sections/10_pedagogy.html",
    "sections/11_subjects_and_curriculum.html",
    "sections/11b_soft_cta_3.html",
    "sections/12_case_studies.html",
    "sections/13_detailed_reviews.html",
    "sections/14_tutoring_details.html",
    "sections/15_pricing.html",
    "sections/16_faq.html",
    "sections/17_cta.html"
];

const templatePath = path.join(__dirname, 'index.template.html');
const indexPath = path.join(__dirname, 'index.html');

// 1. Ensure template file exists
if (!fs.existsSync(templatePath)) {
    console.log('Creating index.template.html from index.html...');
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Replace content of #content-mount with placeholder
    const startMountTag = '<div id="content-mount">';
    const endMountTag = '</div>';
    
    const startIndex = indexContent.indexOf(startMountTag);
    if (startIndex !== -1) {
        const afterStart = startIndex + startMountTag.length;
        const endIndex = indexContent.indexOf(endMountTag, afterStart);
        if (endIndex !== -1) {
            indexContent = indexContent.substring(0, afterStart) + '\n<!-- SECTIONS_PLACEHOLDER -->\n    ' + indexContent.substring(endIndex);
        }
    }
    fs.writeFileSync(templatePath, indexContent, 'utf8');
    console.log('index.template.html created successfully.');
}

// 2. Read template content
let templateContent = fs.readFileSync(templatePath, 'utf8');

// 3. Concatenate all sections
let combinedSections = '';
SECTIONS.forEach(sectionFile => {
    const sectionPath = path.join(__dirname, sectionFile);
    if (fs.existsSync(sectionPath)) {
        console.log(`Reading section: ${sectionFile}`);
        let sectionContent = fs.readFileSync(sectionPath, 'utf8');
        combinedSections += `\n<!-- SECTION START: ${sectionFile} -->\n${sectionContent}\n<!-- SECTION END: ${sectionFile} -->\n`;
    } else {
        console.warn(`WARNING: Section file not found: ${sectionFile}`);
    }
});

// 4. Insert into template
let resultHTML = templateContent.replace('<!-- SECTIONS_PLACEHOLDER -->', combinedSections);

// Inline style.min.css if exists to eliminate render-blocking
const minCSSPath = path.join(__dirname, 'css', 'style.min.css');
if (fs.existsSync(minCSSPath)) {
    console.log('Inlining style.min.css to eliminate render-blocking...');
    const minCSS = fs.readFileSync(minCSSPath, 'utf8');
    resultHTML = resultHTML.replace(
        '<link rel="stylesheet" href="css/style.min.css">',
        `<style>${minCSS}</style>`
    );
}

// 5. Save back to index.html
fs.writeFileSync(indexPath, resultHTML, 'utf8');
console.log('index.html assembled successfully with all sections and inlined CSS!');

// 6. Process thank-you.html
const thankYouTemplatePath = path.join(__dirname, 'thank-you.template.html');
const thankYouPath = path.join(__dirname, 'thank-you.html');

if (!fs.existsSync(thankYouTemplatePath) && fs.existsSync(thankYouPath)) {
    console.log('Creating thank-you.template.html from thank-you.html...');
    fs.copyFileSync(thankYouPath, thankYouTemplatePath);
}

if (fs.existsSync(thankYouTemplatePath)) {
    console.log('Processing thank-you.template.html...');
    let tyContent = fs.readFileSync(thankYouTemplatePath, 'utf8');
    if (fs.existsSync(minCSSPath)) {
        const minCSS = fs.readFileSync(minCSSPath, 'utf8');
        tyContent = tyContent.replace(
            '<link rel="stylesheet" href="css/style.min.css">',
            `<style>${minCSS}</style>`
        );
    }
    fs.writeFileSync(thankYouPath, tyContent, 'utf8');
    console.log('thank-you.html built successfully with inlined CSS!');
}
