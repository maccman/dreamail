
##Detecting state changes

    App.state.change(function(toView){
      
    });
    
##Changing state

    App.state.change("conversations", Conversation.first());
    App.state.change("activities", Activity.first());
    App.state.change("contacts", Contact.first());
    App.state.change("tasks", Task.first());
    
##Completing a task

##Tapping into an email render

    App.state.find("conversations").emails.renderItem(function(email){
      
    });