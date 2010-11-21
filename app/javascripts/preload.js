jQuery(function($){
  App.trigger("loading");
  
  for (var i=0; i < 15; i++) {
    Contact.create({
      email: "maccman" + i + "@gmail.com",
      first_name: "Alex",
      last_name: "MacCaw"
    });
  };
  
  for (var i=0; i < 15; i++) {
    Task.create({
      name: "Task " + i,
    });
  };
  
  for (var i=0; i < 15; i++) {
    Activity.create({
      subject: "Activity " + i,
      from:    "Lorra Lorra Lorem"
    });
  };
  
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