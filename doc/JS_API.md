
##Detecting state changes

    api.change(function(toView){
      
    });
    
##Changing state

    api.change("conversations", Conversation.first());
    api.change("activities", Activity.first());
    api.change("contacts", Contact.first());
    api.change("tasks", Task.first());
    
##Completing a task

    var task = Task.first();
    task.complete();

##Tapping into an email render

    api.renderEmail(function(e, email){
      
    });
    
    api.renderAttachment(function(e, attachment){
      
    });