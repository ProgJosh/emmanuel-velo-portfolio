from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "emmanuel-josh-velo-resume.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

PAGE_W, PAGE_H = A4
FOREST = colors.HexColor("#123F33")
INK = colors.HexColor("#13251F")
ORANGE = colors.HexColor("#D9572B")
MUTED = colors.HexColor("#5D6864")
LINE = colors.HexColor("#D7D4CC")
PAPER = colors.HexColor("#FFFCF6")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Name", fontName="Helvetica-Bold", fontSize=24, leading=26, textColor=INK, spaceAfter=3))
styles.add(ParagraphStyle(name="Role", fontName="Helvetica", fontSize=9.4, leading=12, textColor=ORANGE, tracking=0.6, uppercase=True))
styles.add(ParagraphStyle(name="Contact", fontName="Helvetica", fontSize=7.6, leading=11, textColor=MUTED, alignment=TA_RIGHT))
styles.add(ParagraphStyle(name="Section", fontName="Helvetica-Bold", fontSize=9, leading=11, textColor=FOREST, spaceBefore=9, spaceAfter=6, uppercase=True, tracking=1.2))
styles.add(ParagraphStyle(name="Body", fontName="Helvetica", fontSize=8.4, leading=12.3, textColor=MUTED, spaceAfter=5))
styles.add(ParagraphStyle(name="EntryTitle", fontName="Helvetica-Bold", fontSize=9.5, leading=12, textColor=INK))
styles.add(ParagraphStyle(name="EntryMeta", fontName="Helvetica", fontSize=7.4, leading=10, textColor=ORANGE, spaceAfter=4))
styles.add(ParagraphStyle(name="ResumeBullet", fontName="Helvetica", fontSize=8, leading=11.5, textColor=MUTED, leftIndent=9, firstLineIndent=-8, bulletIndent=0, spaceAfter=2))
styles.add(ParagraphStyle(name="SkillHead", fontName="Helvetica-Bold", fontSize=7.4, leading=10, textColor=INK, spaceAfter=2))
styles.add(ParagraphStyle(name="SkillText", fontName="Helvetica", fontSize=7.4, leading=10.5, textColor=MUTED))
styles.add(ParagraphStyle(name="Footer", fontName="Helvetica", fontSize=6.8, leading=8, textColor=colors.HexColor("#73807B")))


def bullet(text: str) -> Paragraph:
    return Paragraph(f"- {text}", styles["ResumeBullet"])


def rule() -> Table:
    table = Table([[""]], colWidths=[174 * mm], rowHeights=[0.4 * mm])
    table.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), LINE)]))
    return table


def entry(title: str, meta: str, bullets: list[str]) -> KeepTogether:
    items = [Paragraph(title, styles["EntryTitle"]), Paragraph(meta, styles["EntryMeta"])]
    items.extend(bullet(item) for item in bullets)
    items.append(Spacer(1, 3 * mm))
    return KeepTogether(items)


def draw_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, 13 * mm, PAGE_W - 18 * mm, 13 * mm)
    canvas.setFont("Helvetica", 6.8)
    canvas.setFillColor(colors.HexColor("#73807B"))
    canvas.drawString(18 * mm, 8.5 * mm, "Emmanuel Josh Velo - Web Developer")
    canvas.drawRightString(PAGE_W - 18 * mm, 8.5 * mm, f"Page {doc.page}")
    canvas.restoreState()


doc = BaseDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    leftMargin=18 * mm,
    rightMargin=18 * mm,
    topMargin=16 * mm,
    bottomMargin=18 * mm,
    title="Resume - Emmanuel Josh Velo",
    author="Emmanuel Josh Velo",
    subject="Web Developer and Software Engineer resume",
)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
doc.addPageTemplates([PageTemplate(id="resume", frames=[frame], onPage=draw_page)])

contact = (
    '<link href="mailto:velojoshemmanuel30@gmail.com" color="#5D6864">velojoshemmanuel30@gmail.com</link><br/>'
    '<link href="https://github.com/ProgJosh" color="#5D6864">github.com/ProgJosh</link><br/>'
    '<link href="https://www.linkedin.com/in/emmanuel-josh-velo" color="#5D6864">linkedin.com/in/emmanuel-josh-velo</link><br/>'
    'Philippines'
)

header = Table(
    [[Paragraph("Emmanuel Josh Velo", styles["Name"]), Paragraph(contact, styles["Contact"])],
     [Paragraph("WEB DEVELOPER", styles["Role"]), ""]],
    colWidths=[108 * mm, 66 * mm],
)
header.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))

story = [header, Spacer(1, 5 * mm), rule()]
story += [
    Paragraph("Professional summary", styles["Section"]),
    Paragraph(
        "Information Technology graduate and freelance web developer who builds responsive websites, business systems, and cross-platform digital products. Hands-on work includes React and TypeScript interfaces, Laravel and PHP applications, MySQL data models, role-aware workflows, testing, and deployment preparation. Focused on clear user experience, maintainable code, and practical business requirements.",
        styles["Body"],
    ),
    Paragraph("Experience", styles["Section"]),
    entry(
        "Freelance Web Developer",
        "Self-employed / contract-based | 2024 - Present",
        [
            "Design and develop responsive websites and full-stack systems for defined business and user workflows.",
            "Built a Laravel property-management portal with tenant, landlord, and administrator roles, relational data, Livewire interactions, and configured payment integration.",
            "Handle requirements, interface planning, implementation, testing, deployment preparation, and client communication as a solo developer.",
            "Document demo limitations, integration boundaries, hosting requirements, and post-launch considerations clearly.",
        ],
    ),
    entry(
        "IT Capstone Developer",
        "Academic project - BS Information Technology | 2023 - 2024",
        [
            "Developed web-based systems using PHP, MySQL, HTML, CSS, and Bootstrap.",
            "Applied MVC structure, database design, CRUD workflows, system analysis, testing, and project documentation.",
            "Collaborated on implementation and presentation of a full-stack capstone system to faculty panels.",
        ],
    ),
    PageBreak(),
    Paragraph("Selected projects", styles["Section"]),
    entry(
        "NexaCart - E-commerce Marketplace and Administration",
        "React 19 / TypeScript / Vinext / Tailwind CSS / Recharts",
        [
            "Built connected storefront, search, product, cart, checkout, customer, inventory, order, promotion, and reporting workflows.",
            "Separated typed commerce rules behind a service boundary and covered critical behavior with automated tests.",
        ],
    ),
    entry(
        "BookSync - Booking and Appointment Management",
        "React 19 / TypeScript / Vite / Zod / Vitest / Playwright",
        [
            "Implemented admin, staff, and customer workflows with Manila timezone handling, conflict-aware scheduling, reports, and exports.",
            "Added local persistence safeguards, permission rules, responsive layouts, and browser workflow tests.",
        ],
    ),
    entry(
        "InvenTrack - Inventory Management System",
        "React / TypeScript / Vite / Tailwind CSS / Vitest",
        [
            "Created role-aware catalog, supplier, stock movement, low-stock, reporting, CSV export, and audit workflows.",
            "Centralized inventory mutations in a replaceable service layer with checks for duplicate SKUs and invalid stock movement.",
        ],
    ),
    entry(
        "Properties Management Portal",
        "Laravel 11 / PHP 8.2 / Livewire 3 / MySQL / Tailwind CSS / Stripe",
        [
            "Developed role-based property listings, search, gallery, booking, lease, administration, and payment workflows.",
            "Used Laravel MVC conventions and relational data modeling with documented environment and deployment configuration.",
        ],
    ),
    entry(
        "BakeSmart2D - Cross-platform 2D Application",
        "Phaser 3 / TypeScript / Vite / Electron / Capacitor / Android",
        [
            "Delivered one web game build through browser, Windows packaging, and an Android test wrapper with offline core gameplay.",
        ],
    ),
    Paragraph("Technical skills", styles["Section"]),
]

skills_data = [
    [Paragraph("Frontend", styles["SkillHead"]), Paragraph("HTML5, CSS3, JavaScript, TypeScript, React, Tailwind CSS, Bootstrap, responsive design", styles["SkillText"])],
    [Paragraph("Backend and data", styles["SkillHead"]), Paragraph("PHP, Laravel, Livewire, MySQL, application validation, REST/API integration, Stripe integration", styles["SkillText"])],
    [Paragraph("Testing and quality", styles["SkillHead"]), Paragraph("Vitest, Playwright, Testing Library, Node test runner, accessibility and responsive workflow checks", styles["SkillText"])],
    [Paragraph("Tools and delivery", styles["SkillHead"]), Paragraph("Git, GitHub, Vite, npm, Composer, Docker, Cloudflare Workers, Render, Electron, Capacitor", styles["SkillText"])],
]
skills = Table(skills_data, colWidths=[35 * mm, 139 * mm], repeatRows=0)
skills.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), 0.5, LINE), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 4), ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))
story += [skills, Paragraph("Education", styles["Section"]), entry(
    "Bachelor of Science in Information Technology",
    "Mary The Queen College of Pampanga, Inc. | 2020 - 2024",
    ["Coursework and project work covered web development, database management, system analysis, software engineering principles, networking fundamentals, and IT project management."],
)]

doc.build(story)
print(OUTPUT)
