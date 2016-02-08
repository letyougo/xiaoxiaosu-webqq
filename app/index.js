/**
 * Created by xiaoxiaosu on 2016/1/31.
 */

    require("./index.less");
var React = require("react"),
    $ = require("jquery"),
    _ = require("underscore"),
    Backbone = require("backbone"),
    ReactDOM = require("react-dom");


userMessage = djangoData.friend.map(function(obj){
    obj.message = []
    obj.unread = 0
    obj.type = 'user'
    return obj
})
groupMessage = djangoData.group.map(function(obj){
    obj.message = []
    obj.unread = 0
    obj.type = 'group'
    return obj
})
window.root={
    event : _.extend({},Backbone.Events),
    userMessage : new Backbone.Collection
}

var Message = Backbone.Model.extend({

    defaults :{
        message : [],
        unread : 0
    }
})






var Dialog = require("components/dialog/dialog.js");

var MainPanel = require("components/main-panel/main-panel.js");





ReactDOM.render(
    <div className="app">
        <MainPanel/>
        <Dialog/>
    </div>,document.getElementById("root"));
