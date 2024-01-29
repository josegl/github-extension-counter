# Github extension reporter

This is a little React application that navigates a given Github repository and lists the found file extensions and how many files of each extension the repository has.

## How to install and run

- `git clone https://github.com/josegl/github-extension-counter.git`
- `cd github-extension-counter`
- `npm i`
- `npm start`

## How to use this app.

Just copy any Github url and paste inside the input. The app automatically will navigate the repository and will output a list of extensions with a number that it is a counter for the given extension.

## How this application has been done.

This application has been developed using [react-create-app](https://create-react-app.dev).

## Repository structure

```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── assets
    │   ├── github-mark-white.svg
    │   ├── github-mark.svg
    │   └── logo.svg
    ├── components
    │   ├── GithubUrlInput
    │   │   ├── index.css
    │   │   └── index.js
    │   └── RepoInfo
    │       ├── hooks
    │       │   ├── useFetchMainBranchName.js
    │       │   └── useRepoExtensionCounter.js
    │       ├── index.css
    │       └── index.js
    ├── index.css
    ├── index.js
    ├── reportWebVitals.js
    └── setupTests.js
```

The actual code is inside the `src` directory.
