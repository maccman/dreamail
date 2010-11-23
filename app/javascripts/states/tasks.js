//= require <superlist>

(function($){

var state = App.state.add("tasks");
state.hasView = true;

state.setup(function(){
  this.slist = this.list.superlist(Task, {prepend: true});
    
  this.slist.change(this.proxy(function(item){
    this.app.change("tasks", item);
  }));
  
  this.list.renderItem(function(e, item){
    var element = $(this);
    element.toggleClass("completed", !!item.completed);
    element.find("input").attr("checked", !!item.completed);
  });
  
  this.list.delegate("input", "change", this.proxy(function(e){
    var element    = $(e.target);
    var item       = element.item();
    item.completed = element.attr("checked");
    item.save();
    
    this.app.change("tasks", item);
  }));
  
  this.list.delegate(".item", "toggle", function(){
    var checkbox = $(this).find("input");
    checkbox.attr("checked", !checkbox.attr("checked"));
    checkbox.change();
  });
  
  this.list.delegate(".item", "dblclick", function(){
    $(this).trigger("toggle");
  });
  
  $("body").keydown(this.proxy(function(e){
    // If target isn't an input, this state is current and the key is the spacebar
    if ( !("value" in e.target) && this.slist.keys && e.which == 32 ) { // Space
      this.slist.current().trigger("toggle");
      return false;
    }
  }));
  
  this.binder = this.selected.connect(Task, {singleton: true});
  
  this.selected.render(this.proxy(function(){
    this.butComplete.toggleDisplay( !this.current.completed );
    this.butUncomplete.toggleDisplay( !!this.current.completed );
  }));
  
  this.slist.render();
  
  this.form.submit(this.proxy(function(){
    var task  = new Task;
    task.name = this.formName.val();
    try {
      task.save();
      this.app.change("tasks", task);
    } catch(e) {}
    
    this.formName.val("");
    this.formName.focus();
    
    return false;
  }));
  
  this.butDelete.click(this.proxy(function(){
    $.confirm("Are you sure you want to delete this task?", this.proxy(function(){
      this.current.destroy();
    }));
  }));
  
  this.butComplete.click(this.proxy(function(){
    this.current.completed = true;
    this.current.save();
  }));
  
  this.butUncomplete.click(this.proxy(function(){
    this.current.completed = false;
    this.current.save();
  }));  
});

state.beforeEnter(function(current){
  if ( !current ) return;
  
  this.current = current;  
  this.slist.setItem(this.current);
  this.binder.setItem(this.current);
});

state.afterEnter(function(){
  this.slist.focus();
});

state.beforeExit(function(){
  this.slist.unfocus();
});

})(jQuery);