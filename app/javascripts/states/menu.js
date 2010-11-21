jQuery(function($){
  $("#title ul").delegate("li[data-name]", "click", function(){
    App.state.change($(this).attr("data-name"));
  });
});