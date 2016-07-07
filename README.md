missofis-link-vote-challenge
====

A simple AngularJS feed application.

Installation
----

You need to install [Node.js](https://nodejs.org), [Bower](http://bower.io/#install-bower), [Grunt](http://gruntjs.com/getting-started#installing-the-cli) to follow the steps below.  
You'll also need [Ruby](https://www.ruby-lang.org/en/documentation/installation/) and [Sass](http://sass-lang.com/install) to compile \*.scss files.

* Clone or download repository [https://github.com/xkema/missofis-link-vote-challenge](https://github.com/xkema/missofis-link-vote-challenge)
* Open a terminal screen and go to the repo folder root. (where Gruntfile.js resides)
* Run `bower install` and `npm install` commands.
* Run `grunt` command to preview application and run tests. ([http://localhost:3000](http://localhost:3000) in web browser)
* Run `grunt test` command to run tests only. (watch terminal screen :)

Notes
----

* Mock data (items.json) fetched from [Product Hunt API](https://api.producthunt.com/v1/docs/posts/posts_index_get_the_tech_posts_of_today) and decorated with additional properties.
* Use Firefox browser to get rid of Chrome's CORS error if u're not using a mock server implementation. (chrome browser block XHR calls from `file://` urls which is used by AngularJS frequently:)
* See [Angular 1 Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md) to review code convention used in this project.
* [Skeleton | A dead simple, responsive boilerplate](http://getskeleton.com/) used for style base.
* Pagination feature considered service-independent! (load all items to page, paginate after with all data, meh :()