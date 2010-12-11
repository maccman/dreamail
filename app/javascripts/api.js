var api = {};

api.change = function(){
  App.state.change.apply(App.state, arguments);
};

api.renderEmail = function(callback){
  App.state.find("conversations").emails.renderItem(callback);
};

api.renderAttachment = function(callback){
  // TODO
};

api.load = function(callback){
  App.on("loaded", callback);
};