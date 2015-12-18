#Rainbow [![Build Status](https://travis-ci.org/flyer1/Rainbow.svg?branch=master)](https://travis-ci.org/flyer1/Rainbow) [![devDependency Status](https://david-dm.org/flyer1/rainbow/dev-status.svg)](https://david-dm.org/flyer1/rainbow#info=devDependencies) [![Join the chat at https://gitter.im/flyer1/Rainbow](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/flyer1/Rainbow?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


A daycare website using AngularJS. Because websites don't like postbacks either.

## Primary Technology
- [AngularJS](https://angularjs.org/) - A front end web MV* framework that lets us do databinding, client side routing between pages, custom markup (directives) that is specific to the problem at hand, etc, etc. Basically it's the best thing to come along for web development in a long time.
- [Bootstrap](http://getbootstrap.com/) - Bootstrap makes it easier to layout responsive and rich web pages.
- There are a handful of other libs that make this site tick but the two above do most of the heavy lifting.


## Required Tools
If you want to work on this website, first make sure you have these tools:

- [nodeJS](http://nodejs.org/) - Breaks javascript free from the shackles of the browser and makes it avaiable in a regular process!
- [git](http://git-scm.com/downloads) - Super awesome distributed source code resposity system.


Unless you are comfortable with Git command line, there are some great GUI's for GIT:

- [GitHub for Windows](https://windows.github.com/)
- [GitHub for MAC](https://mac.github.com/)

You need an editor. Visual Studio is one of my favorites but not always free (free for students). Other favorites are:

- [Atom](https://atom.io/) - I use this one the most.
- [Brackets](http://brackets.io/)
- [Sublime Text](http://www.sublimetext.com/)

## Get Started

Note that if you are on a MAC you may have to start each line with 'sudo' if you don't have admin priviledges to write to the target folders (there are ways to avoid having to run as sudo that are out there if this is an issue):

Clone a copy of the main git repo by running in DOS or Bash on a Mac (terminal).

#### 1. Clone the Repository
```
git clone https://github.com/flyer1/Rainbow.git
```

#### 2. Get NPM Packages
I use npm (node package modules) to get node modules required in order to do development on the site. See the package.json file to see what is downloaded by npm when you run the following command (mainly gulp related files. gulp helps us run tasks like create our *.css file from *.less files, etc).

CD to the Rainbow directory created during the clone and type the following:

```
npm install
```

#### 3. Get Bower Packages
Bower is like npm but it is used here to get the libs required by the website (angular, bootstrap, etc).
Get bower and install globally (via the -g switch).
```
npm install bower -g
```

Type this to download all of the libs needed by the project. See the bower.json file for all devdependencies that will be downloaded. If nothing is output, then you have all that you need (because it was already checked into the repository). Otherwise you'll see the list of packages that are downloaded. NOTE: bootstrap-modal-popover lib had to be customized so make sure that you have the version that is checked into this repo.


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

Or, you can use a gulp task to do the same thing, and it supports running in DEV mode or PROD mode
```
gulp serve
```

(do 'gulp serve --PROD' to run host the website from the ./dist folder if you've built the website for deployment vai 'gulp dist')


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

Just type gulp to see a list of custom Rainbow tasks that you can run to make your life easier.

```
gulp 
```


### And Away You Go!
Now you should be up and running in your browser of choice (as long as you don't choose IE), hosting the website in a nice light nodeJS module (http-server), and committing your code to your local git repository which later can be pushed up to the public repository on git-hub (using GitHub for [Windows|Mac]).

Isn't life grand? And all these tools are free free free. As in free beer! (is there such a thing?). Or, are you confused? There is a lot to learn up there. Git, AngularJS, JavaScript, CSS... Oh my! Or maybe; Oh my what fun! - if you are tech enthusiast. Dive in. Google. Watch videos. Learn.

### Just For Fun
Here is a gource visualization of the checkins on this repository. 

Screenshot:
![Gource Visualization](https://github.com/flyer1/Rainbow/blob/master/gource.png "Gource Visualization")

Video: [https://www.youtube.com/watch?v=PyDM6jXQL-0](https://www.youtube.com/watch?v=PyDM6jXQL-0)

Find gource at: [https://github.com/acaudwell/Gource](https://github.com/acaudwell/Gource)

```
Command used to generate visualization:
gource --date-format "%b %e, %Y" --key  --logo logo.png --title "Rainbow Day Nursery" --hide filenames --seconds-per-day 1 --auto-skip-seconds 1 -1280x720 [PATH_TO_RAINBOW_SOURCE_CODE]
```


##Authors
Just me [Jon Kroeker](https://github.com/flyer1)

##License
Licensed under the MIT Open Source license. For more information, see the LICENSE file in this repository.
