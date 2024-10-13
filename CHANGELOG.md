# [2.1.0](https://github.com/AllanOricil/nrg-cli/compare/v2.0.1...v2.1.0) (2024-10-13)


### Bug Fixes

* **deps:** bump @allanoricil/nrg-generator from 1.3.0 to 1.3.1 ([eddb093](https://github.com/AllanOricil/nrg-cli/commit/eddb0936d4ba46e8eb1f614674bf43483590ca0c))


### Features

* **deps:** builds will have html wrapped with text/html instead of text/x-red ([a51ebbc](https://github.com/AllanOricil/nrg-cli/commit/a51ebbca0c5d03ef08045ec3d4653edc609d3075))

## [2.0.1](https://github.com/AllanOricil/nrg-cli/compare/v2.0.0...v2.0.1) (2024-10-11)


### Bug Fixes

* **deps:** bump @allanoricil/nrg-core from 1.3.0 to 1.3.1 ([8cc125d](https://github.com/AllanOricil/nrg-cli/commit/8cc125d9dccb826ddd37bbccadcc8489eda60b64))

# [2.0.0](https://github.com/AllanOricil/nrg-cli/compare/v1.4.1...v2.0.0) (2024-10-06)


* feat!: renaming @allanoricil/node-red-node to @allanoricil/nrg-nodes ([770e739](https://github.com/AllanOricil/nrg-cli/commit/770e739f5ba433e49f13a5ca8fbb2e81daa71dc5))


### Features

* **deps:** bump @allanoricil/nrg-generator from 1.1.0 to 1.2.0 releasing the redesigned logo ([49c41bb](https://github.com/AllanOricil/nrg-cli/commit/49c41bbc8c61d5a726ac09d68bbad56fa5ae2697))


### BREAKING CHANGES

* all node imports using @allanoricil/node-red-node must be renamed
to @allanoricil/nrg-nodes

## [1.4.1](https://github.com/AllanOricil/nrg-cli/compare/v1.4.0...v1.4.1) (2024-10-05)


### Bug Fixes

* watch mode won't kill the process anymore when a rebuild fails ([932fe1e](https://github.com/AllanOricil/nrg-cli/commit/932fe1e644bee82aa634b9fb4a85e495c0eb8c69))

# [1.4.0](https://github.com/AllanOricil/nrg-cli/compare/v1.3.2...v1.4.0) (2024-10-04)


### Features

* cli version is passed to the generator at runtime ([3e8c2e0](https://github.com/AllanOricil/nrg-cli/commit/3e8c2e000669fe83cf31d4688f2423294708f4ff))

## [1.3.2](https://github.com/AllanOricil/nrg-cli/compare/v1.3.1...v1.3.2) (2024-10-03)


### Bug Fixes

* set version in sentry at runtime instead of build time ([540dd56](https://github.com/AllanOricil/nrg-cli/commit/540dd565851690f86db1e093500928f71a8b4787))

## [1.3.1](https://github.com/AllanOricil/nrg-cli/compare/v1.3.0...v1.3.1) (2024-10-03)


### Bug Fixes

* fix the name of the env variable that has to be changed at build time ([bb1da08](https://github.com/AllanOricil/nrg-cli/commit/bb1da080809da8f3b346dfffb2205d924608b1a4))

# [1.3.0](https://github.com/AllanOricil/nrg-cli/compare/v1.2.4...v1.3.0) (2024-10-03)


### Bug Fixes

* change node-machine-uid to machine-uuid ([edba54c](https://github.com/AllanOricil/nrg-cli/commit/edba54c88a91cc0198afb835fee2d69634559224))


### Features

* configure sentry for telemetry data ([8782e51](https://github.com/AllanOricil/nrg-cli/commit/8782e51f3bf10992f4cfe8c212ca835ac77c06c3))

## [1.2.4](https://github.com/AllanOricil/nrg-cli/compare/v1.2.3...v1.2.4) (2024-10-01)


### Bug Fixes

* **vulnerability:** kangax html-minifier REDoS vulnerability ([1378192](https://github.com/AllanOricil/nrg-cli/commit/13781925b63afc1f7c6362dce5bb33859d7dccf1))

## [1.2.3](https://github.com/AllanOricil/nrg-cli/compare/v1.2.2...v1.2.3) (2024-09-29)


### Bug Fixes

* basedir=/bin SyntaxError: missing ) after argument list ([6d9ed41](https://github.com/AllanOricil/nrg-cli/commit/6d9ed414bf4737952893bae1df90bda008e7c7ba))
* **deps:** add missing dependency pkg-dir@v8.0.0 for postinstall ([56851ae](https://github.com/AllanOricil/nrg-cli/commit/56851aeff05701c93bea7e3b9647281d45d6cdc0))

## [1.2.2](https://github.com/AllanOricil/nrg-cli/compare/v1.2.1...v1.2.2) (2024-09-29)


### Bug Fixes

* fix build on windows ([c96661f](https://github.com/AllanOricil/nrg-cli/commit/c96661f899af399e9b27b86684011a3c8c535634))

# [1.2.0](https://github.com/AllanOricil/nrg-cli/compare/v1.1.0...v1.2.0) (2024-09-28)


### Bug Fixes

* @allanoricil/nrg-generator/plopfile.js couldn't be found ([8e66094](https://github.com/AllanOricil/nrg-cli/commit/8e6609413f8691a42390e715b0b19d999d884a03))
* default --help flag is executed only after all commands have been set ([4338c3c](https://github.com/AllanOricil/nrg-cli/commit/4338c3ca6ee1b83543b0a1c27de2f64440ba32a7))
* error [ERR_REQUIRE_ESM]: require() of ES Module postinstall.cjs not supported ([df709a3](https://github.com/AllanOricil/nrg-cli/commit/df709a3d77ce266545c8b8727f049e034b265059))
* version flag ([eeefb37](https://github.com/AllanOricil/nrg-cli/commit/eeefb378f5557bab9f8450b296a97d9d63670354))
* version flag wont appear at the top anymore ([68214bd](https://github.com/AllanOricil/nrg-cli/commit/68214bd8373a5bc6abd1d022c34219da62c903af))


### Features

* add first iteration of create command ([bfc9e70](https://github.com/AllanOricil/nrg-cli/commit/bfc9e70cbbcb58e89804aecffe7b377841de7701))
* add post installation message ([4e8c7e4](https://github.com/AllanOricil/nrg-cli/commit/4e8c7e46a7bc0cbbe90bc5200fd45c49b5beddd5))
* display cli info when running nrg --version ([adb97cb](https://github.com/AllanOricil/nrg-cli/commit/adb97cb284ae53f76646fcc8c1c50e523a74b3ac))
* make create command options dynamic based on the subcomand ([bb25931](https://github.com/AllanOricil/nrg-cli/commit/bb259314af793b580191f365df91d402a46e2fe4))

# [1.1.0](https://github.com/AllanOricil/nrg-cli/compare/v1.0.1...v1.1.0) (2024-09-18)


### Features

* builder can now process id: for: and i18n: custom html attributes ([fa5117b](https://github.com/AllanOricil/nrg-cli/commit/fa5117b8d4f9f9d02c88c1919f47ab328c43417a))
