jQuery(function($){
  App.state.view = new SuperApp.View($("#views"));
  App.user_id    = $("meta[name=user-id]").attr("content");
  
  App.init();
    
  App.on("loaded", function(){
    App.state.change("conversations");
    
    if (window.location.hash != "")
      $(window).trigger("hashchange");
  });
  
  App.state.change("loading");
});