//= require <superclass>
// 
// SuperRoute.route({
//   "/maccman": function(){
//     console.log("maccman!");
//   }
// });
// 
// var App = new SuperApp;
// App.route({
//   "/config": "config",
//   "/users/:id": function(route){
//     this.change("users", User.find(route.id));
//   }
// });
// 
// App.navigate("/users", 1);

var SuperRoute = new SuperClass;

SuperRoute.extend({
  PATH_REPLACER: "([^\/]+)",
  PATH_NAME_MATCHER: /:([\w\d]+)/g,
  HASH_MATCHER: /^#!/,

  route: function(routes){
    return(new this(routes));
  },
    
  navigate: function(){
    // Need to throttle
    var args  = jQuery.makeArray(arguments);
    
    args = jQuery.grep(args, function(value){ return !!value });
    
    // If the last argument is false, don't trigger callbacks
    var hash  = "#!" + args.join("/");
    
    // Already navigated to hash
    if (window.location.hash == hash) return;
    
    // Set hash
    window.location.hash = hash;    
  },
  
  throttle: function(fn, delay) {
    var args = arguments;
    clearTimeout(this.timer);
    this.timer = setTimeout(function () {
      fn.apply(fn, args);
    }, delay);
  }
});

SuperRoute.include({  
  routes: [],

  init: function(routes){
    if (routes)
      this.addRoutes(routes)
    
    jQuery(window).bind(
      "hashchange", 
      this.proxy(this.hashChange)
    );
  },
  
  addRoutes: function(routes){
    for(var key in routes)
      this.addRoute(key, routes[key]);
  },
  
  addRoute: function(route, callback){
    var param_names;
    
    if (typeof route == "string") {
      param_names = this.paramNames(route);
      route = this.replaceParams(route);
    }
    
    var compiled = function(path){      
      var exec = route.exec(path);
      var params;
      
      // Route didn't match
      if ( !exec ) return false;
              
      if (param_names) {
        // So we're left with path params
        exec.shift();
        
        params = {};
        for (var i=0; i < exec.length; i++)
          params[param_names[i]] = exec[i];  
      }
      
      callback.call(callback, params || exec);
      return true;
    }
    
    this.routes.push(compiled);
  },
  
  check: function(route){
    for (var i=0; i < this.routes.length; i++)
      if (this.routes[i](route)) return;
  },
  
  // Private
  
  paramNames: function(route){
    var param_names = [];
    this._class.PATH_NAME_MATCHER.lastIndex = 0;
    while ((path_match = this._class.PATH_NAME_MATCHER.exec(route)) !== null) {
      param_names.push(path_match[1]);
    }
    return param_names.length > 0 ? param_names : null;
  },
  
  replaceParams: function(route){
    return(new RegExp("^" + route.replace(
      this._class.PATH_NAME_MATCHER, 
      this._class.PATH_REPLACER
    ) + "$"));
  },
  
  hashChange: function(){
    this.check(window.location.hash.replace(
      this._class.HASH_MATCHER, ""
    ));    
  }
});

if (typeof SuperApp != "undefined") {
  
SuperApp.fn.route = function(routes){
  jQuery.each(routes, this.proxy(function(key){
    var value = routes[key];
    routes[key] = this.proxy(function(){
      if (typeof value == "string")
        this.change(value);
      else
        value.apply(this, arguments);
    });
  }))
  
  this.routes = SuperRoute.route(routes);
};

SuperApp.State.navigate    = SuperRoute.navigate;
SuperApp.State.fn.navigate = function(){
  var args = arguments;
  SuperRoute.throttle(function(){
    SuperRoute.navigate.apply(SuperRoute, args);    
  }, 400);
};

}

// jQuery(function($){
//   if (window.location.hash != "")
//     $(window).trigger("hashchange");
// });