//= require <jquery>

jQuery.getExtension = function(name){
  return(name.substr(name.lastIndexOf(".")).toLowerCase());
};

jQuery.mime = {
  ".png": "image",
  ".jpg": "image",
  ".gif": "image",
  ".mp3": "audio",
  ".acc": "audio",
  ".doc": "document",
  ".pdf": "document",
  ".csv": "spreadsheet",
  ".xls": "spreadsheet",
  ".zip": "zip",
  ".tar": "zip",
  ".gz":  "zip"
};