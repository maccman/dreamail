//= require <supermodel>

var Attachment = SuperModel.setup("Attachment");

Attachment.attributes = ["name", "size"];

Attachment.include(SuperModel.GUID);
