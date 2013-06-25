(function(Backbone) {
    
    var vm = Backbone.ViewManager = {};
    
    vm.Core = (function() {
        var _regions = {};
    
        return {
            // register a region
            // name: a unique name for this region
            // selector: a DOM selector for this region
            addRegion: function(name, selector) {
                _regions[name] = {
                    el: $(selector)
                };
            },
    
            // render a new view in a region
            // region: the name of the region
            // newView: the Backbone view object to render
            swap: function(region, newView) {
                region = _regions[region];
    
                if (!region) {
                    return false;
                }
    
                // if a current view exists in region, unset and remove it
                if (region.view) {
                    region.view.unsetView();
                    region.view.unset();
                }
    
                // set the new view as current for the region
                region.view = newView;
    
                // render the new view into the region
                region.el.empty().html(newView.render().el);
    
                // return the new view instance
                return newView;
            }
        };
    })();
    
    
    // a simple Base view
    vm.BaseView = Backbone.View.extend({
    
        templateData: {},
    
        // to render the template on the view, just add a 'template'
        // variable to it which is the ID of the template on the page
        // 
        // NOTE: this is only a demo for simple views. write your own
        // render() method in your view if you have special requirements
        render: function() {
            if (this.template) {
                var template = _.template($(this.template).html());
    
                this.$el.html(template(this.templateData));
            }
            return this;
        },
    
        // clean up before removing the view
        unset: function() {
            // turn off all bindings on the view
            this.off();
    
            // remove self from the page
            this.remove();
        },
    
        // NOTE: override this in a view to run any custom code before unset()
        // eg. turning off extra bindings
        unsetView: function() {
            // ...
        }
    
    });

})(window.Backbone);