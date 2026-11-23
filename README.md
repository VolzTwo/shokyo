# Shōkyō Website

A static, bilingual (English / Indonesian) website for the Shōkyō Wplace alliance. Built with plain HTML, CSS, and JavaScript for GitHub Pages.

## Pages
- `index.html` — Home
- `about.html` — About Shōkyō
- `projects.html` — Project gallery
- `join.html` — Join the alliance

## Run locally
Open `index.html` in a browser, or use a local static server such as VS Code Live Server.

## Manage projects (no design-code editing required)
1. Open `js/projects.js` in GitHub.
2. Add or edit an object in the `projects` array.
3. Upload project images to `assets/projects/`.
4. Set the image path, for example `assets/projects/territory.png`.
5. Choose a status: `planned`, `ongoing`, or `completed`.
6. Set `featured: true` to show the project on the Home page.
7. Commit the change. GitHub Pages will publish the update after deployment.

Example:
```js
{
  id: "project-002",
  title: "New pixel artwork",
  description: {
    en: "A collaborative artwork on Wplace.",
    id: "Karya kolaboratif di Wplace."
  },
  image: "assets/projects/new-artwork.png",
  status: "ongoing",
  coordinates: "1200, 800",
  featured: true,
  link: ""
}
```

## Configure Discord invite
In `js/site.js`, replace `https://discord.com/` in the `discordInvite` constant with the permanent Shōkyō Discord invite URL.

## GitHub Pages deployment
1. Create a **public** GitHub repository named `shokyo-website` (or another name you prefer).
2. Upload the contents of this folder to the repository root (not the containing folder).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions**.
5. The included workflow `.github/workflows/pages.yml` will build and publish the site on every push to `main`.
6. Wait for the workflow to finish, then open the Pages URL shown in Settings → Pages.

If the default branch is not `main`, update the branch name in `.github/workflows/pages.yml`.

## Before launch
- Replace the Discord invite placeholder.
- Replace the sample project in `js/projects.js` with real project information.
- Add real project images to `assets/projects/`.
- Review the alliance description and principles.
- Test both languages, both themes, mobile navigation, and all links.
