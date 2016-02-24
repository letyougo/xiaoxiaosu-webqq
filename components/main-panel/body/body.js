/**
 * Created by xiaoxiaosu on 2016/2/1.
 */
require("./body.less");
var React = require("react"),
    ReactDOM = require("react-dom"),
    $ = require("jquery");
    _ = require("underscore");

var User = require("./user.js"),
    Group = require("./group.js"),
    Recent = require("./recent.js");


var Search = React.createClass({
    render:function(){
        return (
            <div className="search">
                <input className="input input-group" placeholder="搜索人员，群组，最近联系人"/>
                <div className="fa fa-close fa-lg close"></div>
            </div>
        )
    }
});

var MainPanelBody = React.createClass({

    getInitialState:function(){
        return {
            user:root.userMessage.toJSON(),
            group:root.groupMessage.toJSON(),
            recent:root.recent
        }
    },

    render:function(){
        var that = this
        return (
            <div className="main-panel-body">
                <Search/>
                <div className="title">
                    <span className="fa fa-user user" onClick={this.shiftModule.bind(this,0)}></span>
                    <span className="fa fa-group group" onClick={this.shiftModule.bind(this,1)}></span>
                    <span className="fa fa-comment recent" onClick={this.shiftModule.bind(this,2)}></span>
                </div>
                <div className="wrapper">
                    <div className="content" ref="content">
                        <User ref='user' user={that.state.user}/>
                        <Group ref='group' group={that.state.group}/>
                        <Recent ref='recent'/>
                    </div>
                </div>
            </div>
        )
    },

    shiftModule:function(id,e){
        $(ReactDOM.findDOMNode(this.refs['content'])).animate({"left":-id*250+"px"},300)
    },

    load:function(){

    },

    startReceiveServerPush:function(){
        var that = this,
            obj = {};
        obj[root.csrfKey]=root.csrfValue;
        obj.from_id = djangoData.user.id
        $.ajax({
            url:root.baseURL+"/get_message/",
            data:obj,
            type:"POST",
            dataType:"json",
            success:function(response){
                var userMessage=[],
                    groupMessage=[],
                    userRequest=[],
                    groupRequest=[];

                _.each(response,function(r){
                    var obj = _.pick(r,'from_id','from_name','text','type','key','logo')
                    switch (r.pushType) {
                        case 'user-message':
                            //var logo = root.userMessage.get(obj.key).get("logo")
                            userMessage.push(filter(obj));
                            break;

                        case 'group-message':
                            groupMessage.push(filter(obj));
                            break;

                        case 'user-add':
                            userRequest.push(obj);
                            console.log('user add request')
                            console.log(userRequest)
                            root.userAddRequest.add(obj)
                            console.log(obj)
                            break

                        case 'group-add':
                            groupRequest.push(obj)
                    }
                })

                function filter(obj){
                    return {
                        to_id:obj.type+"-"+obj.from_id,
                        text:obj.text,
                        name:obj.from_name,
                        logo:obj.logo,
                        messageType:"receive"
                    }
                }

                root.userMessage.receiveMessage(userMessage);
                root.groupMessage.receiveMessage(groupMessage);

                that.startReceiveServerPush()
            },
        })
    },
    componentDidMount:function(){
        _.extend(this,Backbone.Events)

        var that = this
        this.listenTo(root.userMessage,'change',function(){
            this.setState({
                user:root.userMessage.toJSON()
            })
        })
        this.listenTo(root.groupMessage,'change',function(){
            this.setState({
                group:root.groupMessage.toJSON()
            })
        })

        this.startReceiveServerPush()
    }
});

module .exports=MainPanelBody