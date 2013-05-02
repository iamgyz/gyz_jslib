/*
* gyz javascript librayr 1.0
* Copyright 2013 GYZ .
*
*/

/* Function
*gyz.talk('msg')
*gyz.feedback('msg','defaultValue')
* gyz.id('id')  //可以cascading
* gyz.tag('tag')
* gyz.html('str') || gyz.id('id').html('str') 如果要append 前方加<aft>  before 前方加<bef>
* gyz.value('str') || gyz.id('id').value('str');
* gyz.goto(url)
* gyz.toInt('str')
* gyz.title('str')
* gyz.events('str',function)|| gyz.id('id').events('click',function(){alert('ok')});
*gyz.img('url')||gyz.id().img()
*gyz.insert(dom_obj).after(dom_obj)
*gyz.youtube(url,width,height)
*/

//建立GYZ的類別
function GYZ()
{
this.obj=null;//obj負責存取目前的物件											
this.aobj=new Array();//aobj負責存取目前的陣列物件
this.type=null; // type紀錄目前是By id or By tag
this.tmp=null;//紀錄temp的資料
}
//	以下皆為GYZ的方法

GYZ.prototype.talk=function(msg)
			{	
				if(msg)
					alert(msg);
				else
					console.log('No msg!');
			};

GYZ.prototype.feedback=function(msg,defaultValue)
			{	
				if(defaultValue)
					prompt(msg,defaultValue);
				else if(msg)
					prompt(msg);
				else
					console.log('No msg!');
			};							
			
GYZ.prototype.id=function (idName)
			{
				var o=document.getElementById(idName);							
				if(o)
				{
					this.type='id';
					this.obj=o; // 將目前的obj設定成被取得的DOM								
					return this;// !!重要 return this才能cascading
				}
				else
					console.log("No element");						
			};
			
GYZ.prototype.tag=function (tagName)
			{
				var o=document.getElementsByTagName(tagName);							
				if(o)
				{
					this.type='tag';
					this.aobj=o;
					return this;// !!重要 return this才能cascading
				}
				else
					console.log("No tags");						
			};
			
GYZ.prototype.html=function(str)
			{
				if(typeof str==="undefined")
					//console.log("Fail : Not str");
					return this.obj.innerHTML;
				else if(this.type=='id')//如果上一個抓的是id
				{
					if(str.length>2 && str.substr(0,2)=='+=')
						this.obj.innerHTML+=str.substr(3,str.length);
					else if(str.length>2 && str.substr(str.length-2)=='+=')
						this.obj.innerHTML=str.substr(0,str.length-2)+this.obj.innerHTML;
					else this.obj.innerHTML=str;
				}
				else if(this.type=='tag')
				{
				//目前tags的作法是無法指定，只能全部改
					for(var i=0;i<this.aobj.length;i++)
					{
						if(str.length>2 && str.substr(0,2)=='+=')
							this.aobj[i].innerHTML+=str.substr(3,str.length);//如果上一個抓的是tag
						else if(str.length>2 && str.substr(str.length-2)=='+=')
							this.aobj[i].innerHTML=str.substr(0,str.length-2)+this.aobj[i].innerHTML;//如果上一個抓的是tag
						else  this.aobj[i].innerHTML=str;//如果上一個抓的是tag
					}
				}
				else
				console.log("Fail : Not obj");
			}	;			


GYZ.prototype.value=function(str)
			{
				if(!str)
					console.log("Fail : Not str");
				else if(this.type=='id')//如果上一個抓的是id
				{
					this.obj.value=str;
					
				}
				else if(this.type=='tag')
				{
					for(var i=0;i<this.aobj.length;i++)
					{
						this.aobj[i].value=str;//如果上一個抓的是tag
					}
				}
				else
				console.log("Fail : Not obj");
			};	
//轉site						
GYZ.prototype.goto=function(url)
			{
				if(!url)
					console.log("Fail : gyz.site(url)");	
				else 
					document.location.href=url;
			};

//嘗試將字串轉為數字					
GYZ.prototype.toInt=function(n)
			{
				try
				{
					return parseInt(n);						
				}
				catch(exception)
				{
					return null;
				}
			};
//更改title					
GYZ.prototype.title=function(str)
			{
				if(!str)
					console.log('Fail : no str');
				else 
					document.title=str;
			};


GYZ.prototype.events=function(str,o)
			{
				if(!this.type)//並沒有註冊任何obj時
					console.log('Fail : no obj');
				else if(this.type=='id')
					{
					//註冊事件
					this.obj.addEventListener(str,o, false);
					/* addEventListener 和 removeEventListener 的第三個參數 useCapture 多半傳入 false ，因為傳統式和 IE 式皆不支援 Capture 階段執行函式，為了跨瀏覽器相容
					只好忍痛放棄 Capture 階段執行函式。
					  eventname,function,bubble/capture
					*/
					}
				else if(this.type=='tag')
				{
					for(var i=0;i<this.aobj.length;i++)
					{
					this.aobj[i].addEventListener(str,o, false);	
					}
				}
					
			};

//用途 快速切換圖片內容				
//只能對單個element	
GYZ.prototype.img=function(url)
			{
				if(!url)
					console.log('Fail : no url');
				else if(!this.obj)
					console.log('Fail : no obj');
				else
				{
					this.obj.src=url;
				}						
			};

GYZ.prototype.show=function(bool)
			{
				//沒傳值就視為true
				if(typeof bool == 'undefined' || bool== true)
				{
					if(this.type=='id')
					{	
						this.obj.style.display='block';
					}
					else if(this.type=='tag')
					{
						for(var i=0;i<this.aobj.length;i++)
							{
								this.aobj[i].style.display='block';
							}	
					}
				}	
				else if(bool== false)
					{
						if(this.type=='id')
						{	
							this.obj.style.display='none';
						}
						else if(this.type=='tag')
						{
							for(var i=0;i<this.aobj.length;i++)
								{
									this.aobj[i].style.display='none';
								}	
						}
					}
				};
		
		
//在特定的元素內插入yotube影片
GYZ.prototype.youtube=function(url,width,height)
			{
				//取出ID 演算法可能還要改
				var tmp=url.indexOf("?v=");
				if(tmp==-1)
					tmp=url.indexOf("&v=") ;						
				var tmp2=tmp+3
				url=url.substring(tmp2);
				tmpArr=url.split('&');
				var videoID=tmpArr[0];
				//建立元素
				var ele=document.createElement('object');
				ele.width= (width=='undefined')?width:560;
				ele.height= (height=='undefined')?height:315;
				ele.innerHTML='<embed src="http://www.youtube.com/v/'+videoID+'?version=3&amp;hl=zh_TW&amp;rel=0" type="application/x-shockwave-flash" width="'+width+'" height="'+height+'" allowscriptaccess="always" allowfullscreen="true">';
				//插入指定的位置
				this.obj.appendChild(ele);					
			}
		
GYZ.prototype.insert=function(str)
			{						
				//如果已經是obj
				if(typeof str =='object')
				{
					try{
					this.tmp=str;							
					return this;
					}catch(exception){
					console.log('FAIL : Wrong para');
					}
				}
				//如果是直接插入str!! 南?
				else if(typeof str=='string')
				{
					//...not yet
				}
				else 
					console.log('FAIL : Wrong para');
			};	
		
GYZ.prototype.after=function(o)
			{												
				//check 是一般的DOM元素，還是gyz的this
				if(o.type)//代表是gyz
				{
					if(o.type=='id')
					{								
						this.obj.appendChild(this.tmp);
					}
					else if(o.type=='tag')
					{
					}
				}
				//after後面可能是使用者自訂的DOM元素
				else
				{
					try{
					
					}catch(exception)
					{
					}
				}
			};						
/*
useful event list
https://developer.mozilla.org/en-US/docs/DOM/Mozilla_event_reference?redirectlocale=en-US&redirectslug=Mozilla_event_reference
*/					

var gyz = new GYZ(); //建立gyz物件供使用者操作
var $=gyz;

