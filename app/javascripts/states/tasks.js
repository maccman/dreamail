//= require <superlist>

(function($){

var state = App.state.add("tasks");
state.hasView = true;

state.setup(function(){
  this.slist = this.list.superlist(Task);
    
  this.slist.change(this.proxy(function(item){
    this.app.change("tasks", item);
  }));
  
  this.binder = this.selected.connect(Task, {singleton: true});
  
  this.slist.render();
  
  this.form.submit(this.proxy(function(){
    var task  = new Task;
    task.name = this.formName.val();
    task.save();
    
    this.formName.val("");
    this.formName.focus();
    
    return false;
  }));
  
  this.delete.click(this.proxy(function(){
    $.confirm("Are you sure you want to delete this task?", this.proxy(function(){
      this.current.destroy();
    }));
  }));
  
  this.complete.click(this.proxy(function(){
    this.current.completed = true;
    this.current.save();
  }));
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