var React = require("react"),
    ReactDOM = require("react-dom"),
    _ = require("underscore"),
    $ = require("jquery");

var Group = React.createClass({


    render:function(){
        var that = this
        var nodes = this.props.group.map(function(g){
            return (
                <p className={g.active} onClick={that.pick.bind(that,g.id)} ref={'user-item-'+g.id} key={'group-item-'+g.id}><i className="fa fa-group" id={g.id}></i>&nbsp;{g.name}</p>
            )
        })

        return (
            <div className="user">
                {nodes}
                <div className="fa fa-plus-circle fa-2x add-group"></div>
            </div>
        )
    },
    pick:function(id,e){



        var that = this
        that.dbclick = that.dbclick ? that.dbclick : 0
        that.dbclick++
        setTimeout(function(){
            that.dbclick=0
        },500)
        if(that.dbclick==2) {
            var model = root.groupMessage.get(id)
            root.to.set(model.toJSON())
        }

    },

    componentDidMount:function(){
        _.extend(this,Backbone.Events)

        var that = this
        this.listenTo(root.groupMessage,'change',function(m){
            console.log('group.js liston to c change')
        })
    }

})

module .exports = Group