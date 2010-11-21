//= require <supermodel>
//= require <supermodel.filter>

var Task = SuperModel.setup("Task");

Task.attributes = ["name", "notes", "completed"];

Task.include(SuperModel.Filter);
Task.filter_attributes = ["name", "notes"];

Task.extend({
  completed: function(){
    return(this.select(function(i){ return i.completed }));
  }
});

Task.beforeSave(function(task){
  if ($.isBlank(task.name)) throw "Name required";
});