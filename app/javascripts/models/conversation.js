var Conversation = SuperModel.setup("Conversation");
Conversation.attributes = ["subject", "body", "seen", "message_ids"];

Conversation.include(SuperModel.GUID);

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
  wasSeen: function(){
    if (this.seen) return;
    
    this.seen = true;
    this.save();
  },
  
  hasMessage: function(msg){
    return jQuery.includes(this.message_ids, msg.id);
  },
  
  addMessage: function(item){
    if ( !this.message_ids )
      this.message_ids = [];
    this.message_ids.push(item.id);
    this.save();
  }
});