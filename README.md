# backbone.viewmanager

A simple little module for managing Backbone views, birthed in a [JSFiddle](http://jsfiddle.net/danharper/gCrQ2/).
An even simpler version without region support is [available here](http://jsfiddle.net/danharper/gs489/) if you're
interested in seeing how this evolved.

---

**Fair Warning** As of right now I haven't yet tested this yet. I've just pulled the (very working) code from JSFiddle,
and made a few changes (all in the GitHub web interface, pretty cool).
I'm pretty sure those changes wouldn't have broken anything, but I'll test this out properly later.

---

## Usage

You're given a new `Backbone.ViewManager` which does all the cool stuff. And a `Backbone.ViewManager.BaseView`
for you to extend from.

```javascript
var app = window.app = { views: {} };

// these views inherit the render() method from the base
// so you only need to write that function if it does something special
app.views.pageOne = Backbone.ViewManager.BaseView.extend({
    template: '#pageOne',

    initialize: function() {
        // set some data which will be passed to the template
        // you could add your model or collection here
        // 
        // NOTE: the base view's render() method is only good
        // for the simplest of views, write your own on a view
        // if you have more advanced needs
        this.templateData.person = {
            name: 'Dan Harper'
        };
    }
});

app.views.pageTwo = Backbone.ViewManager.BaseView.extend({
    template: '#pageTwo',

    unsetView: function() {
        // this method is run just before the view is removed,
        // you may want to turn off any bindings here..
        console.log('pageTwo custom unsetView');
    }
});

app.views.sidebarOne = Backbone.ViewManager.BaseView.extend({
    template: '#sidebarOne'
});

app.views.sidebarTwo = Backbone.ViewManager.BaseView.extend({
    template: '#sidebarTwo'
});



app.router = Backbone.Router.extend({
    routes: {
        '': 'pageOne',
        'foo': 'pageTwo'
    },

    initialize: function() {
        // register the regions
        Backbone.ViewManager.Core.addRegion('panel', '#panel');
        Backbone.ViewManager.Core.addRegion('sidebar', '#sidebar');
    },

    pageOne: function() {
        // render our views!
        Backbone.ViewManager.Core.swap('panel', new app.views.pageOne());
        Backbone.ViewManager.Core.swap('sidebar', new app.views.sidebarOne());
    },

    pageTwo: function() {
        Backbone.ViewManager.Core.swap('panel', new app.views.pageTwo());
        Backbone.ViewManager.Core.swap('sidebar', new app.views.sidebarTwo());
    }
});

new app.router();
Backbone.history.start();
```
