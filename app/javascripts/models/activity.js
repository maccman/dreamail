//= require <supermodel>
//= require <supermodel.filter>

var Activity = SuperModel.setup("Activity");

Activity.attributes = ["from", "subject", "seen"];

Activity.include({
  hasSeen: function(){
    if (this.seen) return;
    
    this.seen = true;
    this.save();
  }
});

// Activity Unseen Count

Activity.extend({
  unseen: function(){
    return(this.select(function(item){
      return( !item.seen );
    }))
  },
  
  unseenCount: 0
});

Activity.on("save populate", function(){
  var newCount = Activity.unseen().length;
  if (Activity.unseenCount != newCount) {
    Activity.unseenCount = newCount;
    Activity.trigger("unseenCount", newCount);
  }
});