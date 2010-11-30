(function($){
  var selectedText = function(){
    if (document.selection) {
      return document.selection.createRange().text;
    } else {
      return document.getSelection().toString();
    }
  };
  
  var selectTest = function(){
    if (selectedText().length == 0) {
      alert("Select some text first.");
      throw "No selection";
    }
  };
  
  $.fn.exec = function(type, arg){    
    document.execCommand(type, false, arg || null);
    return this;
  };
  
  $.fn.wysiwyg = function(){
    var element = $(this);
    element.attr("contentEditable", true);
    
    var bold = function(){
      element.exec("bold");
    };

    var italic = function(){
      element.exec("italic");
    };

    var list = function(){
      element.exec("insertUnorderedList");
    };

    var link = function(){
      selectTest();
      
      element.exec("unlink");
      var href = prompt("Enter a link:", "http://");
      if ( !href || href == "http://" ) return;
      if ( !(/:\/\//).test(href) ) href = "http://" + href;
      element.exec("createLink", href);
    };
    
    var val = function(){
      return element.html();
    };
    
    return({
      bold:   bold,
      italic: italic,
      list:   list,
      link:   link,
      val:    val
    });
  };
})(jQuery);