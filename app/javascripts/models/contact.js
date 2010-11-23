//= require <supermodel>
//= require <supermodel.filter>

var Contact = SuperModel.setup("Contact");

Contact.attributes = ["first_name", "last_name", "email",
                      "mobile", "work", "address", "notes"];
                      
Contact.include(SuperModel.GUID);
                      
Contact.include(SuperModel.Filter);
Contact.filter_attributes = ["first_name", "last_name", "email", "mobile", "work"];

// Dynamically loaded
Contact.attributes = Contact.attributes.concat([
  "avatar_src", "linkedin_url", "facebook_url", 
  "twitter_url", "jabber", "skype", "loaded"
]);
                          
Contact.include({
  fullName: function(){
    if ( !this.first_name && !this.last_name ) return;
    return(this.first_name + " " + this.last_name);
  }
});