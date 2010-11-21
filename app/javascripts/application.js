//= require <jquery>

//= require <rails>
//= require <rails.application>

//= require <superclass>
//= require <superevent>
//= require <superapp>
//= require <superapp.view>
//= require <supermodel>
//= require <superconnect>

//= require <shared>

var App = new SuperClass;
App.extend(SuperEvent);

App.extend({
  state: new SuperApp,
    
  init: function(){
    this.trigger("init");
  },

  trace: true,
  
  log: function(){
    if ( !this.trace ) return;
    if (typeof console == "undefined") return;
    var args = jQuery.makeArray(arguments);
    args.unshift("(App)");
    console.log.apply(console, args);
  }
});

jQuery(function($){
  App.state.view = new SuperApp.View($("#views"));
  App.user_id    = $("meta[name=user-id]").attr("content");
  
  App.init();
    
  App.on("loaded", function(){
    App.state.change("loading");
  });
  
  App.state.change("loading");
});

//= require <models/contact>
//= require <models/task>
//= require <models/activity>

//= require <states/loading>
//= require <states/conversations>
//= require <states/contacts>
//= require <states/activities>
//= require <states/tasks>
//= require <states/menu>

//= require <preload>