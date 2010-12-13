jQuery(function($){
  App.trigger("loading");
  
  var contactData = [];
  for (var i=0; i < 15; i++)
    contactData.push({
      id:         i,
      email:      "maccman" + i + "@gmail.com",
      first_name: "Alex",
      last_name:  "MacCaw"
    });
  Contact.populate(contactData);
  
  var taskData = [];
  for (var i=0; i < 15; i++)
    taskData.push({
      id:   i,
      name: "Task " + i,
    });
  Task.populate(taskData);
  
  var activityData = [];
  for (var i=0; i < 15; i++)
    activityData.push({
      id:       i,
      subject: "Activity " + i,
      from:    "Lorra Lorra Lorem"
    });
  Activity.populate(activityData);
  
  var messageData = [];
  for (var i=0; i < 30; i++)
    messageData.push({
      id:       i,
      from:    "wem" + i + "@example.com",
      subject: "Conversation " + i,
      body:    "Lorra Lorra Lorem. Lorra Lorra Lorem."
    });
  Message.populate(messageData);
  
  var conversationData = [];
  for (var i=0; i < 15; i++)
    conversationData.push({
      id:       i,
      subject: "Conversation " + i,
      body:    "Lorra Lorra Lorem. Lorra Lorra Lorem.",
      message_ids: [messageData[i].id, messageData[i + 1].id]
    });
  Conversation.populate(conversationData);
  
  App.trigger("loaded");

  // var loader = function(data){
  //   Contact.populate(data);
  //   App.trigger("loaded");
  // };

  // $.ajax({
  //   url: "/contacts/preload",
  //   dataType: "json",
  //   cache: false,
  //   success: loader
  // });
});