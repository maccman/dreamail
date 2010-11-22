(function($){

var state = App.state.add("conversations");
state.hasView = true;

state.load(function(){
  Conversation.on("unseenCount", function(count){
    var element = $("#title li[data-name=conversations] span");
    count > 0 ? element.text(count).show() : element.hide();
  });
  Conversation.trigger("unseenCount", 0);
});

})(jQuery);