#Rainbow [![Build Status](https://travis-ci.org/flyer1/Rainbow.svg?branch=master)] (https://travis-ci.org/flyer1/Rainbow) [![devDependency Status](https://img.shields.io/david/dev/flyer1/rainbow.svg?style=flat)](https://david-dm.org/flyer1/rainbow#info=devDependencies)

[![Join the chat at https://gitter.im/flyer1/Rainbow](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/flyer1/Rainbow?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A daycare website using AngularJS. Because websites don't like postbacks either.

## Primary Technology
- [AngularJS](https://angularjs.org/) - A front end web MV* framework that lets us do databinding, client side routing between pages, custom markup (directives) that is specific to the problem at hand, etc, etc. Basically it's the best thing to come along for web development in a long time.
- [Angular Bootstrap](http://angular-ui.github.io/bootstrap/) - An Angular-ized version of Bootstrap that makes it easier to layout responsive and rich web pages.
- There are a handful of other libs that make this site tick but the two above do most of the heavy lifting.


## Required Tools
If you want to work on this website, first make sure you have these tools:

- [nodeJS](http://nodejs.org/) - Breaks javascript free from the shackles of the browser and makes it avaiable in a regular process!
- [git](http://git-scm.com/downloads) - Super awesome distributed source code resposity system.


Unless you are comfortable with Git command line, there are some great GUI's for GIT:

- [GitHub for Windows](https://windows.github.com/)
- [GitHub for MAC](https://mac.github.com/)

## Get Started

Note that if you are on a MAC you may have to start each line with 'sudo' if you don't have admin priviledges to write to the target folders (there are ways to avoid having to run as sudo that are out there if this is an issue):

Clone a copy of the main git repo by running in DOS or Bash on a Mac (terminal).

#### 1. Clone the Repository
```
git clone https://github.com/flyer1/Rainbow.git
```

#### 2. Get NPM Packages
We use npm (node package modules) to get node modules required in order to do development on the site. See the package.json file to see what is downloaded by npm when you run the following command (mainly gulp related files. gulp helps us run tasks like create our *.css file from *.less files, etc).

CD to the Rainbow directory created during the clone and type the following:

```
npm install
```

#### 3. Get Bower Packages
Bower is like npm but it is used here to get the libs required by the website (angular, angular-bootstrap, etc).
Get bower and install globally (via the -g switch).
```
npm install bower -g
```

Type this to download all of the libs needed by the project. See the bower.json file for all devdependencies that will be downloaded. If nothing is output, then you have all that you need (because it was already checked into the repository). Otherwise you'll see the list of packages that are downloaded.


```
bower install
```

#### 4. Get HTTP-Server for Hosting the Site

A nice lightweight way to host the site can be done in the http-server module (many other options exist if you prefer):

```
npm install http-server -g
```

Now you can just run this module and then browse to [http://localhost:8080](http://localhost:8080) to see the webiste!

```
http-server
```

(or run 'hs' for short)

#### 5. Get Gulp Task Runner (Optional)
Gulp helps you run tasks. It needs to be install locally (which happened during the npm install step) and globably. Here it is install globably.

```
npm install gulp -g
```


Gulp can help you generate site.css from all of the *.less files. Simply run:

```
gulp css
```

Or if you prefer to have this task continously watch for changes in your less files and generate the site.css everytime it sees a change in a less file run:

```
gulp watch-less
```


##Authors
Just me [Jon Kroeker](https://github.com/flyer1)

##License
Licensed under the MIT Open Source license. For more information, see the LICENSE file in this repository.
