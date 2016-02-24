/**
 * Created by xiaoxiaosu on 2016/2/23.
 */
    require("./add-panel.less");
    require("components-common/button.less")
var React = require("react"),
    ReactDOM = require("react-dom"),
    _ = require("underscore"),
    $ = require("jquery");

var AddPanel = React.createClass({
    mixins:[root.basicMixin],
    getInitialState:function(){
        return {
            items:root.userAddRequest.toJSON(),
        }
    },
    render:function(){
        var nodes = this.state.items.map(function(item,i){
            return (
                <AddItem name={item.from_name} key={"additem-"+i} id={item.from_id}/>
            )
        })
        return (
            <div className="add-panel" style={{display:this.state.display}}>
                <h3>添加为好友</h3>
                <i className="fa fa-close fa-2x" onClick={this.hide}></i>
                <ul>
                    {nodes}
                </ul>
            </div>
        )
    },
    componentDidMount:function(){
        var that = this
        this.listenTo(root.userAddAccept,'add change remove reset',function(){
            that.setState({
                items : root.userAddAccept.toJSON()
            })
        })
    }
})

var AddItem = React.createClass({
    render:function(){
        return (
            <li>
                <p>{this.props.name}请求添加为好友</p>
                <button className="btn btn-info">接受</button>
                <button className="btn btn-default">拒绝</button>
            </li>
        )
    }
})

module.exports = AddPanel