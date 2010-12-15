(function($){
  function dragEnter(e) {
    $(this).addClass("dragOver");
    e.preventDefault();
  };
  
  function dragOver(e) {    
    e.originalEvent.dataTransfer.dropEffect = "copy";
    e.preventDefault();
  };
  
  function dragLeave(e) {    
    $(this).removeClass("dragOver");
    e.preventDefault();
  };
      
  $.fn.dropArea = function(){
    $(this).bind("dragenter", dragEnter).
            bind("dragover",  dragOver).
            bind("dragleave", dragLeave);
    return this;
  };
  
  $(function(){
    $(document.body).bind("dragover", function(e){
      e.stopPropagation();
      e.preventDefault();
      return false
    });
  });
})(jQuery);