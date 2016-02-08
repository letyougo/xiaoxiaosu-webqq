/**
 * Created by xiaoxiaosu on 2016/1/31.
 */

    require("./main-panel.less");
var React = require("react"),
    ReactDOM = require("react-dom"),
    $ = require("jquery");


var MainPanelBody = require("./body/body.js");

var MainPanelHead = React.createClass({
    render:function(){
        return (
            <div className="main-panel-head">
                head
            </div>
        )
    },
    componentDidMount:function(){

    }
});





var MainPanelFoot = React.createClass({
    render:function(){
        return (
            <div className="main-panel-foot">
                foot
            </div>
        )
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