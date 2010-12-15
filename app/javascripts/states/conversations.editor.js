//= require <jquery.wysiwyg>
//= require <jquery.browse>
//= require <jquery.drop>

(function($){

var state = App.state.find("conversations");

// Editor
state.setup(function(){
  this.controls = this.editArea.wysiwyg();
  this.controls.attachment = $.noop;
  
  this.reset = function(){
    this.controls.reset();
    this.editAttachments.empty().hide();
    this.attachments = [];
  };
  
  // Reset on setup
  this.reset();
  
  this.addFile = function(file){
    var attachment = Attachment.fromFile(file);
    this.attachments.push(attachment);
    
    var element = $("<div />").text(attachment.name);
    this.editAttachments.append(element).show();
  };
  
  this.editControls.delegate("[data-type]", "click", this.proxy(function(e){
    this.controls[$(e.target).attr("data-type")]();
    return false;
  }));
  
  this.editControls.find("[data-type=attachment]").browseElement(this.proxy(function(files){
    for (var i=0; i < files.length; i++) 
      this.addFile(files[i]);
  }));
  
  this.butSend.click(this.proxy(function(){
    var message = new Message();
    message.body = this.controls.val();
    message.setConversation(this.current);
    message.save();
    
    this.reset();
    return false;
  }));
  
  this.editArea.focus(this.proxy(function(){
    this.editControls.addClass("focus");
  }));
  
  var dropElement = this.view.find(".main").dropArea();
  
  dropElement.bind("dragenter", this.proxy(function(){
    this.editAttachments.show();
  }));
  
  dropElement.bind("drop", this.proxy(function(e){
    e.preventDefault();
    
    var files = e.originalEvent.dataTransfer.files;
    for ( var i = 0; i < files.length; i++)
      this.addFile(files[i]);
  }));  
});

})(jQuery);