//= require <supermodel>
//= require <supermodel.filter>

var Task = SuperModel.setup("Task");

Task.attributes = ["name", "notes", "completed"];

Task.include(SuperModel.GUID);

Task.include(SuperModel.Filter);
Task.filter_attributes = ["name", "notes"];

Task.extend({
  completed: function(){
    return(this.select(function(i){ return i.completed }));
  }
});

Task.include({
  complete: function(){
    if (this.completed) return;
    this.completed = true;
    this.save();
  }
});

Task.beforeSave(function(task){
  if (jQuery.isBlank(task.name)) throw "Name required";
});