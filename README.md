#Rainbow

A daycare website using AngularJS. Because websites don't like postbacks either.



## Required Tools
First, make sure you have these tools:

- [nodeJS](http://nodejs.org/) - Breaks javascript free from the shackles of the browser and makes it avaiable in a regular process!
- [git](http://git-scm.com/downloads) - Super awesome distributed source code resposity system.


Unless you are comfortable with Git command line, there are some great GUI's for GIT: 

- [GitHub for Windows](https://windows.github.com/)
- [GitHub for MAC](https://mac.github.com/)

## Get Started

Note that if you are on a MAC you may have to start each line with 'sudo' if you don't have admin priviledges to write to the target folders (there are ways to avoid having to run as sudo that are out there if this is an issue):

Clone a copy of the main git repo by running in DOS or Bash (terminal).

#### 1. Clone the Repository
```
git clone https://github.com/flyer1/Rainbow.git
```

#### 2. Get NPM Packages
Then CD to the Rainbow directory created during the clone and type the following to install the libs needed for this project (see package.json file for what dependencies are needed):

```
npm install 
```

#### 3. Get Bower Packages
Get bower and install globally (via the -g switch). 
```
npm install bower -g
```

Type this to download all of the libs needed by the project. See the bower.json file for all devdependencies that will be downloaded. If nothing is output, then you have all that you need. Otherwise you'll see the list of packages that are downloaded.


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
