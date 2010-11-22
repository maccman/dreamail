//= require <superlist>

(function($){

var state = App.state.add("contacts");
state.hasView = true;

state.setup(function(){
  this.slist = this.list.superlist(Contact);
  
  this.search.bind("keyup click", this.proxy(function(){
    this.slist.filter(this.search.val());
  }));
  
  this.slist.change(this.proxy(function(item){
    this.app.change("contacts", item);
  }));
  
  this.binder = this.selected.connect(Contact, {singleton: true});
  
  this.slist.render();
  
  // this.butDelete.click(this.proxy(function(){
  //   $.confirm("Are you sure you want to delete this contact?", this.proxy(function(){
  //     this.current.destroy();
  //   }));
  // }));
  
  this.butVCard.click(this.proxy(function(){
    // TODO
    console.log('vcard');
  }));
  
  this.butEmail.click(this.proxy(function(){
    // TODO
    console.log('email ' + this.current.email);
  }));
  
  this.butNew.click(this.proxy(function(){
    // TODO
    console.log('new ')
  }));
});

state.beforeEnter(function(current){
  if ( !current ) return;
  
  this.current = current;  
  this.slist.setItem(this.current);
  this.binder.setItem(this.current);
});

state.afterEnter(function(){
  this.slist.focus();
});

state.beforeExit(function(){
  this.slist.unfocus();
});

})(jQuery);