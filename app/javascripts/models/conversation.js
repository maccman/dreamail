var Conversation = SuperModel.setup("Conversation");
Conversation.include(SuperModel.GUID);

Conversation.attributes = ["seen"];

// Conversation Unseen Count

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