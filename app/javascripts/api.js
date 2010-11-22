var api = {};

api.change = App.state.change;

api.renderEmail = function(callback){
  App.state.find("conversations").emails.renderItem(callback);
};