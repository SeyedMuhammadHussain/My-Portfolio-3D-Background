# Portfolio: Seyed Mohammad Hossein Mousavi

Static site (HTML, CSS, vanilla JavaScript, Three.js from cdnjs). No build step.

## Structure
- `index.html` main page
- `css/style.css` all styles
- `js/main.js` content (`CONFIG` at the top), animations, 3D neural network scene
- `assets/images/profile.jpg` your photo

## Edit your content
Open `js/main.js` and edit the `CONFIG` object: intro, About text and facts, email, social links and projects.
Buttons with an empty URL show a reminder instead of opening a page. There is no contact form (it would need a backend).

## Deploy on GitHub Pages
1. Create a repository and upload the **contents** of this folder so `index.html` is at the repository root.
2. Go to Settings > Pages, choose "Deploy from a branch", select `main` and `/ (root)`, then Save.
3. Your site appears at `https://<username>.github.io/<repository>/` after a minute or two.

All paths are relative, so it works both at `<username>.github.io` and under a repository sub-path.
The page needs an internet connection for Google Fonts and Three.js (cdnjs).
