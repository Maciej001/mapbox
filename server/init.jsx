Meteor.startup(function(){
  MAP_ACCESS_TOKEN =  Meteor.settings.private.MAP_ACCESS_TOKEN;
  MAP_ID =            Meteor.settings.private.MAP_ID;
  TFL_APP_KEY =       Meteor.settings.private.TFL_APP_KEY;
  TFL_APP_ID =        Meteor.settings.private.TFL_APP_ID;
});  