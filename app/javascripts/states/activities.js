(function($){

var state = App.state.add("activities");
state.hasView = true;

state.load(function(){
  Activity.on("unseenCount", function(count){
    var element = $("#title li[data-name=activities] span");
    count > 0 ? element.text(count).fadeIn() : element.fadeOut();
  });
  Activity.trigger("unseenCount", 0);
});

state.setup(function(){
  this.slist = this.list.superlist(Activity);
  
  this.slist.change(this.proxy(function(item){
    this.app.change("activities", item);
  }));
  
  this.binder = this.selected.connect(Activity, {singleton: true});
  
  this.list.renderItem(function(e, item){
    $(this).toggleClass("seen", !!item.seen);
  });
  
  this.slist.render();  
});

state.beforeEnter(function(current){
  if ( !current ) return;
  
  this.current = current;  
  this.slist.current(this.current);
  this.binder.setItem(this.current);
});

state.afterEnter(function(){
  this.slist.focus();
  
  this.delay(function(){
    var items = this.slist.binder.allItems();
    for (var i=0; i < items.length; i++) items[i].hasSeen();
  }, 1000);
});

state.beforeExit(function(){
  this.slist.unfocus();
});

})(jQuery);