
#### app/partials/ignored

This directory contains partials that we do not want to include in our public repo.

For example, in `app/layouts/default.hbs` we include the partial `{{> ga-analytics }}`, which is located at `app/partials/ignored/ga-analytics.hbs`.

We then add `app/partials/ignored` to our `.gitignore` file to ensure the files in that directory are not pushed to our public repo.

#### Tutorials

Here are some tutorials I found to be very helpful;

* [How To Build A Static Blog Using Assemble](http://www.hongkiat.com/blog/blogging-with-assemble/)
