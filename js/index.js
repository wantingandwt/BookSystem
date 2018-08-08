//layui全局变量
var form = layui.form
,layer = layui.layer
,layedit = layui.layedit
,element = layui.element,
laypage = layui.laypage

var url = 'https://api.douban.com';

ajaxda("小王子");//默认发送ajax

//ajax发送封装
function ajaxda(q){
	$.ajax({
		url:url+'/v2/book/search?tag='+q,
		type:'get',
		dataType:'jsonp',		
		success:function(data){
			$(".index-ul").html("");//清空数据
	         pages(data);
		}
	})
}
//选择标签时	
$(".material-ul li a").click(function(){
	var tagsname = $(this).html();
	$(".material-ul li").removeClass("search-this");
	$(this).parent("li").addClass("search-this");
	ajaxda(tagsname);
})

//点击搜索-全部
form.on('submit(indexSearch)', function(data){
	var mypost = JSON.stringify(data.field);//提交的资料
	$(".material-ul li").removeClass("search-this");
	$.ajax({
		url:url+'/v2/book/search?q='+mypost,
		type:'get',
		dataType:'jsonp',		
		success:function(data){
			$(".index-ul").html("");//清空数据
			 pages(data);
		}
	})
	
});

 //调用分页
function pages(data){
	 laypage.render({
		elem: 'pages'
		,count:data.count
		,jump: function(obj){
		  //模拟渲染
		  document.getElementById('book').innerHTML = function(){
			var arr = []
			,thisData = data.books.concat().splice(obj.curr*6 - 6, 6);
			layui.each(thisData, function(index, item){
			  arr.push('<li><a href="index_details.html?'+item.id+'"><img src="'+item.image+'"><h3>'+item.title+'</h3><p>价格：<span>'+item.price+'</span></p><p>作者：'+item.author+'<p>时间：'+item.pubdate
+'</p></a></li>');
			});
			return arr.join('');
		  }();
		}
	  });
}
