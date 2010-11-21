//= require <superconnect>

var SuperList = new SuperClass;
SuperList.include(SuperEvent);

(function($){

SuperList.include({
  init: function(element, klass, options) {
    this.element = $(element);
    this.klass   = klass;
    this.options = options;
    this.keys    = false;
    this.filterQuery = "";
    
    this.binder = this.element.connect(klass, this.options);
    this.binder.filter = this.proxy(this.filterFunc);
    this.bindKeys();
    
    this.element.delegate("*", "click", this.proxy(function(e){
      this.change($(e.target).item());
    }));
    
    this.binder.on("render", this.proxy(function(){
      // Select first item if nothing else is selected
      if (this.current().length == 0) {
        var item = this.element.find(">*:first").item()
        this.change(item);
      }
    }));
    
    this.change(this.proxy(function(item){
      this.current(item);
    }));
  },
  
  focus: function(){
    this.keys = true;
  },
  
  unfocus: function(){
    this.keys = false;
  },
  
  render: function(){
    this.binder.render();
  },
  
  filter: function(query){
    if (this.filterQuery == query) return;
    this.filterQuery = query;
    this.render();
  },
  
  current: function(item){
    if (item) {
      this.element.children().removeClass("current");
      this.element.findItem(item).addClass("current");
      // TODO - scroll to element
    }
    return(this.element.find(".current"));
  },
  
  prev: function(){
    var item = this.current().prev().item();
    if ( !item ) return;
    this.change(item);
  },
  
  next: function(){
    var item = this.current().next().item();
    if ( !item ) return;
    this.change(item);
  },
  
  // Private
  
  filterFunc: function(item){
    if ( !this.filterQuery || this.filterQuery == "")
      return true;
    return item.filter(this.filterQuery);
  },
  
  bindKeys: function(){
    $("body").keydown(this.proxy(function(e){
      if ( !this.keys ) return;
      this.element.focus();
      switch (e.which) {
        case 38: // Up
        this.prev();
        break;
        case 40: // Down
        this.next();
        break;
      }
    }));
  }
});

SuperList.fn.setupEvents("change");

$.fn.superlist = function(klass, options){
  return(new SuperList(this, klass, options));
};

})(jQuery);