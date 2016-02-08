/**
 * Created by xiaoxiaosu on 2016/2/1.
 */

var React = require("react"),
    ReactDOM = require("react-dom"),
    _ = require("underscore"),
    $ = require("jquery");

var User = React.createClass({

    getInitialState:function(){

        djangoData.friend = djangoData.friend.map(function(obj){
            obj.message = [{text:"nice to meet you , "+djangoData.user.name,type:"send"},{text:"nice to meet you too ,"+obj.name,type:"receive"}];
            obj.unread = 0;
            obj.type = 'user';
            return obj
        });

        return {
            users:djangoData.friend
        }
    },

    get:function(i){
        return _.find(this.state.users,function(obj){
            return obj.id == i
        })
    },

    render:function(){
        var that = this;
        var nodes = this.state.users.map(function(g){
            return (
                <p  onClick={that.pick.bind(that,g.id)} ref={'user-item-'+g.id} key={'user-item-'+g.id}><i className="fa fa-user"></i>&nbsp;{g.name}</p>
            )
        });

        return (
            <div className="user">
                {nodes}
                <div className="fa fa-plus-circle fa-2x add-group"></div>
            </div>
        )
    },

    pick:function(i){
        if(this.picked){
            this.picked.removeClass("active");
        }
        this.picked = $(ReactDOM.findDOMNode(this.refs['user-item-'+i]) ).addClass("active");


        var that = this;

        that.dbclick = that.dbclick ? that.dbclick : 0;

        that.dbclick++;
        setTimeout(function(){
            that.dbclick=0
        },500);
        if(that.dbclick==2){
            root.event.trigger("add-dialog",that.get(i));
            root.event.trigger("add-recent",that.get(i))
        }
    },

    getMessage:function(mes){
        var users = this.state.users.map(function(user){
            var friend = _.find(mes,function(f){
                return f.id == user.id && f.type == user.type
            });
            if(friend){
                user.message = user.message.concat(friend.message);
                user.unread = user.unread + user.message.length;
            }

            return user
        });
        root.event.trigger("dialog-receive-data",users)
        this.setState({
            users:users
        })
    },

    passData:function(){

    },

    componentDidMount:function(){

    }
});


module .exports = User;