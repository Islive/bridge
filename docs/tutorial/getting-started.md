Getting started
===============

Introduction
------------
Getting started with the islive.io SDK is relatively simple.
After following this tutorial, you will have a fully functional hello-world application.

We will be building this application in the simplest way possible, as the goal here is to
make you familiar with the possibilities supplied by the SDK.
This means that by the end of this tutorial your application won't be beautiful, but you will know the basics.

Installation
------------
#### Require.js
* The islive.io SDK uses [RequireJS](http://requirejs.org/).
* We'll be using [RequireJS with jquery](http://requirejs.org/docs/jquery.html).
* jQuery will be loaded from a CDN to even more lower the boilerplate code.

**Create your index.html file.**
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Good day sir!</title>

    <!-- RequireJS config. Will be applied as soon as RequireJS loads. -->
    <script>
      var require = {
        "paths": {
          "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
        }
      };
    </script>

    <!-- RequireJS, with the "main" module set. -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.14/require.min.js" data-main="app">
    </script>
</head>
<body>
    <h1>Online performers</h1>
    <ul id="performers"></ul>
</body>
</html>

```




Download sdk, make sure you have permission to, set up package, download require.js, require dep.

Showing performers
-------------------
Require performer module. Find where online. limit 10.

What's next?
------------
Set up your own directory structure (grunt, almond with build etc), check out the docs for what else you can do.
