//= require <supermodel>
//= require <supermodel.relation>

var Message = SuperModel.setup("Message");
Message.attributes = ["subject", "from", "body"];

Message.belongsTo("conversation");
Message.include(SuperModel.GUID);

Message.afterCreate(function(item){
  var conversation = item.getConversation();
  if (conversation) conversation.addMessage(item);
});

Message.include({
  validate: function(){
    if ( !this.body ) return false;
    if ( this.body == "" ) return false;
  }
})