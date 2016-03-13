###webqq

##功能
- 实现好友间聊天
- 查找添加好友（开发中了一半）

##实现
- 例:在好友聊天功能中,userMessage= new Backbone.Collection()的集合，然后在react的 各组件内监听改集合的add remove reset事件，在更新组件内state.
- 后端是长链接的原理，具体就是前端用ajax的成功回调继续掉ajax,而后端定义一个queue,每次请求去遍历后端的这个queue,如果没数据就挂起这次请求，有数据就立刻return httpresponse

##序
- 宝宝要写毕业论文了，没时间搞了，敢兴趣的同学联系我qq 313755017