# AIO-Bootstrap-4-Boilerplate
An All in One Bootstrap 4 Boilerplate packed with features! Currently using the Bootstrap 4 Beta 2 release, and built using Gulp 4; this boilerplate is ready for Sass, CoffeeScript, Gulp Google Web-Fonts, and BrowserSync.

_This is a early release, and will be updated over time. I will add more information to this_ README _as I continue!_

## How To Install
* Download/Clone directory, and open command prompt in directory.
* Run: `npm install`

## Usage
#### Commands
* `gulp clean`   - Deletes tmp & dist directories.
* `gulp serve`   - Starts Browsersync and watches for changes.
* `gulp dist`    - Optimizes sources, and outputs distribution build.

#### Using Gulp Google Web-Fonts
* Locate the fonts directory in your src - `src/assets/fonts/`
* Open the `fonts.list` files inside.
* Add/Remove fonts as needed.
* To add fonts, use the following format:
```
# Tab-delimeted format
Oswald	400,700	latin,latin-ext

# Google format
Roboto:500,500italic&subset=greek
```
* On build, the fonts will be downloaded, and injected into your html.


#### More Details To Come!
