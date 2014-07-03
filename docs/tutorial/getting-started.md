Getting started
===============

Introduction
------------
Getting started with the islive.io's SDK **Bridge** is relatively simple.
After following this tutorial, you will have a functional hello-world application.

### Long version
We will be building this application in the simplest way possible, as the goal here is to
make you familiar with the possibilities supplied by the SDK.
This means that by the end of this tutorial your application won't be beautiful, but you will know the basics.

For this tutorial I'll assume that you're familiar with:

* HTML and Javascript
* RequireJS
* jQuery
* Bower
* Extreme success, as this product will make you incredibly rich.

### TL;DR
So, you just want to see code? Excellent.
Fetch the [bridge](https://github.com/Islive-io/bridge) source code and check out the `example` directory.
It has a very concise README and will help you get it up and running quickly.

---

Preparing
------------
### Assets
Some information as to where we'll be getting our assets from:

* The islive.io SDK uses [RequireJS](http://requirejs.org/).
* We'll be using [RequireJS with jquery](http://requirejs.org/docs/jquery.html).
* Both jQuery and RequireJS will be loaded from a CDN to even more lower the boilerplate code.

### Create your index file
Create a file named `index.html` with the following content:
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Good day sir!</title>

    <!-- RequireJS, with the "main" module set. -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.14/require.min.js" data-main="app">
    </script>
</head>
<body>

<h1>Profile</h1>

<dl>
    <dt>Username</dt>
    <dd id="username"></dd>
    <dt>Age</dt>
    <dd id="age"></dd>
    <dt>Hair color</dt>
    <dd id="hairColor"></dd>
</dl>

</body>
</html>

```

What's happening here is that we're creating a new HTML5 document.
We have a single **script** dependency and some markup that we'll use later on.
As you might have guessed by now, we'll be fetching some basic information about one of our performers.

### Install SDK
[Bridge](https://github.com/Islive-io/bridge), which is the name of the islive.io SDK connects you to the islive.io fortress.
It's where all of the magic will happen. Install it using your preferred method. For this tutorial I'll assume you've used bower.

**Git clone**

`git clone git@github.com:Islive-io/bridge.git`

**Bower install**

`bower install git@github.com:Islive-io/bridge.git`

You should now have a directory called `bower_components` containing the `bridge` directory.

### Configuring RequireJS
We'll have to configure RequireJS to tell it where jQuery resides.

Create a file called `app.js` next to your `index.html` file with the following content:

```javascript
requirejs.config({
  "paths" : {
    "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
  }
});
```

As you can see, we're just telling RequireJS that the "jquery" dependency lives at the googleapis server.

---

Really getting started
-------------------
This is really the most disappointing part, as it's probably the easiest. Don't you hate it when things are easy?

### Adding the package
We'll have to tell RequireJS that `bridge` is a thing. It won't know what it is, or where to find it without our help.

Open up `app.js` and change your configuration code to read:

```javascript
requirejs.config({
  "paths" : {
    "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
  },
  packages: [
    {
      name    : 'bridge',
      location: 'bower_components/bridge'
    }
  ]
});
```

What happened here, is that we added the `packages` key to the config. We've also told it that the `bridge` plugin lives in `bower_components`.

### Creating the module
Now, we must create the module for `app.js`. Add the following at the end of the `app.js` file:

```javascript
define(['jquery', 'bridge!performer/find'], function ($, find) {
  find.byUsername('kinkydenise', function(error, performer) {
    if (error) {
      return console.error('Could not find performer :(', error);
    }

    $('#username').text(performer.username);
    $('#age').text(performer.age);
    $('#hairColor').text(performer.hairColor);
  });
});
```

Let's go through this code a bit.

1. First, we're defining a new module, with two dependencies, being jQuery and bridge!performer/find.
2. Next, we're calling the method `find.byUsername()` on the `performer/find` module.
3. Then, by convention, we're checking if the first argument of our callback got an error.
4. And finally, we're using the returned performer information to fill the elements on our page using jQuery.

### Done
It's that simple. We've just created the second most boring, information lacking profile page ever (first place goes to MySpace), but it works.

---

What's next?
------------
Now that you're familiar with the ridiculously simple structure of `Bridge`, you can start building your application.

For the rest of the functionality provided by modules, take a look at the API documentation, found in the navigation bar under the API menu item.
