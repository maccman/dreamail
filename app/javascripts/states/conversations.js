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
  
  this.butSend.click(function(){
    console.log('send email');
  });
});

state.setup(function(){
  this.slist = this.list.superlist(Conversation);
  
  this.slist.change(this.proxy(function(item){
    this.app.change("conversations", item);
  }));
  
  this.list.renderItem(function(e, item){
    $(this).toggleClass("seen", !!item.seen);
  });
  
  this.slist.render();
});

state.beforeEnter(function(current){
  if ( !current ) return;
  
  this.current = current;
  
  this.delay(function(){
    if (this.current == current)
      this.current.hasSeen();
  }, 100);
});

state.beforeEnter(function(current){
  if ( !current || current.eql(this.current) ) return;
  this.navigate("/messages", current.id);
});

state.afterEnter(function(){
  this.slist.focus();
});

state.beforeExit(function(){
  this.slist.unfocus();
});

})(jQuery);