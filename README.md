# Charith Kalhara - Premium Cloud & DevOps Portfolio

A production-ready, premium-style personal portfolio website built using **HTML5, CSS3, and Vanilla JavaScript**.

This portfolio is designed with a clean black-and-white SaaS aesthetic inspired by modern product design principles and tailored for recruiters, internship applications, and graduate opportunities in Cloud/DevOps roles.

---

## Project Overview

This project highlights:

- Professional introduction and hero section
- Cloud and DevOps-oriented skill breakdown
- Certification showcase
- Featured cloud infrastructure projects
- Experience timeline
- GitHub API-powered dashboard with live repository data
- Education and contact sections
- Smooth animations and micro-interactions
- Responsive layout across desktop, tablet, and mobile

---

## Folder Structure

```text
portfolio/
│
├── index.html
├── css/
│   ├── style.css
│   ├── animations.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   ├── animations.js
│   └── particles.js
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── resume.pdf
│
└── README.md
```

---

## Features

- **Premium Hero Section** with typing subtitle and strong visual hierarchy
- **Subtle Animated Grid + Particles** background
- **Sticky navigation** with mobile menu support
- **Reveal-on-scroll animations** and smooth transitions
- **Interactive Skills section** with animated progress bars
- **Detailed project cards** for Cloud/DevOps work
- **Vertical experience timeline**
- **GitHub API-powered dashboard** with live repository stats and projects
- **Contact form UI** with client-side validation placeholder
- **Back-to-top button** and scroll progress indicator

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/CharithKalhara/portfolio.git
```

2. Navigate into the project folder:

```bash
cd portfolio
```

3. Serve the site locally or open it from a deployed host so the GitHub API can load correctly:

```bash
python -m http.server 8080
```

Then open: `http://localhost:8080`

---

## Customization

Update the following to personalize:

- `index.html`
  - Contact details (email, LinkedIn, location)
  - Project links and descriptions
  - Education and timeline content
- `assets/resume.pdf`
  - Replace with your latest CV/resume
- `css/style.css`
  - Theme tuning, spacing, typography, borders
- `js/*`
  - Animation intensity, particles count, interaction behavior

---

## Deployment

### GitHub Pages

1. Push your code to `main` branch.
2. Go to **Repository Settings → Pages**.
3. Under **Build and deployment**, set:
   - Source: `Deploy from a branch`
   - Branch: `main` / root
4. Save and wait for deployment.

Your site will be available at:
`https://charithkalhara.github.io/portfolio/`

### AWS S3 (Static Website Hosting)

1. Create an S3 bucket (globally unique name).
2. Disable block public access (if hosting publicly).
3. Upload all project files.
4. Enable **Static website hosting** in bucket properties.
5. Set `index.html` as the index document.
6. Add bucket policy to allow public `s3:GetObject`.

Optional: Use CloudFront + ACM for HTTPS and custom domain.

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages.
2. Create a new Pages project.
3. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/`
4. Deploy.

---

## Performance & Accessibility Notes

- Semantic HTML sections and headings
- Lightweight vanilla JavaScript only
- No framework overhead
- Smooth, non-distracting animations
- Responsive design with mobile-first adaptations
- Clean structure ready for future enhancements (analytics, form backend)

---

## License

This project can be used as a personal portfolio base and customized as needed.
