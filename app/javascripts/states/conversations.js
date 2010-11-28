//= require <jquery.wysiwyg>
//= require <jquery.browse>

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

state.setup(function(){
  var controls = this.editArea.wysiwyg();
  
  controls.attachment = $.noop;
  
  this.editControls.delegate("[data-type]", "click", function(){
    controls[$(this).attr("data-type")]();
    return false;
  });
  
  this.editControls.find("[data-type=attachment]").browseElement(function(files){
    console.log(files)
  });
})

state.beforeEnter(function(){
  this.navigate("/messages", this.current && this.current.id);
});

})(jQuery);