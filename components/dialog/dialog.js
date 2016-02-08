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
            display:"none"
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

        var that = this
        this.listenTo(root.event,'add-dialog',function(obj){
            that.show();
            var data
            if(obj.type == 'user'){
                data = root.userMessage.get(obj.id).toJSON()
            }else{
                data = root.groupMessage.get(obj.id).toJSON()
            }

            that.refs['list'].set(_.extend(data, {active:"active"}))
            that.refs['box'].setMessage(data.message)

        })
    }
});


var DialogList = React.createClass({
    getInitialState:function(){
        return {
            items:[]
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
                    remove={that.remove}
                    set={that.set}
                    active={item.active}
                    parent={that}
                    />
            )
        });
        return (
            <ul className="dialog-list">{nodes}</ul>
        )
    },

    receive:function(mes){
        var that = this

        this.state.items.map(function(item){
            var obj = _.find(mes,function(m){
                return m.type == item.type && m.id == item.id
            })
            if(obj){
                item.message = item.message.concat(obj.message)
                item.unread = item.unread*1 + 1
            }

            return item
        })
    },

    remove:function(type,id){
        var item = _.find(this.state.items,function(obj){
            return obj.type == type && obj.id == id
        })
        var items = _.without(this.state.items,item)

        this.setState({
            items:items
        })
    },

    set:function(obj,box){
        var item = _.find(this.state.items,function(item){
            return item.id == obj.id && item.type == obj.type
        })

        //新打开的聊天窗口
        if(!item){
            var items =this.state.items.map(function(obj){
                obj.active=" "
                return obj
            })
            items.unshift(_.extend(obj,{"active":"active"}))

            //已经打开了窗口，从该窗口切换回去
        }else{
            var items =this.state.items.map(function(item){
                if(item.type == obj.type && item.id == obj.id){
                    item.active="active"
                }else{
                    item.active=" "
                }
                return item
            })
            this.pickedItem = this.refs['item-'+obj.type+"-"+obj.id]
        }

        this.setState({
            items:items
        })
    },

    componentDidMount:function(){
        _.extend(this,Backbone.Events)

        var that = this
        this.listenTo(root.event,'receive-data',function(list){
            var items = that.state.items.map(function(item){
                var l =  _.find(list,function(obj){
                    return item.type == obj.type && item.id == obj.id
                })
                if(l){
                    item.message = item.message.concat(l.message)
                }

                return l
            })
            that.setState({
                items : items
            })
        })
    }
});

var DialogItem = React.createClass({

    render:function(){
        var that=this
        return (
            <li className={"dialog-item "+that.props.active} onClick={that.set}>
                {this.props.name}
                <span className="fa fa-close close"></span>
            </li>
        )
    },

    getName:function(){
        return this.props.name
    },
    componentDidMount:function(){
        this.props.parent.pickedItem=this
    },
    set:function(e){

        var target = ReactDOM.findDOMNode(e.target).tagName.toLowerCase()

        if(target == 'li') {
            root.event.trigger("add-dialog", {type:this.props.type,id:this.props.id})
        }
        if(target == 'span'){
            this.props.remove(this.props.type,this.props.id)

            var activeItem = _.find(this.props.parent.state.items,function(obj){
                return obj.active == 'active'
            })

            if(activeItem){
                activeItem.id == this.props.id && root.event.trigger('dialog-message-clear')
            }

        }
    }
});

var DialogBox = React.createClass({
    getInitialState:function(){
        return {
            message:[]
        }
    },
    render:function(){
        var that = this

        var nodes = this.state.message.map(function(m){
            return(
                <p>
                    <span>{m.name}</span>
                    <span>{m.text}</span>
                </p>
            )
        })
        return (
            <div className="dialog-box">
                <Message message={that.state.message}/>
                <div className="dialog-textarea">
                    <textarea></textarea>
                </div>
            </div>
        )
    },
    setMessage:function(mes){
        this.setState({
            message:mes
        })
    },
    componentDidMount:function(){
        _.extend(this,Backbone.Events)

        var that = this
        this.listenTo(root.event,'dialog-message-clear',function(){
            that.setMessage([])
        })
    }
});
var Message = React.createClass({
    render:function(){
        var nodes = this.props.message.map(function(m){
            return (
                <p>
                    <span>{m.name}</span>
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