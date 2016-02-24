/**
 * Created by xiaoxiaosu on 2016/1/31.
 */

    require("./main-panel.less");
var React = require("react"),
    ReactDOM = require("react-dom"),
    $ = require("jquery");


var MainPanelBody = require("./body/body.js");

var MainPanelHead = React.createClass({
    getInitialState:function(){
        return {
            logo: root.from.get("logo"),
            name:root.from.get("name"),
            intro: root.from.get("intro")
        }
    },
    render:function(){
        var that = this
        return (
            <div className="main-panel-head">
                <i style={{backgroundImage:'url('+root.baseURL+that.state.logo+')'}}></i>&nbsp;
                <p>
                    <span>{that.state.name}</span><br/>
                    <label>{that.state.intro}</label>
                </p>


            </div>
        )
    },
    componentDidMount:function(){
        _.extend(this,Backbone.Events)

        var that = this
        this.listenTo(root.from,'change',function(){
            that.setState({
                logo: root.from.get("logo"),
                name:root.from.get("name"),
                introduce: root.from.get("intro")
            })
        })
    }
});





var MainPanelFoot = React.createClass({
    render:function(){
        var that = this
        return (
            <div className="main-panel-foot">
                <i className="fa fa-search btn btn-default" onClick={that.handleClick.bind(that,'search')}></i>
                <i className="fa fa-bell btn btn-default" onClick={that.handleClick.bind(that,'add')}></i>
            </div>
        )
    },
    handleClick:function(name){
        root.app.show(name)
    }
});

var MainPanel = React.createClass({
    render:function(){
        return (
            <div className="main-panel">
                <MainPanelHead/>
                <MainPanelBody/>
                <MainPanelFoot/>
            </div>
        )
    },
    mouseDown:function(e){

    },
    componentDidMount:function(){
        this.init()
    },
    init:function(){

    }
});

module .exports=MainPanel;