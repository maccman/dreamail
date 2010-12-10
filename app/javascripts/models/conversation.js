var Conversation = SuperModel.setup("Conversation");
Conversation.include(SuperModel.GUID);

Conversation.attributes = ["subject", "body", "seen"];

// Conversation unseen count

Conversation.extend({
  unseen: function(){
    return(this.select(function(item){
      return( !item.seen );
    }))
  },
  
  unseenCount: 0
});

Conversation.on("save populate", function(){
  var newCount = Conversation.unseen().length;
  if (Conversation.unseenCount != newCount) {
    Conversation.unseenCount = newCount;
    Conversation.trigger("unseenCount", newCount);
  }
});

Conversation.include({
  hasSeen: function(){
    if (this.seen) return;
    
    this.seen = true;
    this.save();
  }
});