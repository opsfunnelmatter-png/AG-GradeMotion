import os
import json

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
transcripts_dir = os.path.join(base_dir, 'data', 'transcripts')
data_dir = os.path.join(base_dir, 'data')
os.makedirs(data_dir, exist_ok=True)

# 1. Evergreen Topics
topics = [
    {
        "slug": "matrices-and-linear-transformations",
        "title": "3x3 Matrices, Determinants, Inverses & Transformations",
        "subject": "Further Pure Mathematics",
        "syllabusCodes": {
            "edexcel": "Core Pure 1 & 2 (Sections 1 & 3)",
            "cie": "Paper 1 Further Pure 1 (Matrices & Transformations)"
        },
        "description": "Master 3x3 matrix multiplication, determinants, singular matrix conditions, inverse matrix calculation using minors, cofactors, and adjugate, as well as 2D/3D geometric transformations and systems of linear planes.",
        "coreConcepts": [
            {
                "name": "Singular vs Non-Singular Matrices",
                "latex": "\\det(M) = 0 \\iff M \\text{ is singular (no inverse exists)}",
                "explanation": "A matrix is singular if its determinant equals zero. Geometrically, this means the transformation collapses 3D space into a plane, line, or point."
            },
            {
                "name": "Inverse of a 3x3 Matrix",
                "latex": "M^{-1} = \\frac{1}{\\det(M)} \\text{adj}(M) = \\frac{1}{\\det(M)} C^T",
                "explanation": "Calculated by finding the matrix of minors, applying alternating signs for cofactors $C$, transposing to find the adjugate matrix, and scaling by $\\frac{1}{\\det(M)}$."
            },
            {
                "name": "Systems of Linear Equations (Sheaf of Planes)",
                "latex": "\\det(A) = 0 \\text{ with consistent equations } \\implies \\text{infinite solutions (line of intersection / sheaf)}",
                "explanation": "When the determinant of coefficients is zero, planes either have no common points (inconsistent, triangular prism) or intersect along a single line (sheaf of planes)."
            },
            {
                "name": "Mathematical Induction for Matrices",
                "latex": "M^n = \\dots \\implies \\text{Prove } n=1, \\text{ assume } n=k, \\text{ prove } n=k+1 \\text{ via } M^{k+1} = M^k M",
                "explanation": "Standard 4-step proof by induction demonstrating validity for all positive integers $n \\in \\mathbb{Z}^+$."
            }
        ],
        "examinerTraps": [
            "Forgetting to transpose the matrix of cofactors when computing the adjugate matrix.",
            "Sign errors when computing cofactors: the alternating sign checkerboard $[+ - +; - + -; + - +]$ is the #1 lost mark in CP1.",
            "Confusing 'consistent equations' with having a unique solution. A system can be consistent with infinitely many solutions if planes form a sheaf."
        ],
        "recommendedPackage": {
            "name": "Topic Surgery Sprint (8 Hours)",
            "usd": 760,
            "myr": 1440,
            "urlUsd": "/pay/usd/topic-surgery",
            "urlMyr": "/pay/my/topic-surgery"
        }
    },
    {
        "slug": "complex-numbers-loci-and-roots",
        "title": "Complex Numbers: Argand Loci, Cubic Roots & De Moivre's Proofs",
        "subject": "Further Pure Mathematics",
        "syllabusCodes": {
            "edexcel": "Core Pure 1 & 2 (Sections 2 & 1)",
            "cie": "Paper 1 Further Pure 1 (Complex Numbers)"
        },
        "description": "Comprehensive guide to complex numbers in A-Level Further Maths: Euler's formula, modulus-argument arithmetic, loci in the Argand plane (circles, half-lines, angle boundaries), and complex conjugate root theorems for polynomials.",
        "coreConcepts": [
            {
                "name": "Purely Imaginary Proof",
                "latex": "w \\in i\\mathbb{R} \\iff \\text{Re}(w) = 0 \\iff w + w^* = 0",
                "explanation": "A complex number is strictly imaginary if and only if its real component vanishes, or $w$ equals the negative of its complex conjugate."
            },
            {
                "name": "Argand Loci: Circles and Half-Lines",
                "latex": "|z - z_0| = r \\text{ (Circle)}, \\quad \\arg(z - z_0) = \\theta \\text{ (Half-line radiating from } z_0)",
                "explanation": "Remember that the initial point $z_0$ is open/excluded in half-line loci, and angle bounds represent sectors in the complex plane."
            },
            {
                "name": "Conjugate Root Theorem",
                "latex": "P(z) = 0 \\text{ with real coefficients } \\implies \\text{roots appear in conjugate pairs } (\\alpha \\pm i\\beta)",
                "explanation": "If a polynomial with real coefficients has $a + bi$ as a root, $a - bi$ must also be a root, allowing quadratic factors $(z - \\alpha)^2 + \\beta^2$ to be factored out."
            }
        ],
        "examinerTraps": [
            "Drawing full lines instead of half-lines/rays for $\\arg(z - z_0) = \\theta$. The endpoint $z_0$ must be an open circle.",
            "Argument convention errors: $\\arg(z)$ must always lie within the principal range $(-\\pi, \\pi]$.",
            "Failing to multiply by complex conjugates when rationalizing denominators."
        ],
        "recommendedPackage": {
            "name": "Topic Surgery Sprint (8 Hours)",
            "usd": 760,
            "myr": 1440,
            "urlUsd": "/pay/usd/topic-surgery",
            "urlMyr": "/pay/my/topic-surgery"
        }
    },
    {
        "slug": "differential-equations",
        "title": "First & Second Order Differential Equations & Physical Modelling",
        "subject": "Further Pure Mathematics",
        "syllabusCodes": {
            "edexcel": "Core Pure 1 (Sections 7 & 8)",
            "cie": "Paper 2 Further Pure 2 (Differential Equations)"
        },
        "description": "Master analytical methods for solving 1st order differential equations using integrating factors, and 2nd order linear non-homogeneous differential equations using auxiliary equations, complementary functions, and particular integrals.",
        "coreConcepts": [
            {
                "name": "Integrating Factor Method (1st Order)",
                "latex": "\\frac{dy}{dx} + P(x)y = Q(x) \\implies I(x) = e^{\\int P(x)\\,dx}",
                "explanation": "Multiply through by $I(x)$ to express the LHS as $\\frac{d}{dx}[y I(x)]$, followed by direct integration."
            },
            {
                "name": "Second Order Auxiliary Equation",
                "latex": "a\\frac{d^2y}{dx^2} + b\\frac{dy}{dx} + cy = f(x) \\implies am^2 + bm + c = 0",
                "explanation": "Roots determine Complementary Function ($y_{CF}$): distinct real roots ($Ae^{m_1 x} + Be^{m_2 x}$), repeated roots ($(A + Bx)e^{mx}$), or complex roots ($e^{px}[A\\cos(qx) + B\\sin(qx)]$). General Solution is $y = y_{CF} + y_{PI}$."
            },
            {
                "name": "Particular Integral Trials",
                "latex": "f(x) = k e^{\\lambda x} \\implies y_{PI} = C e^{\\lambda x} \\quad (\\text{or } C x e^{\\lambda x} \\text{ if } \\lambda \\text{ is a root of auxiliary})",
                "explanation": "Carefully choose trial functions that avoid duplicating terms in the complementary function."
            }
        ],
        "examinerTraps": [
            "Applying initial boundary conditions to the Complementary Function before finding the Particular Integral.",
            "Algebraic slip in differentiating particular integrals with product rule.",
            "Forgetting absolute values in $\\int \\frac{1}{x} dx = \\ln|x|$ which affects sign in real-world modelling constraints."
        ],
        "recommendedPackage": {
            "name": "Exam Readiness Sprint (16 Hours)",
            "usd": 1360,
            "myr": 2560,
            "urlUsd": "/pay/usd/exam-readiness",
            "urlMyr": "/pay/my/exam-readiness"
        }
    },
    {
        "slug": "hyperbolic-functions-and-calculus",
        "title": "Hyperbolic Functions, Maclaurin Series & Inverse Trigonometry",
        "subject": "Further Pure Mathematics",
        "syllabusCodes": {
            "edexcel": "Core Pure 1 & 2 (Sections 4 & 8)",
            "cie": "Paper 2 Further Pure 2 (Hyperbolic Functions)"
        },
        "description": "Comprehensive breakdown of hyperbolic functions $(\\sinh, \\cosh, \\tanh)$, logarithmic forms of inverse hyperbolics, Maclaurin and Taylor expansions, and derivatives of inverse trigonometric functions.",
        "coreConcepts": [
            {
                "name": "Definitions & Identities",
                "latex": "\\cosh x = \\frac{e^x + e^{-x}}{2}, \\quad \\sinh x = \\frac{e^x - e^{-x}}{2}, \\quad \\cosh^2 x - \\sinh^2 x = 1",
                "explanation": "Osborn's Rule states that standard trig identities convert to hyperbolic identities with the sign reversed when two sines multiply (e.g. $\\sin^2 \\to -\\sinh^2$)."
            },
            {
                "name": "Inverse Trigonometric & Hyperbolic Derivatives",
                "latex": "\\frac{d}{dx}(\\arcsin x) = \\frac{1}{\\sqrt{1-x^2}}, \\quad \\frac{d}{dx}(\\text{arsinh } x) = \\frac{1}{\\sqrt{x^2+1}}",
                "explanation": "Derived using implicit differentiation and standard Pythagorean identities."
            },
            {
                "name": "Maclaurin Series Expansion",
                "latex": "f(x) = f(0) + f'(0)x + \\frac{f''(0)}{2!}x^2 + \\frac{f'''(0)}{3!}x^3 + \\dots",
                "explanation": "Expansion of smooth functions around $x=0$. Often combined with Leibniz's theorem for $n$-th derivatives."
            }
        ],
        "examinerTraps": [
            "Confusing trig identities with hyperbolic identities: forgetting the sign flip in $\\cosh(2x) = \\cosh^2 x + \\sinh^2 x$.",
            "Not stating the range of validity for Maclaurin series.",
            "Missing the $\\pm$ distinction in $\\text{arcosh } x = \\ln(x + \\sqrt{x^2-1})$ for $x \\ge 1$."
        ],
        "recommendedPackage": {
            "name": "Topic Surgery Sprint (8 Hours)",
            "usd": 760,
            "myr": 1440,
            "urlUsd": "/pay/usd/topic-surgery",
            "urlMyr": "/pay/my/topic-surgery"
        }
    },
    {
        "slug": "polar-coordinates-and-area",
        "title": "Polar Coordinates: Curves, Tangents & Area Integration",
        "subject": "Further Pure Mathematics",
        "syllabusCodes": {
            "edexcel": "Core Pure 2 (Section 5)",
            "cie": "Paper 1 Further Pure 1 (Polar Coordinates)"
        },
        "description": "Understand polar curve sketching ($r = f(\\theta)$ like cardioids, limaçons, and lemniscates), vertical and horizontal tangents via Cartesian conversion $(x = r\\cos\\theta, y = r\\sin\\theta)$, and polar bounded area calculation.",
        "coreConcepts": [
            {
                "name": "Cartesian Conversion & Tangents",
                "latex": "x = r\\cos\\theta, \\quad y = r\\sin\\theta \\implies \\frac{dx}{d\\theta} = 0 \\text{ (Vertical Tangent)}, \\quad \\frac{dy}{d\\theta} = 0 \\text{ (Horizontal Tangent)}",
                "explanation": "Tangents parallel to the initial line have $\\frac{dy}{d\\theta} = 0$, while tangents perpendicular to the initial line have $\\frac{dx}{d\\theta} = 0$."
            },
            {
                "name": "Polar Area Integration",
                "latex": "\\text{Area} = \\frac{1}{2}\\int_{\\alpha}^{\\beta} r^2 \\, d\\theta",
                "explanation": "Always identify symmetry lines to simplify integration limits, and check for negative $r$ bounds."
            }
        ],
        "examinerTraps": [
            "Forgetting the factor of $\\frac{1}{2}$ in the polar area formula $\\frac{1}{2} \\int r^2 d\\theta$.",
            "Incorrect limits of integration when curves pass through the pole ($r=0$).",
            "Failing to differentiate using the product rule on $x = r\\cos\\theta$ and $y = r\\sin\\theta$."
        ],
        "recommendedPackage": {
            "name": "Topic Surgery Sprint (8 Hours)",
            "usd": 760,
            "myr": 1440,
            "urlUsd": "/pay/usd/topic-surgery",
            "urlMyr": "/pay/my/topic-surgery"
        }
    },
    {
        "slug": "series-proof-and-integration",
        "title": "Summation of Series, Method of Differences & Vectors in 3D",
        "subject": "Further Pure Mathematics",
        "syllabusCodes": {
            "edexcel": "Core Pure 1 & 2 (Sections 2, 4 & 6)",
            "cie": "Paper 1 Further Pure 1 (Series & Vectors)"
        },
        "description": "Techniques for evaluating finite series using standard summation formulas $\\sum r, \\sum r^2, \\sum r^3$ and method of differences (telescoping series), alongside 3D vectors (skew lines, planes, dot & cross products) and polynomial root relations.",
        "coreConcepts": [
            {
                "name": "Method of Differences",
                "latex": "\\sum_{r=1}^n [f(r) - f(r+1)] = f(1) - f(n+1)",
                "explanation": "Terms cancel telescopically leaving only the boundary terms from the beginning and end."
            },
            {
                "name": "Vieta's Formulas for Polynomial Roots",
                "latex": "\\sum \\alpha = -\\frac{b}{a}, \\quad \\sum \\alpha\\beta = \\frac{c}{a}, \\quad \\sum \\alpha\\beta\\gamma = -\\frac{d}{a}, \\quad \\alpha\\beta\\gamma\\delta = \\frac{e}{a}",
                "explanation": "Relations between the coefficients of a polynomial equation and sums/products of its roots."
            },
            {
                "name": "3D Vectors: Planes & Lines",
                "latex": "\\mathbf{r} = \\mathbf{a} + \\lambda \\mathbf{b}, \\quad \\mathbf{r} \\cdot \\mathbf{n} = d",
                "explanation": "Scalar product form of a plane $\\mathbf{r}\\cdot\\mathbf{n}=d$ reveals the normal vector immediately for distance and angle calculations."
            }
        ],
        "examinerTraps": [
            "Leaving uncancelled terms in telescopic series, especially when fractions have shifts like $f(r) - f(r+2)$.",
            "Sign alternation in Vieta's formulas: $-, +, -, +$.",
            "Vector distance formula: misidentifying normal vector magnitude."
        ],
        "recommendedPackage": {
            "name": "Topic Surgery Sprint (8 Hours)",
            "usd": 760,
            "myr": 1440,
            "urlUsd": "/pay/usd/topic-surgery",
            "urlMyr": "/pay/my/topic-surgery"
        }
    }
]

# 2. Map all 22 videos to questions with rich metadata
questions = [
    # --- CP1 ---
    {
        "id": "2La5fjgOZfw",
        "slug": "edexcel-cp1-may-2025-q1-matrices-singular-inverse",
        "board": "Edexcel",
        "paper": "Core Pure 1 (CP1)",
        "paperCode": "9FM0/01",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q1",
        "topicSlug": "matrices-and-linear-transformations",
        "title": "Edexcel Further Maths May 2025 CP1 Q1: Matrices (Singular & Inverse Matrix)",
        "metaDescription": "Step-by-step worked solution for Edexcel Further Maths CP1 May 2025 Q1. Learn how to find when a 3x3 matrix is singular and calculate the matrix inverse with Tutor Sheefa.",
        "archetype": "The 3x3 Invertibility & Determinant Archetype",
        "keyFormulas": [
            "\\det(M) = 0 \\iff M \\text{ is singular}",
            "M^{-1} = \\frac{1}{\\det(M)} \\text{adj}(M)"
        ],
        "examinerTraps": [
            "Careless arithmetic when calculating 2x2 determinants in the matrix of minors.",
            "Forgetting the alternating cofactor sign grid $[+ - +; - + -; + - +]$.",
            "Failing to check that $a < 0$ as specified in Part (b)."
        ],
        "solutionSteps": [
            {
                "heading": "Part (a): Singular Condition $\\det(M) = 0$",
                "math": "\\det(M) = a(a^2 - 1) - (-2)(-2a - 4) + 1(2 - 2a) = 0",
                "explanation": "A matrix is singular when its determinant vanishes. Expand along the top row, collect terms into a polynomial in $a$, and factorize to find the critical values of $a$."
            },
            {
                "heading": "Part (b): Inverse Matrix $M^{-1}$",
                "math": "M^{-1} = -\\frac{1}{108} C^T",
                "explanation": "Substitute the negative value of $a$ determined by $\\det(M) = -108$. Compute the matrix of cofactors, transpose to get the adjugate, and multiply by $-1/108$."
            }
        ]
    },
    {
        "id": "uiFGdDFbvIg",
        "slug": "edexcel-cp1-may-2025-q2-hyperbolic-functions-exact-values",
        "board": "Edexcel",
        "paper": "Core Pure 1 (CP1)",
        "paperCode": "9FM0/01",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q2",
        "topicSlug": "hyperbolic-functions-and-calculus",
        "title": "Edexcel Further Maths May 2025 CP1 Q2: Hyperbolic Functions (Exact Values)",
        "metaDescription": "Worked solution for Edexcel Further Maths CP1 May 2025 Question 2 on hyperbolic functions. Tutor Sheefa explains exact value calculations using exponential definitions.",
        "archetype": "Exponential Conversion for Hyperbolics",
        "keyFormulas": [
            "\\cosh x = \\frac{e^x + e^{-x}}{2}",
            "\\sinh x = \\frac{e^x - e^{-x}}{2}"
        ],
        "examinerTraps": [
            "Writing decimal approximations instead of exact surd/logarithmic forms.",
            "Incorrect quadratic substitution for $u = e^x$."
        ],
        "solutionSteps": [
            {
                "heading": "Converting to Exponential Form",
                "math": "2\\sinh x + 3\\cosh x = k \\implies (e^x - e^{-x}) + \\frac{3}{2}(e^x + e^{-x}) = k",
                "explanation": "Rewrite in terms of $e^x$, multiply through by $e^x$, and solve the resulting quadratic in $u = e^x$."
            }
        ]
    },
    {
        "id": "INF0JSk88dc",
        "slug": "edexcel-cp1-may-2025-q3-complex-numbers-purely-imaginary-proof",
        "board": "Edexcel",
        "paper": "Core Pure 1 (CP1)",
        "paperCode": "9FM0/01",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q3",
        "topicSlug": "complex-numbers-loci-and-roots",
        "title": "Edexcel Further Maths May 2025 CP1 Q3: Complex Numbers (Purely Imaginary Proof)",
        "metaDescription": "Edexcel CP1 May 2025 Question 3 full walkthrough: proving an expression is purely imaginary using complex conjugates and algebraic substitution.",
        "archetype": "The Purely Imaginary Conjugate Identity",
        "keyFormulas": [
            "w \\in i\\mathbb{R} \\iff w + w^* = 0 \\iff \\text{Re}(w) = 0",
            "z = x + iy \\implies z z^* = |z|^2 = x^2 + y^2"
        ],
        "examinerTraps": [
            "Assuming $z$ is real instead of expressing $z = x + iy$.",
            "Sign errors during conjugate expansion $(a + ib)(a - ib) = a^2 + b^2$."
        ],
        "solutionSteps": [
            {
                "heading": "Algebraic Substitution and Conjugate Multiplication",
                "math": "w = \\frac{z - 1}{z + 1} \\implies w + w^* = \\frac{z - 1}{z + 1} + \\frac{z^* - 1}{z^* + 1} = \\frac{2(|z|^2 - 1)}{|z + 1|^2}",
                "explanation": "If $|z| = 1$, the numerator becomes $2(1 - 1) = 0$, proving that $\\text{Re}(w) = 0$ and therefore $w$ is purely imaginary."
            }
        ]
    },
    {
        "id": "zO7g4UAC--o",
        "slug": "edexcel-cp1-may-2025-q4-second-order-differential-equations",
        "board": "Edexcel",
        "paper": "Core Pure 1 (CP1)",
        "paperCode": "9FM0/01",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q4",
        "topicSlug": "differential-equations",
        "title": "Edexcel Further Maths May 2025 CP1 Q4: Second Order Differential Equations",
        "metaDescription": "Edexcel Further Maths May 2025 CP1 Question 4 worked solution. Learn how to solve non-homogeneous 2nd order differential equations with Tutor Sheefa.",
        "archetype": "Non-Homogeneous 2nd Order ODE with Trigonometric Forcing",
        "keyFormulas": [
            "am^2 + bm + c = 0 \\implies y_{CF}",
            "y = y_{CF} + y_{PI}"
        ],
        "examinerTraps": [
            "Applying initial conditions before adding the Particular Integral to the Complementary Function.",
            "Arithmetic error during equating coefficients for the trial function $y_{PI} = \\lambda \\cos(\\omega x) + \\mu \\sin(\\omega x)$."
        ],
        "solutionSteps": [
            {
                "heading": "Step 1: Complementary Function",
                "math": "m^2 + 4m + 5 = 0 \\implies m = -2 \\pm i \\implies y_{CF} = e^{-2x}(A\\cos x + B\\sin x)",
                "explanation": "Solve the auxiliary quadratic with complex roots."
            },
            {
                "heading": "Step 2: Particular Integral & General Solution",
                "math": "y_{PI} = C\\cos(2x) + D\\sin(2x) \\implies y = y_{CF} + y_{PI}",
                "explanation": "Differentiate twice, equate coefficients, and assemble the full general solution."
            }
        ]
    },
    {
        "id": "6ZNaOB4TucA",
        "slug": "edexcel-cp1-may-2025-q5-method-of-differences-summation-proof",
        "board": "Edexcel",
        "paper": "Core Pure 1 (CP1)",
        "paperCode": "9FM0/01",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q5",
        "topicSlug": "series-proof-and-integration",
        "title": "Edexcel Further Maths May 2025 CP1 Q5: Method of Differences (Summation Proof)",
        "metaDescription": "May 2025 CP1 Q5 step-by-step solution: Method of Differences summation proof. Watch Tutor Sheefa show how to telescope terms and secure full marks.",
        "archetype": "Telescoping Series via Partial Fractions",
        "keyFormulas": [
            "\\sum_{r=1}^n [f(r) - f(r+1)] = f(1) - f(n+1)",
            "\\frac{1}{r(r+1)} = \\frac{1}{r} - \\frac{1}{r+1}"
        ],
        "examinerTraps": [
            "Writing '...' without displaying enough initial and final terms to clearly demonstrate the cancellation pattern.",
            "Algebraic errors when combining surviving fractions into a single simplified expression."
        ],
        "solutionSteps": [
            {
                "heading": "Displaying Telescoping Pattern",
                "math": "\\sum_{r=1}^n \\left( \\frac{1}{r} - \\frac{1}{r+2} \\right) = \\left(1 - \\frac{1}{3}\\right) + \\left(\\frac{1}{2} - \\frac{1}{4}\\right) + \\dots + \\left(\\frac{1}{n-1} - \\frac{1}{n+1}\\right) + \\left(\\frac{1}{n} - \\frac{1}{n+2}\\right)",
                "explanation": "Clearly show the two initial uncancelled terms and two final uncancelled terms."
            }
        ]
    },
    {
        "id": "1ZsITmrhHIw",
        "slug": "edexcel-cp1-may-2025-q6-complex-numbers-cubic-roots-argand",
        "board": "Edexcel",
        "paper": "Core Pure 1 (CP1)",
        "paperCode": "9FM0/01",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q6",
        "topicSlug": "complex-numbers-loci-and-roots",
        "title": "Edexcel Further Maths May 2025 CP1 Q6: Complex Numbers (Cubic Roots & Argand Diagrams)",
        "metaDescription": "Edexcel CP1 May 2025 Question 6 worked solution on cubic roots of polynomials with complex conjugates and Argand plane plotting.",
        "archetype": "Cubic Polynomial with Conjugate Pair",
        "keyFormulas": [
            "\\alpha + \\beta + \\gamma = -\\frac{b}{a}",
            "z = r(\\cos\\theta + i\\sin\\theta) = r e^{i\\theta}"
        ],
        "examinerTraps": [
            "Plotting Argand diagrams without scales or forgetting to label axes as $\\text{Re}$ and $\\text{Im}$.",
            "Assuming roots are purely real."
        ],
        "solutionSteps": [
            {
                "heading": "Finding the Third Root and Sketching",
                "math": "z_1 = p + iq, \\quad z_2 = p - iq \\implies z_1 + z_2 + z_3 = -b/a \\implies z_3 \\in \\mathbb{R}",
                "explanation": "Use sum of roots to find the real root without tedious polynomial long division."
            }
        ]
    },
    {
        "id": "O_AN-GuxrYs",
        "slug": "edexcel-cp1-may-2025-q7a-partial-fractions-improper",
        "board": "Edexcel",
        "paper": "Core Pure 1 (CP1)",
        "paperCode": "9FM0/01",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q7a",
        "topicSlug": "series-proof-and-integration",
        "title": "Edexcel Further Maths May 2025 CP1 Q7(a): Partial Fractions (Improper Fractions)",
        "metaDescription": "Edexcel CP1 May 2025 Q7(a) solution. How to handle improper rational expressions with algebraic division before partial fractions.",
        "archetype": "Improper Rational Algebraic Division",
        "keyFormulas": [
            "\\frac{P(x)}{Q(x)} = Q_0(x) + \\frac{R(x)}{Q(x)} \\quad (\\text{deg } P \\ge \\text{deg } Q)"
        ],
        "examinerTraps": [
            "Forgetting to divide polynomials when degree of numerator $\\ge$ degree of denominator.",
            "Missing linear quotient terms."
        ],
        "solutionSteps": [
            {
                "heading": "Polynomial Long Division",
                "math": "\\frac{x^3 + 2x^2 + 1}{x^2 - 1} = (x + 2) + \\frac{x + 3}{x^2 - 1}",
                "explanation": "Divide until the remainder has lower degree than the denominator, then apply partial fractions."
            }
        ]
    },
    {
        "id": "tfTDvCVdSnk",
        "slug": "edexcel-cp1-may-2025-q7b-definite-integration-natural-logs",
        "board": "Edexcel",
        "paper": "Core Pure 1 (CP1)",
        "paperCode": "9FM0/01",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q7b",
        "topicSlug": "series-proof-and-integration",
        "title": "Edexcel Further Maths May 2025 CP1 Q7(b): Definite Integration & Natural Logs",
        "metaDescription": "Edexcel CP1 May 2025 Q7(b) solution: Definite integration leading to exact natural logarithms. Step-by-step walkthrough by Tutor Sheefa.",
        "archetype": "Definite Integration with Log Laws",
        "keyFormulas": [
            "\\int \\frac{1}{x - a} dx = \\ln|x - a|",
            "\\ln A - \\ln B = \\ln(A/B)"
        ],
        "examinerTraps": [
            "Forgetting absolute value brackets in logarithms, causing issues when substituting negative values.",
            "Not simplifying into the exact required form $\\ln(p/q) + k$."
        ],
        "solutionSteps": [
            {
                "heading": "Integration and Limit Substitution",
                "math": "\\int_2^4 \\left( A + \\frac{B}{x-1} + \\frac{C}{x+1} \\right) dx = [Ax + B\\ln(x-1) + C\\ln(x+1)]_2^4",
                "explanation": "Integrate term-by-term and apply logarithmic laws to write the answer in single exact log form."
            }
        ]
    },
    {
        "id": "DU4p24nh3pY",
        "slug": "edexcel-cp1-may-2025-q8-differential-equations-integrating-factor-modelling",
        "board": "Edexcel",
        "paper": "Core Pure 1 (CP1)",
        "paperCode": "9FM0/01",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q8",
        "topicSlug": "differential-equations",
        "title": "Edexcel Further Maths May 2025 CP1 Q8: Differential Equations (Modelling & Integrating Factor)",
        "metaDescription": "Edexcel CP1 May 2025 Question 8 worked solution: First order linear differential equations with integrating factor and physical rate modelling.",
        "archetype": "1st Order Differential Equation Modelling",
        "keyFormulas": [
            "\\frac{dy}{dt} + P(t)y = Q(t)",
            "I(t) = e^{\\int P(t) dt}"
        ],
        "examinerTraps": [
            "Incorrect signs in the rate equation (Rate of change = Inflow - Outflow).",
            "Integrating factor errors: forgetting to divide by the leading coefficient before reading $P(t)$."
        ],
        "solutionSteps": [
            {
                "heading": "Formulating the Rate Equation",
                "math": "\\frac{dx}{dt} + \\frac{x}{50 + t} = k \\implies I(t) = e^{\\int \\frac{1}{50+t} dt} = 50 + t",
                "explanation": "Standard tank mixing problem where volume changes linearly with time."
            }
        ]
    },
    {
        "id": "y9_rkSUzQto",
        "slug": "edexcel-cp1-may-2025-q9-hyperbolic-functions-integration",
        "board": "Edexcel",
        "paper": "Core Pure 1 (CP1)",
        "paperCode": "9FM0/01",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q9",
        "topicSlug": "hyperbolic-functions-and-calculus",
        "title": "Edexcel Further Maths May 2025 CP1 Q9: Hyperbolic Functions & Integration",
        "metaDescription": "Full walkthrough of Edexcel CP1 May 2025 Question 9 on integrating powers of hyperbolic functions and hyperbolic substitutions by Tutor Sheefa.",
        "archetype": "Hyperbolic Trigonometric Substitution",
        "keyFormulas": [
            "\\cosh^2 x - \\sinh^2 x = 1",
            "\\int \\sinh^2 x \\, dx = \\int \\frac{\\cosh(2x) - 1}{2} dx"
        ],
        "examinerTraps": [
            "Using $\\cos^2 + \\sin^2 = 1$ formulas instead of hyperbolic double angle formulas.",
            "Neglecting the constant of integration in indefinite integrals."
        ],
        "solutionSteps": [
            {
                "heading": "Hyperbolic Double Angle Identity",
                "math": "\\cosh(2x) = 2\\sinh^2 x + 1 \\implies \\sinh^2 x = \\frac{\\cosh(2x) - 1}{2}",
                "explanation": "Substitute the identity into the integral and integrate each term directly."
            }
        ]
    },
    {
        "id": "lCgUg77yqis",
        "slug": "edexcel-cp1-may-2025-q10-volumes-of-revolution-trig",
        "board": "Edexcel",
        "paper": "Core Pure 1 (CP1)",
        "paperCode": "9FM0/01",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q10",
        "topicSlug": "series-proof-and-integration",
        "title": "Edexcel Further Maths May 2025 CP1 Q10: Volumes of Revolution (Trigonometric Identities)",
        "metaDescription": "Edexcel CP1 May 2025 Question 10 worked solution: Calculating exact volumes of revolution rotated $2\\pi$ radians around the x-axis using trigonometric identities.",
        "archetype": "Volume of Revolution around Coordinate Axes",
        "keyFormulas": [
            "V = \\pi \\int_a^b y^2 \\, dx",
            "V = \\pi \\int_c^d x^2 \\, dy"
        ],
        "examinerTraps": [
            "Forgetting the factor of $\\pi$ outside the integral.",
            "Squaring errors: forgetting to expand $(a + b\\cos x)^2 = a^2 + 2ab\\cos x + b^2\\cos^2 x$."
        ],
        "solutionSteps": [
            {
                "heading": "Setting up the Integral with $\\pi$",
                "math": "V = \\pi \\int_0^{\\pi/2} (\\sin x + \\cos x)^2 dx = \\pi \\int_0^{\\pi/2} (1 + \\sin(2x)) dx",
                "explanation": "Expand the squared expression, simplify using $\\sin^2 x + \\cos^2 x = 1$ and $2\\sin x \\cos x = \\sin(2x)$, then evaluate."
            }
        ]
    },

    # --- CP2 ---
    {
        "id": "1smjwIDMQXU",
        "slug": "edexcel-cp2-may-2025-q1-complex-numbers-modulus-argument",
        "board": "Edexcel",
        "paper": "Core Pure 2 (CP2)",
        "paperCode": "9FM0/02",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q1",
        "topicSlug": "complex-numbers-loci-and-roots",
        "title": "Edexcel Further Maths May 2025 CP2 Q1: Complex Numbers (Modulus & Argument Properties)",
        "metaDescription": "Edexcel CP2 May 2025 Question 1 worked solution: Modulus and argument properties of complex numbers explained step-by-step by Tutor Sheefa.",
        "archetype": "Modulus-Argument Rules for Products & Quotients",
        "keyFormulas": [
            "|z_1 z_2| = |z_1||z_2|, \\quad \\left|\\frac{z_1}{z_2}\\right| = \\frac{|z_1|}{|z_2|}",
            "\\arg(z_1 z_2) = \\arg(z_1) + \\arg(z_2), \\quad \\arg\\left(\\frac{z_1}{z_2}\\right) = \\arg(z_1) - \\arg(z_2)"
        ],
        "examinerTraps": [
            "Forgetting to adjust argument values back into the principal interval $(-\\pi, \\pi]$ by adding or subtracting $2\\pi$."
        ],
        "solutionSteps": [
            {
                "heading": "Applying Argument Subtraction",
                "math": "\\arg(w) = \\arg(z_1) - \\arg(z_2) = \\frac{3\\pi}{4} - \\left(-\\frac{\\pi}{3}\\right) = \\frac{13\\pi}{12} \\implies \\frac{13\\pi}{12} - 2\\pi = -\\frac{11\\pi}{12}",
                "explanation": "Notice the argument exceeds $\\pi$, so subtract $2\\pi$ to return to the principal range."
            }
        ]
    },
    {
        "id": "g6cUklAUg7Q",
        "slug": "edexcel-cp2-may-2025-q2-vectors-lines-planes",
        "board": "Edexcel",
        "paper": "Core Pure 2 (CP2)",
        "paperCode": "9FM0/02",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q2",
        "topicSlug": "series-proof-and-integration",
        "title": "Edexcel Further Maths May 2025 CP2 Q2: 3D Vectors (Lines and Planes)",
        "metaDescription": "Edexcel CP2 May 2025 Question 2 worked solution: Lines and planes in 3D, intersections, and shortest distance calculations with Tutor Sheefa.",
        "archetype": "Line-Plane Intersection & Angle",
        "keyFormulas": [
            "\\mathbf{r} = \\mathbf{a} + \\lambda\\mathbf{b}",
            "\\mathbf{r} \\cdot \\mathbf{n} = d \\implies \\sin\\theta = \\frac{|\\mathbf{b} \\cdot \\mathbf{n}|}{|\\mathbf{b}||\\mathbf{n}|}"
        ],
        "examinerTraps": [
            "Using $\\cos\\theta$ instead of $\\sin\\theta$ for the angle between a line and a plane (since $\\mathbf{n}$ is perpendicular to the plane)."
        ],
        "solutionSteps": [
            {
                "heading": "Substituting Line into Plane Equation",
                "math": "(\\mathbf{a} + \\lambda\\mathbf{b}) \\cdot \\mathbf{n} = d \\implies \\lambda = \\frac{d - \\mathbf{a}\\cdot\\mathbf{n}}{\\mathbf{b}\\cdot\\mathbf{n}}",
                "explanation": "Solve for parameter $\\lambda$ to locate the point of intersection."
            }
        ]
    },
    {
        "id": "X5zWDanSgIY",
        "slug": "edexcel-cp2-may-2025-q3a-mathematical-induction-matrices",
        "board": "Edexcel",
        "paper": "Core Pure 2 (CP2)",
        "paperCode": "9FM0/02",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q3a",
        "topicSlug": "matrices-and-linear-transformations",
        "title": "Edexcel Further Maths May 2025 CP2 Q3(a): Mathematical Induction (Matrix Powers)",
        "metaDescription": "Edexcel CP2 May 2025 Q3(a) proof by mathematical induction for matrix powers $M^n$. Full step-by-step deduction by Tutor Sheefa.",
        "archetype": "Matrix Proof by Mathematical Induction",
        "keyFormulas": [
            "M^{k+1} = M^k M \\quad (\\text{or } M M^k)"
        ],
        "examinerTraps": [
            "Omitting the formal concluding induction statement: 'True for $n=1$, if true for $n=k$ then true for $n=k+1$, hence true for all $n \\in \\mathbb{Z}^+$ by induction.'",
            "Matrix multiplication order slip (matrix multiplication is non-commutative in general)."
        ],
        "solutionSteps": [
            {
                "heading": "Inductive Step $M^{k+1} = M^k M$",
                "math": "M^{k+1} = \\begin{pmatrix} 2^k & 0 \\\\ k2^{k-1} & 2^k \\end{pmatrix} \\begin{pmatrix} 2 & 0 \\\\ 1 & 2 \\end{pmatrix} = \\begin{pmatrix} 2^{k+1} & 0 \\\\ (k+1)2^k & 2^{k+1} \\end{pmatrix}",
                "explanation": "Multiply the assumed $k$-th matrix by $M$ and factor out $2^k$ to prove the identity holds for $k+1$."
            }
        ]
    },
    {
        "id": "25BxITgZHI0",
        "slug": "edexcel-cp2-may-2025-q3bcd-matrix-transformations-combined",
        "board": "Edexcel",
        "paper": "Core Pure 2 (CP2)",
        "paperCode": "9FM0/02",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q3bcd",
        "topicSlug": "matrices-and-linear-transformations",
        "title": "Edexcel Further Maths May 2025 CP2 Q3(b-d): Matrix Transformations & Combined Geometry",
        "metaDescription": "Edexcel CP2 May 2025 Q3 parts b, c, d: Linear transformations in 2D, combined matrix multiplication order, and invariant lines/points.",
        "archetype": "Combined 2D Geometric Transformations & Invariants",
        "keyFormulas": [
            "T = BA \\text{ (Transformation } A \\text{ followed by } B)",
            "\\det(T) = \\text{Area scale factor of transformation}"
        ],
        "examinerTraps": [
            "Multiplying transformation matrices in the wrong order: doing $A$ followed by $B$ requires $BA$, not $AB$."
        ],
        "solutionSteps": [
            {
                "heading": "Computing the Composite Transformation Matrix",
                "math": "T = M_2 M_1 \\implies \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} x' \\\\ y' \\end{pmatrix}",
                "explanation": "Remember transformations apply from right to left on coordinate vectors."
            }
        ]
    },
    {
        "id": "LeTeo4ppaxU",
        "slug": "edexcel-cp2-may-2025-q4-complex-numbers-argand-loci",
        "board": "Edexcel",
        "paper": "Core Pure 2 (CP2)",
        "paperCode": "9FM0/02",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q4",
        "topicSlug": "complex-numbers-loci-and-roots",
        "title": "Edexcel Further Maths May 2025 CP2 Q4: Complex Numbers (Equations & Argand Loci)",
        "metaDescription": "Edexcel CP2 May 2025 Question 4 worked solution: Argand loci equations, intersecting geometric regions, and minimum distance calculations.",
        "archetype": "Argand Locus Intersection & Distance Bounds",
        "keyFormulas": [
            "|z - z_1| = |z - z_2| \\text{ (Perpendicular Bisector)}",
            "|z - z_0| = r \\text{ (Circle with centre } z_0 \\text{ and radius } r)"
        ],
        "examinerTraps": [
            "Not shading the correct inequality region in the Argand diagram.",
            "Calculating minimum distance without drawing the perpendicular line from the origin to the locus."
        ],
        "solutionSteps": [
            {
                "heading": "Geometric Interpretation of the Locus",
                "math": "|z - (3 + 4i)| = 2 \\implies \\text{Circle centered at } (3, 4) \\text{ with radius } 2",
                "explanation": "Distance from origin to centre is $\\sqrt{3^2 + 4^2} = 5$. Maximum $|z| = 5 + 2 = 7$, minimum $|z| = 5 - 2 = 3$."
            }
        ]
    },
    {
        "id": "uvgfNhLMbJ0",
        "slug": "edexcel-cp2-may-2025-q5-simultaneous-equations-planes-sheaf",
        "board": "Edexcel",
        "paper": "Core Pure 2 (CP2)",
        "paperCode": "9FM0/02",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q5",
        "topicSlug": "matrices-and-linear-transformations",
        "title": "Edexcel Further Maths May 2025 CP2 Q5: Simultaneous Equations (Planes & Sheaf)",
        "metaDescription": "Edexcel CP2 May 2025 Question 5 worked solution: Solving systems of 3 planes, determinant conditions for consistency, and identifying a sheaf of planes.",
        "archetype": "Geometric Configuration of 3 Planes",
        "keyFormulas": [
            "\\det(A) = 0 \\implies \\text{No unique solution}",
            "\\text{Consistent equations with } \\det(A) = 0 \\implies \\text{Planes form a sheaf (intersect in a line)}"
        ],
        "examinerTraps": [
            "Calling planes 'sheaf' without checking consistency. If inconsistent, the planes form a triangular prism!"
        ],
        "solutionSteps": [
            {
                "heading": "Testing Consistency via Elimination",
                "math": "E_3 = k_1 E_1 + k_2 E_2 \\implies \\text{Consistent } \\implies \\text{Infinite solutions along line of intersection}",
                "explanation": "Perform Gaussian elimination to verify the third equation is a linear combination of the first two."
            }
        ]
    },
    {
        "id": "RmpPp80YdSg",
        "slug": "edexcel-cp2-may-2025-q6-roots-of-polynomials-quartic",
        "board": "Edexcel",
        "paper": "Core Pure 2 (CP2)",
        "paperCode": "9FM0/02",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q6",
        "topicSlug": "series-proof-and-integration",
        "title": "Edexcel Further Maths May 2025 CP2 Q6: Roots of Polynomials (Quartic Equations)",
        "metaDescription": "Edexcel CP2 May 2025 Question 6 worked solution: Roots of quartic equations, Vieta's formulas, and polynomial transformations with Tutor Sheefa.",
        "archetype": "Quartic Polynomial Root Relationships",
        "keyFormulas": [
            "\\sum \\alpha = -\\frac{b}{a}, \\quad \\sum \\alpha\\beta = \\frac{c}{a}, \\quad \\sum \\alpha\\beta\\gamma = -\\frac{d}{a}, \\quad \\alpha\\beta\\gamma\\delta = \\frac{e}{a}",
            "\\sum \\alpha^2 = (\\sum\\alpha)^2 - 2\\sum\\alpha\\beta"
        ],
        "examinerTraps": [
            "Sign flips in alternating Vieta sums.",
            "Algebraic expansion slips when calculating $\\sum \\alpha^2$ and $\\sum \\alpha^3$."
        ],
        "solutionSteps": [
            {
                "heading": "Expanding Sum of Squares Formula",
                "math": "\\sum \\alpha^2 = (\\alpha+\\beta+\\gamma+\\delta)^2 - 2(\\sum \\alpha\\beta)",
                "explanation": "Substitute the coefficients directly to find the exact sum of squared roots."
            }
        ]
    },
    {
        "id": "r6RBCZ6TRG0",
        "slug": "edexcel-cp2-may-2025-q7a-polar-coordinates-vertical-tangents",
        "board": "Edexcel",
        "paper": "Core Pure 2 (CP2)",
        "paperCode": "9FM0/02",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q7a",
        "topicSlug": "polar-coordinates-and-area",
        "title": "Edexcel Further Maths May 2025 CP2 Q7(a): Polar Coordinates (Vertical Tangents)",
        "metaDescription": "Edexcel CP2 May 2025 Q7(a) solution: Finding vertical tangents perpendicular to the initial line on a polar curve $r = f(\\theta)$.",
        "archetype": "Vertical Tangent Condition $\\frac{dx}{d\\theta} = 0$",
        "keyFormulas": [
            "x = r\\cos\\theta = f(\\theta)\\cos\\theta",
            "\\text{Vertical Tangents occur when } \\frac{dx}{d\\theta} = 0"
        ],
        "examinerTraps": [
            "Setting $\\frac{dr}{d\\theta} = 0$ instead of $\\frac{dx}{d\\theta} = 0$. $\\frac{dr}{d\\theta}=0$ gives maximum distance from the pole, not vertical tangents!",
            "Forgetting to check that $\\frac{dy}{d\\theta} \\neq 0$ at the stationary point."
        ],
        "solutionSteps": [
            {
                "heading": "Differentiating $x = r\\cos\\theta$",
                "math": "x = (a(1 + \\cos\\theta))\\cos\\theta = a(\\cos\\theta + \\cos^2\\theta) \\implies \\frac{dx}{d\\theta} = a(-\\sin\\theta - 2\\cos\\theta\\sin\\theta) = 0",
                "explanation": "Factorize $-\\sin\\theta(1 + 2\\cos\\theta) = 0$, giving $\\theta = 0$ (rejected) or $\\cos\\theta = -1/2 \\implies \\theta = \\pm 2\\pi/3$."
            }
        ]
    },
    {
        "id": "llLqFVduG0A",
        "slug": "edexcel-cp2-may-2025-q7bc-polar-area-cosine-rule",
        "board": "Edexcel",
        "paper": "Core Pure 2 (CP2)",
        "paperCode": "9FM0/02",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q7bc",
        "topicSlug": "polar-coordinates-and-area",
        "title": "Edexcel Further Maths May 2025 CP2 Q7(b,c): Polar Area & Cosine Rule Applications",
        "metaDescription": "Edexcel CP2 May 2025 Q7(b,c) worked solution: Polar area integration and applying the cosine rule to find chord lengths across polar loops.",
        "archetype": "Polar Loop Area & Geometric Distance",
        "keyFormulas": [
            "\\text{Area} = \\frac{1}{2} \\int_\\alpha^\\beta r^2 \\, d\\theta",
            "c^2 = r_1^2 + r_2^2 - 2r_1 r_2 \\cos(\\theta_2 - \\theta_1)"
        ],
        "examinerTraps": [
            "Integrating across both loops without splitting symmetric halves.",
            "Forgetting the $\\frac{1}{2}$ pre-factor in polar integration."
        ],
        "solutionSteps": [
            {
                "heading": "Polar Area Integration",
                "math": "\\text{Area} = \\frac{1}{2} \\int_{-\\pi/3}^{\\pi/3} a^2(1 + 2\\cos\\theta)^2 d\\theta",
                "explanation": "Expand the integrand, use $\\cos^2\\theta = \\frac{1 + \\cos(2\\theta)}{2}$, and evaluate between symmetric limits."
            }
        ]
    },
    {
        "id": "mq08Fx6D0tM",
        "slug": "edexcel-cp2-may-2025-q8-maclaurin-series-hyperbolic-differentiation",
        "board": "Edexcel",
        "paper": "Core Pure 2 (CP2)",
        "paperCode": "9FM0/02",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q8",
        "topicSlug": "hyperbolic-functions-and-calculus",
        "title": "Edexcel Further Maths May 2025 CP2 Q8: Maclaurin Series & Hyperbolic Differentiation",
        "metaDescription": "Edexcel CP2 May 2025 Question 8 worked solution: Deriving Maclaurin series using successive differentiation of hyperbolic composite functions.",
        "archetype": "Successive Differentiation & Maclaurin Series",
        "keyFormulas": [
            "f(x) = f(0) + f'(0)x + \\frac{f''(0)}{2!}x^2 + \\frac{f'''(0)}{3!}x^3 + \\frac{f^{(4)}(0)}{4!}x^4",
            "\\frac{d}{dx}(\\cosh u) = \\sinh u \\frac{du}{dx}, \\quad \\frac{d}{dx}(\\sinh u) = \\cosh u \\frac{du}{dx}"
        ],
        "examinerTraps": [
            "Product rule slip during third and fourth derivatives.",
            "Evaluating derivatives at $x=0$: remember $\\sinh(0) = 0$ while $\\cosh(0) = 1$."
        ],
        "solutionSteps": [
            {
                "heading": "Successive Derivatives at $x=0$",
                "math": "f(0) = 1, \\quad f'(0) = 0, \\quad f''(0) = 2, \\quad f'''(0) = 0, \\quad f^{(4)}(0) = 8",
                "explanation": "Odd derivatives vanish due to $\\sinh(0) = 0$. Plug even derivatives into the Maclaurin formula."
            }
        ]
    },
    {
        "id": "fLSixCfxyj0",
        "slug": "edexcel-cp2-may-2025-q9-differentiation-inverse-sine",
        "board": "Edexcel",
        "paper": "Core Pure 2 (CP2)",
        "paperCode": "9FM0/02",
        "year": "2025",
        "series": "May/June",
        "questionNum": "Q9",
        "topicSlug": "hyperbolic-functions-and-calculus",
        "title": "Edexcel Further Maths May 2025 CP2 Q9: Differentiation of Inverse Sine Functions",
        "metaDescription": "Edexcel CP2 May 2025 Question 9 worked solution: Differentiating inverse trigonometric functions (arcsin) and Leibniz's theorem differential equations.",
        "archetype": "Implicit Differentiation of $\\arcsin(x)$ & Recurrence Equations",
        "keyFormulas": [
            "\\frac{d}{dx}(\\arcsin x) = \\frac{1}{\\sqrt{1 - x^2}}",
            "(1 - x^2)y'' - xy' - k^2 y = 0"
        ],
        "examinerTraps": [
            "Missing the inner chain rule derivative when differentiating composites like $\\arcsin(kx)$.",
            "Squaring both sides without checking signs."
        ],
        "solutionSteps": [
            {
                "heading": "First Derivative and Rearrangement",
                "math": "y = (\\arcsin x)^2 \\implies y' = 2(\\arcsin x)\\frac{1}{\\sqrt{1 - x^2}} \\implies \\sqrt{1 - x^2}y' = 2\\arcsin x",
                "explanation": "Square both sides to get $(1 - x^2)(y')^2 = 4y$, then differentiate again with respect to $x$ to form the differential equation."
            }
        ]
    }
]

# Attach transcript data to each question
for q in questions:
    tr_path = os.path.join(transcripts_dir, f"{q['id']}.json")
    if os.path.exists(tr_path):
        with open(tr_path, 'r', encoding='utf-8') as f:
            t_data = json.load(f)
            q['transcriptText'] = t_data.get('full_text', '')
            q['transcriptSnippetsCount'] = len(t_data.get('snippets', []))
    else:
        q['transcriptText'] = ''
        q['transcriptSnippetsCount'] = 0

# Save files
with open(os.path.join(data_dir, 'topics.json'), 'w', encoding='utf-8') as f:
    json.dump(topics, f, indent=2, ensure_ascii=False)
print(f"Saved {len(topics)} topics to data/topics.json")

with open(os.path.join(data_dir, 'questions.json'), 'w', encoding='utf-8') as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved {len(questions)} questions to data/questions.json")
