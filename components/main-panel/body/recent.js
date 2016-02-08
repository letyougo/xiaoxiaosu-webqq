/**
 * Created by xiaoxiaosu on 2016/2/1.
 */

var React = require("react"),
    ReactDOM = require("react-dom"),
    $ = require("jquery");
var Recent = React.createClass({

    getInitialState:function(){
        return {
            items:[]
        }
    },

    render:function(){
        var that = this

        console.log(this.state.items)
        var nodes = this.state.items.map(function(item){
            return (
                <p>
                    <i className="fa fa-user" />
                    &nbsp;
                    {item.name}
                </p>
            )
        });

        return (
            <div className="recent">
                {nodes}
            </div>
        )
    },
    handleClick:function(){
        root.event.trigger({type:this.props.type,id:this.props.id,message:this.props.message})
    },
    componentDidMount:function(){
        _.extend(this,Backbone.Events)

        var that = this
        this.listenTo(root.event,'add-recent',function(obj){
            console.log(obj)
            var t = _.find(that.state.items,function(item){
                return obj.type = item.type && obj.id == item.id
            });

            if(!t){
                var items = that.state.items
                items.push(obj)

                that.setState({
                    items:items
                })
            }

        })
    }




})

module .exports = Recent