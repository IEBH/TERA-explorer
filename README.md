TERA-explorer
=============
Simple TERA project viewer and editor.

This project is intended as a simple proof-of-concept for the [@iebh/tera-fy](https://github.com/IEBH/TERA-fy) and [TERA](https://tera-tools.com) projects.

Its designed to be as simple as possible - opening a project in a raw JSON editor and allowing read-time edits to data which should replicate to any other instances subscribed to those data flows.

**Tech stack**
* [ViteJS](https://vitejs.dev) - Frontend framework
* [@iebh/tera-fy](https://github.com/IEBH/TERA-fy) - Data layer providing the active project entity to work with
* [json-editor-vue](https://github.com/cloydlau/json-editor-vue) - JSON editor UI


Running locally
---------------

1. Clone the Git Repo
```bash
git@github.com:IEBH/TERA-explorer.git
cd TERA-explorer
```

3. Install all NPM modules
```bash
npm ci
```


3. Run Vite in dev mode
```bash
npm start
```
