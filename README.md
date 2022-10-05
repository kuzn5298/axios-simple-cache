<div align="center">

<img src="./public/logo.svg" width="450px"/>

<br>

[![Npm package version](https://badgen.net/npm/v/axios-simple-cache)](https://www.npmjs.org/package/axios-simple-cache)
[![Install size](https://packagephobia.now.sh/badge?p=axios-simple-cache)](https://packagephobia.now.sh/result?p=axios-simple-cache)
[![npm downloads](https://img.shields.io/npm/dm/axios-simple-cache)](https://npm-stat.com/charts.html?package=axios-simple-cache)
[![GitHub issues](https://img.shields.io/github/issues/kuzn5298/axios-simple-cache.svg)](https://github.com/kuzn5298/axios-simple-cache/issues/)
[![Languages](https://img.shields.io/github/languages/top/kuzn5298/axios-simple-cache)](https://github.com/kuzn5298/axios-simple-cache/search?l=typescript)
[![CodeQL](https://github.com/kuzn5298/axios-simple-cache/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/kuzn5298/axios-simple-cache/actions/workflows/codeql-analysis.yml)

</div>

Axios Simple Cache is a small library for [axios](https://github.com/axios/axios).

## 📋 Table of Contents

-   [🚀 Install](#🚀-install)
-   [🪄 Usage](#🪄-usage)
-   [📕 Release History](#📕-release-history)
-   [📝 Roadmap](#📝-roadmap)
-   [⭐️ Maintainers](#⭐️-maintainers)
-   [🛠 Contributing](#🛠-contributings)
-   [📜 License](#📜-license)

## 🚀 Install

```sh
npm i axios-simple-cache

yarn add axios-simple-cache
```

## 🪄 Usage

**Cache for global instance**

```ts
import axios from 'axios';
import { setupAxiosCache } from 'axios-simple-cache';

setupAxiosCache(axios);
```

**Cache for custom instance**

```ts
import axios from 'axios';
import { setupAxiosCache } from 'axios-simple-cache';

const axiosInstance = axios.create();
setupAxiosCache(axiosInstance);
```

## 📕 Release History

-   0.1.0
    -   MVP (working version)

## 📝 Roadmap

-   [x] MVP (working version)
-   [ ] Add tests
-   [ ] Add examples
-   [ ] Add JSDoc
-   [ ] Add cache options

See the [open issues](https://github.com/kuzn5298/axios-simple-cache/issues) for a full list of proposed features (and known issues).

## ⭐️ Maintainers

[@kuzn5298](https://github.com/kuzn5298)

## 🛠 Contributing

Feel free to dive in! [Open an issue](https://github.com/kuzn5298/axios-simple-cache/issues/new) or submit PRs.

Standard Readme follows the [Contributor Covenant](https://www.contributor-covenant.org/version/1/4) Code of Conduct.

## 📜 License

[![GitHub license](https://img.shields.io/github/license/kuzn5298/axios-simple-cache)](https://github.com/kuzn5298/axios-simple-cache/blob/main/LICENSE)
