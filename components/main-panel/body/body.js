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
})







var MainPanelBody = React.createClass({
    render:function(){
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
                        <User ref='user' items={root.userMessage}/>
                        <Group ref='group' items={root.groupMessage}/>
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
    componentDidMount:function(){
        //this.startReceiveServerPush()
    },
    startReceiveServerPush:function(){
        var that = this
        $.ajax({
            url:"",
            success:function(response){
                var userMessage=[],
                    groupMessage=[],
                    usrRequest=[],
                    groupRequest=[];

                _.each(response,function(r){
                    var obj = _.without(r,r.type)
                    switch (r.type) {
                        case 'user-message':
                            userMessage.push(obj);
                            break;

                        case 'group-message':
                            groupMessage.push(obj);
                            break;

                        case 'user-request':
                            usrRequest.push(obj);
                            break

                        case 'group-request':
                            groupRequest.push(obj)
                    }
                })

                that.refs['user'].getMessage(userMessage)
                that.refs['group'].getMessage(groupMessage)
            },
        })
    }
});

module .exports=MainPanelBody