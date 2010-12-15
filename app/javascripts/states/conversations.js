(function($){

var state = App.state.add("conversations");
state.hasView = true;

state.beforeEnter(function(current){
  if ( !current ) return;
  this.current = current;
});

// Required states that need to be loaded
// before the SuperList is setup
//= require <states/conversations.emails>
//= require <states/conversations.editor>

// Unseen count
state.load(function(){
  Conversation.on("unseenCount", function(count){
    var element = $("#title li[data-name=conversations] span");
    count > 0 ? element.text(count).show() : element.hide();
  });
  Conversation.trigger("unseenCount", 0);
});

// Conversations
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

// Conversation seen
state.beforeEnter(function(current){
  // Make sure we're not quickly skipping
  // between conversations
  this.delay(function(){
    if (this.current == current)
      this.current.wasSeen();
  }, 100);
});

// Navigation
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