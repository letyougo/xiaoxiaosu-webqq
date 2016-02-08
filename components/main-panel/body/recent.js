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
                <p
                    onClick={that.handleClick.bind(that,{type:item.type,id:item.id})}
                    ref={item.type+"-item-"+item.id}
                    >
                    <i className="fa fa-user"/>
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
    handleClick:function(obj,e){

        if(this.picked){
            this.picked.removeClass("active");
        }
        this.picked = $(ReactDOM.findDOMNode(this.refs[obj.type+'-item-'+obj.id]) ).addClass("active");


        var that = this;

        that.dbclick = that.dbclick ? that.dbclick : 0;

        that.dbclick++;
        setTimeout(function(){
            that.dbclick=0
        },500);
        if(that.dbclick==2){
            root.event.trigger('add-dialog',{type:obj.type,id:obj.id})
        }

    },
    componentDidMount:function(){
        _.extend(this,Backbone.Events)

        var that = this
        this.listenTo(root.event,'add-recent',function(obj){
            var data,t

            t = _.find(this.state.items,function(item){
                return obj.type == item.type && obj.id == item.id
            })

            if(obj.type == 'user'){
                data = root.userMessage.get(obj.id).toJSON()
            }else{
                data = root.groupMessage.get(obj.id).toJSON()
            }


            if(!t){
                var items = that.state.items
                items.push(data)

                that.setState({
                    items:items
                })
            }

        })
    }




})

module .exports = Recent