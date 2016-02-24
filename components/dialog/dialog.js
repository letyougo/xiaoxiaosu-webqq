/**
 * Created by xiaoxiaosu on 2016/2/3.
 */
require("./dialog.less");
var React = require("react"),
    ReactDOM = require("react-dom"),
    _ = require("underscore"),
    Backbone = require("backbone"),
    $ = require("jquery");

var Dialog = React.createClass({

    getInitialState:function(){
        return {
            display:"none",
        }
    },

    render: function () {
        var that = this;
        return (
            <div className="dialog" style={{display:that.state.display}}>
                <DialogList ref='list' set={that.set}/>
                <DialogBox ref='box'/>
            </div>
        )
    },

    componentDidMount:function(){
        _.extend(this,Backbone.Events)

        var that = this

        this.listenTo(root.dialogList,'add remove',function(model){
            if(root.dialogList.length>0){
                that.setState({
                    display:"block"
                })
            }else{
                that.setState({
                    display:"none"
                })
            }
        })
    }
});


var DialogList = React.createClass({
    getInitialState:function(){
        return {
            items:root.dialogList.toJSON()
        }
    },

    render:function(){
        var that = this
        var nodes = this.state.items.map(function(item,i){
            return (
                <DialogItem
                    name={item.name}
                    id={item.id}
                    type={item.type}
                    message={item.message}
                    key={'item'+i}
                    ref={'item-'+item.type+"-"+item.id}
                    active={item.active}
                    logo={item.logo}
                    />
            )
        });
        return (
            <ul className="dialog-list">{nodes}</ul>
        )
    },

    componentDidMount:function(){
        _.extend(this,Backbone.Events)

        var that = this
        this.listenTo(root.dialogList,'add remove change reset',function(){
            that.setState({
                items:root.dialogList.toJSON()
            })
        })
    }
});

var DialogItem = React.createClass({

    render:function(){
        var that=this
        return (
            <li className={"dialog-item "+that.props.active} onClick={that.set}>
                <i style={{backgroundImage:'url('+root.baseURL+that.props.logo+')'}}></i>&nbsp;&nbsp;
                {this.props.name}
                <span className="fa fa-close close"></span>
            </li>
        )
    },

    set:function(e){
        var type = this.props.type,
            id = this.props.id;

        var model = root[type+"Message"].get(id);
        root.to.set(model.toJSON())

    }
});

var DialogBox = React.createClass({
    getInitialState:function(){
        return {
            to:root.to.toJSON()
        }
    },

    render:function(){
        var that = this;

        return (
            <div className="dialog-box">
                <Message message={that.state.to.message}/>
                <div className="dialog-textarea">
                    <textarea onKeyDown={this.keyDown} ref='area'></textarea>
                </div>
            </div>
        )
    },

     keyDown:function(e){
        var that=this

        if(e.which == 13){

            var data = {
                from_name:root.from.get("name"),
                from_id : root.from.get("id"),
                to_name:root.to.get("name"),
                to_id:root.to.get("_id"),
                type:root.to.get("type"),
                key:root.to.get("id"),
                logo:root.from.get("logo"),
                text:ReactDOM.findDOMNode(this.refs['area']).value.trim()
            }
            data[root.csrfKey] = root.csrfValue


            $.ajax({
                url:root.baseURL+"/send_message/",
                data:data,
                type:"POST",
                dataType:"json",
                success:function(response){
                    root[root.to.get('type')+'Message'].receiveMessage([{
                        text:ReactDOM.findDOMNode(that.refs['area']).value.trim(),
                        messageType:'send',
                        name:root.from.get("name"),
                        logo:root.from.get("logo"),
                        to_id:root.to.get("id")
                    }])
                    ReactDOM.findDOMNode(that.refs.area).value=""
                }
            })
        }
    },

    componentDidMount:function(){
        _.extend(this,Backbone.Events)

        var that = this
        this.listenTo(root.to,'change',function(){
            that.setState({
                to:root.to.toJSON()
            })
        })
    }
});
var Message = React.createClass({
    render:function(){
        var nodes = this.props.message.map(function(m,i){
            return (
                <p key={'message-'+i} className={'message-item-'+m.messageType}>
                     <i style={{backgroundImage:'url('+root.baseURL+m.logo+')'}}></i>&nbsp;&nbsp;
                    <span>{m.text}</span>
                </p>
            )
        });

        return (
            <div className="dialog-message-list">
                {nodes}
            </div>
        )
    }
})
module.exports=Dialog;