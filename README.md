# @vta/tsc

compile Typescript files to Javascript files using Typescript and Babel

![npm](https://img.shields.io/npm/v/@vta/tsc)
[![Build Status](https://travis-ci.com/vta-js/tsc.svg?branch=master)](https://travis-ci.com/vta-js/tsc)
[![codecov](https://codecov.io/gh/vta-js/tsc/branch/master/graph/badge.svg)](https://codecov.io/gh/vta-js/tsc)

### Install

```bash
npm install --save-dev @vta/tsc
// or using yarn
yarn add @vta/tsc --dev
```

## Usage

### using in cli

```json
{
  "scripts": {
    "build": "vta-tsc src --out-dir dist -p tsconfig.json -b babel.config.js"
  }
}
```

### using in js files

```javascript
const { default: tsc } = require("@vta/tsc");

tsc({
  sourceDir: "src",
  outDir: "dist",
  project: "tsconfig.json",
  babel: "babel.config.js",
  // ...options
}).then(err => {
  if (err) {
    console.log(`build error :${err.message}`);
    return;
  }
  console.log("build successfully");
});
```

## Options

```typescript
export interface TscOption {
  sourceDir?: string;
  outDir?: string;
  project?: string;
  babel?: string | false;
  esnext?: boolean;
  extTs?: string;
  extJs?: string;
  exclude?: string[];
  silent?: boolean;
  cwd?: string;
}
```

> all paths are relative to your working directory `cwd`

### sourceDir

the directory to compile files from. default is `src`

> when using cli,the first argument is sourceDir

### outDir,--out-dir

the directory to compile files to. default is `dist`

### project,--project,-p

typescript config file. default is `tsconfig.json`

### babel,--babel,-b,--no-babel

babel config file. default is `babel.config.js`

> if you donn't want to compile files using Babel,please set this to `false`, or using `--no-babel` in cli

### esnext,--no-exnext

compile Typescript files to `esnext` target. default is `true`

> this is important to compile using Babel,if not,please set this to `false` or using `--no-esnext` in cli

### extTs,--ext-ts

the extensions that compile using Typescript,split by `,`. default is `ts`

### extJs,--ext-js

the extensions that compile using Babel,split by `,`. default is `js`

### exclude,--exclude

the patterns of [glob](https://github.com/isaacs/node-glob) to exclude. split by `,` for cli usage;

### silent --silent

do not display any except error message. default is `false`

### cwd

working directory. default is `.`

### MIT License
