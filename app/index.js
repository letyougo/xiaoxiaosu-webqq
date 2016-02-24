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
    obj.message = [];
    obj.unread = 0;
    obj._id = obj.id;
    obj.type = 'user'
    obj.id = 'user-'+obj.id;
    obj.active = ""
    return obj;
})

groupMessage = djangoData.group.map(function(obj){
    obj.message = [];
    obj.unread = 0;
    obj._id = obj.id;
    obj.type = 'group';
    obj.id = 'group-'+obj.id;
    obj.active = ""
    return obj
});

var C = Backbone.Collection.extend({
    receiveMessage:function(list){
        var that = this
        _.each(list,function(obj){
            var model = that.get(obj.to_id);
            var initMessage = model.get("message");

            var recMessage = initMessage.concat([{text:obj.text,messageType:obj.messageType,name:obj.name,logo:obj.logo}])

            model.set('message',recMessage)
        })
    }
})


window.root={
    event : _.extend({},Backbone.Events),
    from:new Backbone.Model(djangoData.user),
    to:new Backbone.Model({name:"",id:"",message:[]}),
    userMessage : new C(userMessage),
    groupMessage : new C(groupMessage),
    dialogList : new Backbone.Collection(),
    userAddRequest:new Backbone.Collection([]),
    userAddAccept:new Backbone.Collection([]),
    baseURL:"http://localhost:8000",
    csrfKey :"csrfmiddlewaretoken",
    csrfValue :$('input[name=csrfmiddlewaretoken]').val(),
    basicMixin:{
        getInitialState:function(){
            return {
                display:"none"
            }
        },
        show:function(){
            this.setState({
                display:"block"
            })
        },
        hide:function(){
            this.setState({
                display:"none"
            })
        },
        componentDidMount:function(){
            _.extend(this,Backbone.Events)
        }
    }
}

root.userMessage.on("change",function(model){
    if(model.get("type") != 'user'){
        return
    }
    var id = root.to.get("id");
    var m = this.get(id)
    root.to.set("message",m.get("message"))
})

root.groupMessage.on("change",function(model){
    if(model.get("type") !='group'){
        return
    }
    var id = root.to.get("id"),
        m = this.get(id)
    root.to.set("message",m.get("message"))
})

root.to.on('change',function(){
    var obj = this.toJSON(),
        type = obj.type,
        id = obj.id,
        model_from = root[type+"Message"].get(id),
        model_to = root.dialogList.get(id)
    console.log(model_from.toJSON())
    if(!model_to){
        root.dialogList.add(model_from)
    }
    root.dialogList.each(function(m){
        m.set("active",'')
    })
    model_from.set("active",'active')
})



var Dialog = require("components/dialog/dialog.js"),
    MainPanel = require("components/main-panel/main-panel.js"),
    SearchPanel = require("components/searchPanel/search-panel.js"),
    AddPanel = require("components/add-panel/add-panel.js")

var App = React.createClass({
    render:function(){
        var that = this
        return (
            <div className="app">
                <MainPanel ref='main'/>
                <Dialog ref="dialog"/>
                <SearchPanel ref="search"/>
                <AddPanel ref='add'/>
            </div>
        )
    },
    componentDidMount:function(){
        root.app = this
    },
    show:function(com){
        this.refs[com].show && this.refs[com].show()
    },
    hide:function(com){
        this.refs[com].hide && this.refs[com].hide()
    }

})

var test = Backbone.View.extend({
    initialize:function(){
        var name = "surui"
        this.$el.html(
            <div>hello world</div>
        )
    }
})
var t = new test()
ReactDOM.render(<App/>,document.getElementById("root"));
$("#root").append(t.$el)