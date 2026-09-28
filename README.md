# Personal Business Website

A simple one-page website for an app developer who also builds business websites. It introduces you, shows your apps, lists your services, and gives people a way to email you.

The site is plain HTML, CSS, and JavaScript. There is no framework, no build step, and no database. You can open it on your computer, then later upload the same files to a free static host.

The six projects you see at first are examples. Replace them with your real apps before you share the site with anyone.

## Folder structure

```text
/
├── index.html          The page
├── css/
│   └── style.css       All styling, including colors
├── fonts/              The typeface used on the page
├── js/
│   └── script.js       Your name, email, projects, and social links
├── images/
│   ├── profile/        Your photo
│   ├── apps/           App icons and screenshots
│   └── general/        Site icon and link-preview image
└── README.md
```

Keep these folder names. The page looks for files at these paths.

## How to run it locally

Open `index.html` in Chrome, Firefox, Edge, or Safari. Double-click the file, or right-click it and choose Open with.

You can also start a small local server from this folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

Refresh the browser after you save a change.

## Where to add your profile image

1. Put your photo in `images/profile/`. A square JPG or PNG works best, around 600 by 600 pixels.
2. Open `js/script.js` and change `PROFILE_IMAGE`.

```javascript
const PROFILE_IMAGE = "images/profile/profile.jpg";
```

3. Change `PROFILE_ALT` to a short description. After you add a real photo, use something like `Profile photo of B Umamaheswara Rao`.

The page starts with `images/profile/profile-placeholder.svg`. You can delete that file after your real photo is in place. If the photo path is wrong, the page shows your initials instead of a broken image.

## Where to add app images

Put icons and screenshots in `images/apps/`. Then set the `image` path on that project in `js/script.js`.

- Use `imageType: "icon"` for a square app icon. This is the default if you leave `imageType` out.
- Use `imageType: "screenshot"` for a wide app image. It fills the top of the card.

```javascript
image: "images/apps/my-app.png",
imageType: "screenshot",
```

If an image file is missing, the card shows the first letter of the app name.

`images/general/favicon.svg` is the small icon in the browser tab and next to your name. Replace that file if you want a different mark.

`images/general/og-image.svg` is the placeholder used when someone shares the page. Many social sites prefer a PNG. To switch, add a file such as `images/general/og-image.png` and update the `og:image` line in `index.html`.

## How to update project information

Open `js/script.js` and edit the `projects` list. Each app is one object. Copy an object to add another app, and delete an object to remove one. Keep the commas between objects.

```javascript
{
  name: "My App",
  description: "Short description of what the app does.",
  image: "images/apps/my-app.png",
  imageType: "icon",
  technologies: ["Kotlin", "Android"],
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.example.app",
  detailsUrl: ""
}
```

- `playStoreUrl` shows a Google Play button. Leave it as `""` to hide the button.
- `detailsUrl` shows a Details button. Use a full `https://` link, or a file in this site such as `projects/my-app.html`. Leave it as `""` to hide the button.
- `technologies` is the list of small labels on the card.

Save the file and refresh the browser. The cards are built from this list, so you do not add each card by hand in `index.html`.

## How to change your name and page title

In `js/script.js`, change:

```javascript
const SITE_NAME = "B Umamaheswara Rao";
```

That updates the header, the footer, and the browser tab title: `B Umamaheswara Rao | App Developer & Business Website Developer`.

Also search `index.html` for `B Umamaheswara Rao` and replace it if you change your name later. Those copies are used for the page title and link preview before JavaScript runs. The same search will find the name in the header and footer.

`SITE_DESCRIPTION` in `js/script.js` is the short summary used for search results and link previews. Update the matching description in `index.html` as well.

## How to change the email address

In `js/script.js`, change:

```javascript
const CONTACT_EMAIL = "kittu.digital.appswork@gmail.com";
```

Use a normal address, such as `name@gmail.com`. Visitors send a message from the form on the page. The site does not open Thunderbird or any other mail app.

Also search `index.html` for `kittu.digital.appswork@gmail.com` and replace the form address, so the form still works if JavaScript is turned off.

The form is delivered by [FormSubmit](https://formsubmit.co/). The first message sends a one-time confirmation link to this inbox. Open that email and confirm the address. After that, new messages arrive as normal email. There is still no server in this project.

## How to change social links

In `js/script.js`, paste a full `https://` address. Leave a value as `""` and that link stays hidden.

```javascript
const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/your-profile",
  github: "https://github.com/your-username",
  googlePlay: "https://play.google.com/store/apps/dev?id=YOUR_ID"
};
```

The labels are LinkedIn, GitHub, and Google Play. They appear under the contact form only after you add a link.

## How to change colors

Open `css/style.css` and edit the `:root` block at the top. The rest of the file uses these names, so you should not need to hunt for color codes in the rest of the stylesheet.

| Variable | What it changes |
| --- | --- |
| `--primary-color` | Buttons, links, and the contact band |
| `--primary-color-hover` | Button color on hover |
| `--secondary-color` | Small highlight dots and check marks |
| `--background-color` | Page background |
| `--surface-color` | Cards and the header |
| `--text-color` | Main text |
| `--muted-text-color` | Supporting text |
| `--footer-background` | Footer |

If you change `--primary-color`, also change `theme-color` in `index.html` to the same color. That tints the mobile browser bar.

The placeholder icons in the `images` folder are separate files. Changing the CSS colors does not recolor those icons. Replace the image files when you add your own photo and app images.

## How to deploy on GitHub Pages

This folder is a static site. `index.html` is in the root, and CSS, JavaScript, fonts, and images use relative paths, so the same files work on GitHub Pages. There is no build step.

The empty `.nojekyll` file tells GitHub Pages to publish the files as they are, without running Jekyll.

After the real apps replace the sample projects:

1. Create a GitHub repository and push this folder to the `main` branch.
2. In the repository, open **Settings → Pages**.
3. Set the source to **Deploy from a branch**.
4. Choose the `main` branch and the `/ (root)` folder.
5. Save. The public address will look like `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

Other hosts also work if they serve this folder as-is: Netlify Drop, or Cloudflare Pages with an empty build command and the project root as the output folder.

Before you publish:

- Confirm `B Umamaheswara Rao` is the name you want to publish
- Confirm `kittu.digital.appswork@gmail.com` is the address you want to publish
- Replace the six sample projects with your real apps
- Add your profile photo
- Add social links only if you want them shown

After the site has a public address, you can add it in `index.html` as `og:url` if you want richer link previews:

```html
<meta property="og:url" content="https://your-domain.com/">
```
