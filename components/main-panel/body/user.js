/**
 * Created by xiaoxiaosu on 2016/2/1.
 */

var React = require("react"),
    ReactDOM = require("react-dom"),
    _ = require("underscore"),
    $ = require("jquery");

var User = React.createClass({


    get:function(i){
        return _.find(this.state.users,function(obj){
            return obj.id == i
        })
    },


    render:function(){
        var that = this;
        var nodes = this.props.user.map(function(g){
            return (
                <p  className={g.active} onClick={that.pick.bind(that,g.id)} ref={'user-item-'+g.id} key={'user-item-'+g.id}>
                    <i style={{backgroundImage:'url('+root.baseURL+g.logo+')'}}></i>&nbsp;
                    <span>{g.name}</span>&nbsp;&nbsp;
                    <label>{g.intro}</label>
                </p>
            )
        });

        return (
            <div className="user">
                {nodes}
                <div className="fa fa-plus-circle fa-2x add-group"></div>
            </div>
        )
    },

    pick:function(id){
        var that = this;

        that.dbclick = that.dbclick ? that.dbclick : 0;

        that.dbclick++;
        setTimeout(function(){
            that.dbclick=0
        },500);
        if(that.dbclick==2){
            var model = root.userMessage.get(id)
            root.to.set(model.toJSON())
        }
    },


    componentDidMount:function(){
        _.extend(this,Backbone.Events)
        var that = this
        this.listenTo(root.userMessage,'change',function(m){
            console.log('user.js liston list change')
        })
    }
});


module .exports = User;