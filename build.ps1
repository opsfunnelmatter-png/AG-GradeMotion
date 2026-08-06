$sections = @(
    "sections/01_hero.html",
    "sections/03_why_students_improve.html",
    "sections/05_vsl.html",
    "sections/06_student_results_summary.html",
    "sections/03b_soft_cta_1.html",
    "sections/08_framework.html",
    "sections/10_pedagogy.html",
    "sections/02_who_this_is_for.html",
    "sections/11b_soft_cta_3.html",
    "sections/12_case_studies.html",
    "sections/13b_hard_cta_4.html",
    "sections/14_tutoring_details.html",
    "sections/15_pricing.html",
    "sections/07_how_it_works.html",
    "sections/09_telegram_community.html",
    "sections/09b_telegram_lead_capture.html",
    "sections/16_faq.html",
    "sections/17_cta.html"
)

$templatePath = "index.template.html"
$indexPath = "index.html"

if (Test-Path $templatePath) {
    $templateContent = Get-Content -Path $templatePath -Raw -Encoding UTF8
    $combinedSections = ""

    foreach ($sec in $sections) {
        if (Test-Path $sec) {
            $secContent = Get-Content -Path $sec -Raw -Encoding UTF8
            $combinedSections += "`n<!-- SECTION START: $sec -->`n$secContent`n<!-- SECTION END: $sec -->`n"
        }
    }

    $resultHTML = $templateContent.Replace("<!-- SECTIONS_PLACEHOLDER -->", $combinedSections)
    
    $minCSSPath = "css/style.min.css"
    if (Test-Path $minCSSPath) {
        $minCSS = Get-Content -Path $minCSSPath -Raw -Encoding UTF8
        $resultHTML = $resultHTML.Replace('<link rel="stylesheet" href="css/style.min.css">', "<style>$minCSS</style>")
    }

    Set-Content -Path $indexPath -Value $resultHTML -Encoding UTF8
    Write-Host "grademotion-malaysia/index.html assembled successfully!"
}

$tyTemplatePath = "thank-you.template.html"
$tyPath = "thank-you.html"

if (Test-Path $tyTemplatePath) {
    $tyContent = Get-Content -Path $tyTemplatePath -Raw -Encoding UTF8
    $minCSSPath = "css/style.min.css"
    if (Test-Path $minCSSPath) {
        $minCSS = Get-Content -Path $minCSSPath -Raw -Encoding UTF8
        $tyContent = $tyContent.Replace('<link rel="stylesheet" href="css/style.min.css">', "<style>$minCSS</style>")
    }
    Set-Content -Path $tyPath -Value $tyContent -Encoding UTF8
    Write-Host "grademotion-malaysia/thank-you.html assembled successfully!"
}
