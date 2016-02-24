/**
 * Created by xiaoxiaosu on 2016/2/20.
 */
    require("./search-panel.less");
    require("components-common/button.less")
var React = require("react"),
    ReactDOM = require("react-dom"),
    _ = require("underscore"),
    $ = require("jquery");

var SearchPanel = React.createClass({
    getInitialState:function(){
        return {
            display:"none",
            member:[],
            group:[]
        }
    },
    render:function(){
        var that = this

        var friendNode = this.state.member.map(function(m,i){
            return (
                <MemberItem name={m.name} id={m.id} logo={m.logo} isFriend={m.isFriend} key={"member-"+m.id}/>
            )
        })

        var groupNode = this.state.group.map(function(g){
            return (
                <li>{g.name}</li>
            )
        })
        return (
            <div className="search-panel" style={{display:that.state.display}}>
                <h3>搜索好友</h3>
                <i className="fa fa-close close fa-2x" onClick={that.hide}></i>
                <div className="search-input">
                    <input className="inp"/>
                    <button className="btn btn-info">搜索</button>
                </div>
                <div className="search-content">
                    <div className="search-friend">
                        <h3>好友</h3>
                        <ul>{friendNode}</ul>
                    </div>
                    <div className="search-group">
                        <h3>群</h3>
                        <ul>{groupNode}</ul>
                    </div>
                </div>
            </div>
        )
    },
    show:function(){
        this.setState({
            display:"block"
        })


        if(!this.state.member.length){
            var that = this
            $.ajax({
                url:root.baseURL+"/get_member/",
                dataType:"json",
                success:function(response){
                    response = response.map(function(obj){
                        obj.isFriend = root.userMessage.get('user-'+obj.id) ? 1 : 0
                        return obj
                    })
                    that.setState({
                        member:response
                    })
                }
            })
        }
    },
    hide:function(){
        this.setState({
            display:"none"
        })
    }
})

var MemberItem = React.createClass({
    getInitialState:function(){
        return {
            text:this.props.isFriend?"已是好友":"发送请求"
        }
    },
    render:function(){
        return (
            <li>
                <i style={{backgroundImage:'url('+root.baseURL+this.props.logo+')'}}></i>
                <span>{this.props.name}</span>
                <button className="btn btn-default" onClick={this.handleClick}>{this.state.text}</button>
            </li>
        )
    },
    componentWillReceiveProps:function(nextProps){
        //if(nextProps.isFriend){
        //    this.setState({
        //        text:"已是好友"
        //    })
        //}else{
        //    this.setState({
        //        text:"被拒绝，点击再次添加"
        //    })
        //}
    },
    handleClick:function(){
        if(this.props.isFriend){
            root.to.set('id',"user-"+this.props.id)
        }else{
            var that = this,
            data={
                from_name:root.from.get("name"),
                from_id:root.from.get("id"),
                to_name:that.props.name,
                to_id:that.props.id,
                type:"user"
            };
            data[root.csrfKey] = root.csrfValue
            $.ajax({
                url:root.baseURL+"/send_add/",
                type:"POST",
                data:data,
                success:function(response){
                    that.setState({
                        text:"已发送"
                    })
                }
            })
        }
    }
})

module.exports = SearchPanel