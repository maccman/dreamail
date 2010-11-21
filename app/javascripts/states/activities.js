(function($){

var state = App.state.add("activities");
state.hasView = true;

state.setup(function(){
  this.slist = this.list.superlist(Activity);
  
  this.slist.change(this.proxy(function(item){
    this.app.change("activities", item);
  }));
  
  this.binder = this.selected.connect(Activity, {singleton: true});
  
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
});

state.beforeExit(function(){
  this.slist.unfocus();
});

})(jQuery);