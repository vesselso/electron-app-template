# ⚛️ Electron React Multi-Page App Template
---
**⚠️ NOTE**

Please use `yarn` instead of `npm` for development on this template. You may have to install `yarn` on your computer first. The build scripts can only be run with `yarn`.

---

An easy-to-use, multi-page, offline-ready architecture template for an Electron React app, packaged using Parcel (instead of Webpack). Examples of including assets (e.g. images) and child App components are included in the template.

## ❓ Problem

`create-react-app` is optimized for Single-Page Applications (SPA), and utilizes hidden SPA Webpack configurations, making developing Multi-Page Applications (MPA) in Electron difficult. Moreover, since React and other imported `node.js` components require building before deployment, an alternative to Webpack is needed to support module-based development.

## 💁‍♂️ Solution

`electron-app-template` adopts a straightforward structure for MPA development: all pages are put in separate folders in the `app` folder. Inside each folder, there are 5 items:

1. `asset` folder: Includes all static assets (images etc.)
2. `component` folder: Includes all React components, including `<App />`
3. `folderName.html`: The HTML document of the page
4. `script.js`: The JavaScript document linked to the HTML page
5. `style.css`: The CSS document linked to the HTML page

During the build process, ParcelJS is configured in `package.json` to treat each folder as a separate single-page application, and build them separately in the `build` folder. Afterwards, `electron-builder` references `app/main.js` and the `build` folder to build the final macOS and Windows Electron distros to the `dist` folder.

## 👷‍♂️ Usage
### 🔧 Development

To download all Node modules, run:

    yarn install

To start a development, hot-loaded version of the Electron app, run:

    yarn start
    
Read **📘 Guide: Adding a new Page** below for more information.
    
### 🔧 Full Builds

To build both macOS and Windows Electron distros, run:

    yarn build
    
For macOS or Windows only distro, run one:

    yarn build-mac
    yarn build-windows

The output of the distros will be in the `dist` folder.

### 🔧 Partial Builds

Partial builds are a fast way of debugging build problems without running a full Electron build.

To build only React pages with ParcelJS (without running `electron-builder`), run:

    yarn react-build
    
To build an Electron app with reference to the existing `build` folder, run one:

    yarn electron-build               //cross-platform
    yarn electron-build-mac           //macOS only
    yarn electron-build-windows       //Windows only

To build pages separately as Single-Page Applications using ParcelJS, run:

    yarn build-login
    yarn build-install
    yarn build-yourPageName

### 🔧 Cleaning the Build Environment

To remove `build`, `.cache`, and `dist` folders before starting any build, run:

    yarn clean-build

This command is automatically run first whenever you run `yarn build`, `yarn build-mac`, or `yarn build-windows`.

## 📘 Guide: Adding a new Page

1. **Create a new sub-folder in the `app` folder with the following structure:**

```
    app                               (already exists)
    |_newPage
      |_asset                         (folder)
      |_component                     (folder)
      |_newPage.html
      |_script.js
      |_style.css
```

**NOTE:** The `./` shorthand for referencing file paths should be used in all files, e.g. in `newPage.html`:

    <link rel="stylesheet" href="./style.css">
    <script src="./script.js"></script>

When including assets or components in JavaScript files, use `import` instead of direct linking with file path, e.g. in `script.js`:

    import internet from './asset/internet.png'
    import BigButton from './component/BigButton'

Then, in `ReactDOM.render()`:

    <img src={internet} style={{width: '400px'}}></img>
    <BigButton />

2. **In the root directory's `entry.html`, add this line to the `<body>`:**

    <a href="app/newPage/newPage.html"></a>

This is to ensure ParcelJS finds all SPAs inside the `app` folder, necessary when running a development version of Electron using `yarn start`.

3. **In `package.json`, add this line at the end:**

    "build-newPage": "parcel build app/newPage/newPage.html --out-dir build/newPage --public-url ./"

Then, in for the `react-build` script, add ` && yarn build-newPage` to the end, e.g.:

    "react-build": "yarn build-login && yarn build-install && yarn build-newPage"

4. **In `main.js`, when the new page needs to be linked, use the following format:**

    loginWindow.loadURL(isDev
        ? "http://localhost:3000/app/newPage/newPage.html"
        : `file://${path.join(__dirname, "../build/newPage/newPage.html")}`)
        
5. **Run `yarn start` and `yarn build` to see if there are any errors.**

## 🌟 Credits

This template is inspired and modified from [electron-react-parcel-boilerplate](https://github.com/kumarryogeshh/electron-react-parcel-boilerplate). Read more about it in [his Medium article](https://medium.com/@yogeshkumarr/production-ready-electron-app-using-react-and-parcel-web-bundler-74dcda63f148).
