# Sanjeed Showkat — personal website

A responsive portfolio for software development, AI/ML research, and academia, with a midnight-blue theme, violet/cyan accents, and a light alternative. Built with HTML, CSS, and vanilla JavaScript. No framework, install step, database, or build required.

## Preview

Open `index.html` in a browser, or run `node server.js` and visit http://localhost:4173. A local server enables clipboard support in supported browsers. Optional web fonts load from Google Fonts; system fonts work offline.

## Replace the existing GitHub Pages website

1. Back up your current `webdev_portfolio` repository.
2. Copy `index.html`, `styles.css`, `motion.css`, `theme.css`, `script.js`, `.nojekyll`, and these assets to the repository root: `assets/favicon.svg`, `assets/portrait-cropped.png`, and `assets/Sanjeed-Showkat-CV.pdf`. These files replace the old homepage. `README.md` and `server.js` are optional; the server is for local preview only.
3. Commit and push to the branch used for Pages.
4. In the repository's **Settings → Pages**, choose **Deploy from a branch**, select your branch (usually `main`), and select **/ (root)**. Save.
5. Wait for the Pages deployment to finish, then visit https://sanj33d.github.io/webdev_portfolio/.

All internal resources use relative paths, so the website works both under `/webdev_portfolio/` and at a user-site root such as `sanj33d.github.io`.

## Edit your content

- `index.html`: biography, roles, project descriptions, research statuses, contact details, and certificate links. Content is in plain HTML and visible without JavaScript.
- `styles.css`: shared base styles and responsive layout.
- `theme.css`: the current visual design, typography, palettes, responsive refinements, and project illustrations. Colors are variables at the top; the dark palette is in `[data-theme=dark]`.
- `motion.css`: orbiting particles, connecting paths, portrait rings, scroll reveals, theme transitions, and responsive interactive bridge styles.
- `script.js`: theme and motion preferences, mobile navigation, copy email, section reveals, pointer response, and the interactive discipline connections.
- `assets/portrait-cropped.png`: your supplied 960 × 960 transparent crop, copied without modification. Used in the hero and biography.
- `assets/Sanjeed-Showkat-CV.pdf`: downloadable copy of your supplied CV. Replace this file when your CV changes.
- `assets/favicon.svg`: custom monogram favicon.

## Content notes

The supplied CV is the source for current roles and academic details. Degree conferral is pending; the October 2026 thesis is defended, and the manuscript is in preparation, not published. Medical VQA is a research proposal expected in 2027. The research chart is explicitly a conceptual illustration, not a result. Project and certificate links come from the CV or existing portfolio; project descriptions avoid invented performance metrics.

The downloadable CV is the original supplied document and contains phone numbers and reference contact details. Review that PDF before publishing if you prefer a version without those details. The webpage itself does not display reference contacts or your phone number.

Contact uses a real email link, with a clipboard shortcut. There is no backend contact form to configure. No tracking or analytics are included.

## Accessibility

Semantic sections, descriptive links, a skip link, visible keyboard focus, labeled navigation controls, announced clipboard feedback, native expandable research notes, and reduced-motion support. The dark theme is the default; a selected theme is remembered on that browser.

## Motion and interactions

The orbit and connecting paths express the relationship between industry, research, academia, and AI. Select any of the four discipline buttons to read its connection to your work. Animated project graphics, card tilt, pointer lighting, and a scroll progress indicator add feedback. Main illustration animations pause outside the viewport. Pointer response is limited to devices with a fine pointer. The pause control remembers your choice. The operating system's reduced-motion setting disables animation and immediately shows content. The site remains readable without JavaScript.

The previous generated portrait and its prompt remain in the local assets folder for reference; the current website uses your supplied cropped image. Only the three active assets listed above are needed for deployment.

## Verified project content

See `SOURCES.md` for the GitHub sources reviewed for this version. SmartTemu is featured for its MERN and AI integration. DevHire is explicitly labeled in development, and GreenMart is an early build. Bioinformatics is described as a shared course research project. The public LinkedIn page required sign-in, so no additional LinkedIn claims were added.

## Rollback

The previous site's commit is `30a5195`. After publication, use GitHub's commit history or `git revert` on the redesign commit to restore the previous homepage while preserving history. Avoid a force push.
