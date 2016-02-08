var React = require("react"),
    ReactDOM = require("react-dom"),
    _ = require("underscore"),
    $ = require("jquery");

var Group = React.createClass({
    getInitialState:function(){
        return {
            group:this.props.items.toJSON()
        }
    },

    get:function(i){
        return _.find(this.state.group,function(obj){
            return obj.id == i
        })
    },

    render:function(){
        var that = this
        var nodes = this.state.group.map(function(g){
            return (
                <p onClick={that.pick.bind(that,g.id)} ref={'user-item-'+g.id} key={'group-item-'+g.id}><i className="fa fa-group" id={g.id}></i>&nbsp;{g.name}</p>
            )
        })

        return (
            <div className="user">
                {nodes}
                <div className="fa fa-plus-circle fa-2x add-group"></div>
            </div>
        )
    },
    pick:function(i,e){
        if(this.picked){
            this.picked.removeClass("active")
        }
        this.picked = $(ReactDOM.findDOMNode(this.refs['user-item-'+i]) ).addClass("active")


        var that = this
        that.dbclick = that.dbclick ? that.dbclick : 0
        that.dbclick++
        setTimeout(function(){
            that.dbclick=0
        },500)
        if(that.dbclick==2){
            root.event.trigger("add-dialog",that.get(i));
            root.event.trigger("add-recent",that.get(i));
        }
    },

    getMessage:function(mes){
        var group = this.state.group.map(function(g){
            var friend = _.find(mes,function(f){;
                return f.id == g.id && f.type == g.id
            });

            if(friend){
                g.message = g.message.concat(friend.message);
                g.unread = g.message.length
            }

            return group
        });
        this.setState({
            group:group
        })
    },
    componentDidMount:function(){
        _.extend(this,Backbone.Events)

        var that = this
        this.listenTo(root.groupMessage,'change',function(m){
            console.log('change')
            var c = root.groupMessage.toJSON()
            that.setState({
                group:c
            })
        })
    }

})

module .exports = Group