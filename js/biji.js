//layui全局变量
var form = layui.form
,layer = layui.layer
,layedit = layui.layedit
,element = layui.element,
laypage = layui.laypage
var url = 'https://api.douban.com';

//获取当前笔记id
var myId2 = document.location.href;//获取浏览器链接
var index=myId2.lastIndexOf("\?");
myId2=myId2.substring(index+1,myId2.length);
var strId = myId2.match(/=(\S*)&/)[1];//笔记id
index = myId2.lastIndexOf("\=");
var bookId =myId2.substring(index+1,myId2.length);//图书id

//修改赋值
	$.ajax({
		url:url+'/v2/book/'+bookId+'/annotations',
		type:'get',
		dataType:'jsonp',
		success:function(data){			
			 $("#chapter").val(data.annotations[strId].chapter);
			 $("#page").val(data.annotations[strId].page_no);
			 $("#content").val(data.annotations[strId].content);
			  twoid = data.annotations[strId].id;
		}
   })
	

//修改笔记点击提交
form.on('submit(editBiji)', function(data){
	var mypost = JSON.parse(JSON.stringify(data.field));
	$.ajax({
		url:url+'/v2/book/annotation/'+twoid,
		type:'PUT',
		data:mypost,
		dataType:'jsonp',	
		success:function(data){
			layer.msg('修改笔记成功', {icon: 1});
            setTimeout(function(){				
			   window.location.reload();
			},500)	
		}
	}) 
})