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
    console.log(files);
  });
  
  this.butSend.click(this.proxy(function(){
    var message = new Message;
    message.body = controls.val();
    message.setConversation(this.current);
    message.save();
    
    controls.reset();
    return false;
  }));
  
  this.editArea.focus(this.proxy(function(){
    this.editControls.addClass("focus");
  }));
});

state.setup(function(){
  this.messages.renderItem(function(e, item){
    // TODO - unsafe
    $(this).find(".body").html(item.body);
  });

  this.binder = this.messages.connect(Message, {prepend: true});
  this.binder.filter = this.proxy(function(item){
    return(this.current && this.current.hasMessage(item));
  });
});

state.setup(function(){
  this.slist = this.conversations.superlist(Conversation);
  
  this.conversations.renderItem(function(e, item){
    $(this).toggleClass("seen", !!item.seen);
  });
  
  this.butPrevious.click(this.proxy(function(){
    this.slist.prev();
    return false;
  }));
  
  this.butNext.click(this.proxy(function(){
    this.slist.next();
    return false;
  }));
  
  // Needs to be added last, as otherwise beforeEnter could
  // be called before state has been properly setup
  this.slist.change(this.proxy(function(item){
    this.app.change("conversations", item);
  }));
  
  this.slist.render();
});

state.beforeEnter(function(current){
  if ( !current ) return;
  
  this.current = current;
  this.binder.render(this.current.getMessages());
  
  this.delay(function(){
    if (this.current == current)
      this.current.wasSeen();
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