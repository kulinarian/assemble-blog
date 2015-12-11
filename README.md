#### assemble-blog

This repository is not intended to be an open source project. Rather it's goal is to simply show how we use Assemble.io to build [blog.kulinarian.com](http://blog.kulinarian.com/). Our primary app [kulinarian.com](https://www.kulinarian.com) is built with [Laravel](https://github.com/laravel/laravel).

#### Assemble.io

To learn how to get setup and running with [assemble.io](http://assemble.io/), go to their [quickstart guide](http://assemble.io/docs/Quickstart.html) or follow some of the tutorials listed below.

#### app/partials/ignored

This directory contains partials that we do not want to include in our public repo.

For example, in `app/layouts/default.hbs` we include the partial `{{> ga-analytics }}`, which is located at `app/partials/ignored/ga-analytics.hbs`.

We then add `app/partials/ignored` to our `.gitignore` file to ensure the files in that directory are not pushed to our public repo.

#### Tutorials

Here are some tutorials I found to be very helpful;

* [How To Build A Static Blog Using Assemble](http://www.hongkiat.com/blog/blogging-with-assemble/)
