(function($){

var state = App.state.find("conversations");

// Messages
state.setup(function(){
  this.messages.renderItem(function(e, item){
    // TODO - unsafe
    $(this).find(".body").html(item.body);
    
    var attachments = item.getAttachments();
    var element = $(this).find(".attachments");
    
    element.empty();
    $.each(attachments, function(i, item){
      element.append(item.getPreview());
    });
    element.toggleDisplay(attachments.length > 0);
  });

  this.binder = this.messages.connect(Message, {prepend: true});
  this.binder.filter = this.proxy(function(item){
    return(this.current && this.current.hasMessage(item));
  });
});

state.beforeEnter(function(){
  this.binder.render(this.current.getMessages());
});

})(jQuery);