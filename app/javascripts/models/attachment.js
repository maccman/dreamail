//= require <supermodel>
//= require <supermodel.relation>
//= require <jquery.upload>
//= require <jquery.mime>

var Attachment = SuperModel.setup("Attachment");
Attachment.attributes = ["name", "size"];
Attachment.belongsTo("message");
Attachment.include(SuperModel.GUID);

Attachment.extend({
  fromFile: function(file){
    // TODO - use file
    var item  = new this({
      name: file.name,
      size: file.size
    })
    return item;
  }
});

Attachment.include({  
  upload: function(file, options){
    var options = jQuery.extend({}, {
      url:    "/attachments/" + this.id,
      method: "PUT"
    }, options);
    
    jQuery.upload(file, options);
  },
  
  getExt: function(){
    return jQuery.getExtension(this.name);
  },
  
  getMime: function(){
    return(jQuery.mime[this.getExt()] || "unknown");
  },
  
  getMimeThumb: function(){
    return("/images/mime/" + this.getMime() + ".png");
  },
  
  getPreview: function(){
    return jQuery("<img />").attr("src", this.getMimeThumb());
  }
});