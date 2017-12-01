# AIO-Bootstrap-4-Boilerplate
An All in One Bootstrap 4 Boilerplate packed with features! Currently using the Bootstrap 4 Beta 2 release, and built using Gulp 4; this boilerplate is ready for Sass, CoffeeScript, Gulp Google Web-Fonts, and BrowserSync.

<ul style="display: inline">

  <img src="https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg" width="64" />
  <img src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png" height="64" />
  <img src="https://4.bp.blogspot.com/--FUGmtDZIaw/V7bH0eDajdI/AAAAAAAAAGU/eu2qzj8OfRgzHn7FsgvTgFi9A16FfbLRQCK4B/s1600/GF_Logo_for_blog_1.png" width="64" />
  <img src="https://user-images.githubusercontent.com/10498583/31125541-e2a732e6-a848-11e7-959d-7d7b0c138124.jpg" width="64" />
  <img src="https://cdn.worldvectorlogo.com/logos/coffeescript.svg" width="64" />
  <img src="https://user-images.githubusercontent.com/10498583/31125540-e2a6eed0-a848-11e7-817a-69c5619f772a.jpg" width="64" />
</ul>

_This is a early release, and will be updated over time. I will add more information to this_ README _as I continue!_

## How To Install
* Open Command Prompt or Bash
* `cd <path>` : Choose save location if needed (Optional).
* `git clone https://github.com/1301313Y/AIO-Bootstrap-4-Boilerplate.git` : Clones the repository to the current directory.
* `cd AIO-Bootstrap-4-Boilerplate` : Navigates inside of the cloned directory.
* `npm install` : Installs all the packages and dependencies.

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
