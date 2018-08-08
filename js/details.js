//layui全局变量
var form = layui.form
,layer = layui.layer
,layedit = layui.layedit
,element = layui.element,
laypage = layui.laypage
var url = 'https://api.douban.com';

//获取当前图书id
var myId = document.location.href;//获取浏览器链接
var index=myId.lastIndexOf("\?");
    myId=myId.substring(index+1,myId.length);

//获取图书信息
$.ajax({
		url:url+'/v2/book/'+myId,
		type:'get',
		dataType:'jsonp',		
		success:function(data){

			$(".index-right").html("");
			$(".index-left").html("");
			$(".details-title").html("");
			
		var detailstop1 = '<h1>'+data.title+'<span>'+data.author+' &nbsp;著</span></h1>';
		var tages='';
		for(var i=0;i<data.tags.length;i++){
			tages = tages+"<span>"+data.tags[i].name+"</span>";
		}
		var detailstop2='<div class="index-tags">'+tages+'</div>'
		var detailstop3 = '<p class="details-p"><span>售价：<strong>'+data.price+'</strong></span><span>总页数：<strong>'+data.pages+'</strong></span></p><p class="details-p"><span>出版社：'+data.publisher+'</span><span>出版日期：'+data.pubdate+'</span></p><p class="details-summary">'+data.summary+'</p>';
			$(".index-right").append(detailstop1);		
			$(".index-right").append(detailstop2);
			$(".index-right").append(detailstop3);
            $(".index-left").append("<img src='"+data.image+"'>");	
            $(".details-title").append(" <p>作者："+data.author+"</p><p>作者简介："+data.author_intro+"</p><p>翻译："+data.translator+"</p><p>摘要："+data.summary+"</p>");		
		}
})


//获取图书笔记
$.ajax({
	url:url+'/v2/book/'+myId+'/annotations',
	type:'get',
	dataType:'jsonp',
	success:function(data){
		$(".details-biji").html("");
		for(var i=0;i<data.count;i++){
			var biji = '<li><p class="biji-title">章节：'+data.annotations[i].chapter+'<span>第'+data.annotations[i].page_no+'页</span><span>时间：'+data.annotations[i].time+'</span></p><p class="biji-abstract">'+data.annotations[i].content+'</p><div class="biji-cz"><a href="javascript:;" title="修改" onclick="editbiji('+i+','+data.annotations[i].book_id+')">修改</a><a href="javascript:;" onclick="delbiji(this,'+data.annotations[i].id+')" title="删除">删除</a></div></li>';
			$(".details-biji").append(biji);
		}
	}
})

//写笔记
form.on('submit(addBiji)', function(data){
	var mypost = JSON.parse(JSON.stringify(data.field));
	$.ajax({
		url:url+'/v2/book/'+myId+'/annotations',
		type:'post',
		data:mypost,
		dataType:'jsonp',		
		success:function(data){
			layer.msg('新增笔记成功', {icon: 1});
			setTimeout(function(){				
			   window.location.reload();
			},500) 			
		}
	})
})

//修改笔记弹框
function editbiji(id,bookid){
	layer.open({
		type: 2,
		shadeClose: true, //点击遮罩关闭
		skin: 'layui-layer-lan', //样式类名
		closeBtn: 1, //不显示关闭按钮
		area: ['1200px', '400px'],
		anim: 2,
		title: ['修改笔记', 'font-size:18px;'],
		content: 'biji_edit.html?id='+id+'&bookid='+bookid,
	})
}

//删除笔记弹框
function delbiji(q,id){
	layer.confirm('确定删除？', {icon: 3, title:'提示'}
	,function(){
		$(q).parents("li").remove();
		$.ajax({
			url:url+'/v2/book/annotation/'+id,
			type:'DELETE',
			dataType:'jsonp',		
			success:function(data){
				 layer.msg('删除成功', {icon: 1});			
			}
        })	     
	}
   , function(index){  
	 layer.close(index);
   });
}
