//= require <jquery>

//= require <rails>
//= require <rails.application>

//= require <superclass>
//= require <superevent>
//= require <superapp>
//= require <superapp.view>
//= require <superroute>
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

App.state.route({
  "/contacts": "contacts",
  "/contacts/:id": function(route){
    this.change("contacts", Contact.find(route.id));
  },
  "/tasks": "tasks",
  "/tasks/:id": function(route){
    this.change("tasks", Task.find(route.id));
  },
  "/activity": "activities",
  "/messages": "conversations"
});

// Disable hash routing for the time being,
// not sure if it's that useful
SuperApp.State.fn.navigate = jQuery.noop;

jQuery(function($){
  App.state.view = new SuperApp.View($("#views"));
  App.user_id    = $("meta[name=user-id]").attr("content");
  
  App.init();
    
  App.on("loaded", function(){
    App.state.change("loading");
    
    if (window.location.hash != "")
      $(window).trigger("hashchange");
  });
  
  App.state.change("loading");
});

//= require <models/contact>
//= require <models/task>
//= require <models/activity>
//= require <models/conversation>
//= require <models/attachment>

//= require <states/loading>
//= require <states/conversations>
//= require <states/contacts>
//= require <states/activities>
//= require <states/tasks>
//= require <states/menu>

//= require <api>

//= require <preload>