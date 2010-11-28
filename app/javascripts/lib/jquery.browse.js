(function($){
  $.fn.browseElement = function(callback){
    if ( !callback ) throw "Callback required";
    
    var input = $("<input type='file' multiple>");
    
    input.css({
      "position":     "absolute",
			"z-index":      2,
			"cursor":       "pointer",
      "-moz-opacity": "0",
      "filter":       "alpha(opacity: 0)",
      "opacity":      "0"
    });
    
    input.change(function(){
      callback(input[0].files);
    });
    
    input.mouseout(function(){
      input.detach();
    });
    
    var element = $(this);
    
    element.mouseover(function(){
      input.offset(element.offset());
      input.width(element.outerWidth());
      input.height(element.outerHeight());
      $("body").append(input);
    });
  };
})(jQuery);