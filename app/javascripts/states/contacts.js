//= require <superlist>

(function($){

var state = App.state.add("contacts");
state.hasView = true;

state.showState = function(){
  this.editToolbar.hide();
  this.editView.reload().hide();
  
  this.showToolbar.show();
  this.showView.reload().show();
};

state.editState = function(){
  this.showToolbar.hide();
  this.showView.reload().hide();
  
  this.editToolbar.show();
  this.editView.reload().show();
};

state.setup(function(){
  this.slist = this.list.superlist(Contact, {prepend: true});
  
  this.search.bind("keyup click", this.proxy(function(){
    this.slist.filter(this.search.val());
  }));
  
  this.slist.change(this.proxy(function(item){
    this.app.change("contacts", item);
  }));
  
  this.binder = this.selected.connect(Contact, {singleton: true});
  
  this.slist.render();
  
  this.butDelete.click(this.proxy(function(){
    $.confirm("Are you sure you want to delete this contact?", this.proxy(function(){
      this.current.destroy();
    }));
  }));
  
  this.showView.live("submit", this.proxy(function(){
    this.current.updateAttributes(
      this.editView.reload().serializeForm()
    );
    this.showState();  
    
    return false;
  }));
  
  this.butEdit.click(this.proxy(this.editState));
  
  this.butSave.click(this.proxy(function(){
    this.showView.reload().submit();
  }));
  
  this.butVCard.click(this.proxy(function(){
    // TODO
    console.log('vcard');
  }));
  
  this.butEmail.click(this.proxy(function(){
    // TODO
    console.log('email ' + this.current.email);
  }));
  
  this.butNew.click(this.proxy(function(){
    var contact = Contact.create();
    this.app.change("contacts", contact).editState();
  }));  
});

state.beforeEnter(function(current){  
  if ( !current ) return;
  
  this.current = current;  
  this.slist.setItem(this.current);
  this.binder.setItem(this.current);  
  
  this.showState();
});

state.afterEnter(function(){
  this.slist.focus();
});

state.beforeExit(function(){
  this.slist.unfocus();
});

})(jQuery);