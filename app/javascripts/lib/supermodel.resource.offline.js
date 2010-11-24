// Offline support
// Resource.Scribe = SuperModel.setup("Scribe");
// Resource.Scribe.attributes = ["path", "method", "params"];
// Resource.Scribe.extend(SuperModel.Marshal);
//   
// // TODO
// Resource.offline = false;
// 
// Resource.extend({
//   klasses: [],
//   
//   reset: function(){
//     for (var i=0; i < this.klasses.length; i++)
//       this.klasses[i].deleteAll();
//   }
// });
// 
// Resource.Model = {
//   record: function(method, args){
//     var options = {};
//     options.args   = args;
//     options.klass  = base.className;
//     options.method = method;
//     SuperSync.record(options);
//   },
// 
//   extended: function(base){
//     SuperSync.klasses.push(base);
// 
//     base.afterCreate(function(rec){
//       base.record("create", rec.attributes());
//     });
// 
//     base.afterUpdate(function(rec){
//       var changes   = rec.previousChanges;
//       var changedTo = {};
//       for (var key in changes)
//         changedTo[key] = changes[key][1];
// 
//       base.record("update", [rec.id, changedTo]);
//     });
// 
//     base.afterDestroy(function(rec){
//       base.record("destroy", [rec.id]);
//     });
//   }
// };