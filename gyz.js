/*
* gyz javascript librayr 1.0
* Copyright 2013 GYZ .
*
*/

/* Function
*gyz.talk('msg')
*gyz.feedback('msg','defaultValue')
* gyz.id('id')  //�i�Hcascading
* gyz.tag('tag')
* gyz.html('str') || gyz.id('id').html('str') �p�G�nappend �e��[<aft>  before �e��[<bef>
* gyz.value('str') || gyz.id('id').value('str');
* gyz.goto(url)
* gyz.toInt('str')
* gyz.title('str')
* gyz.events('str',function)|| gyz.id('id').events('click',function(){alert('ok')});
*gyz.img('url')||gyz.id().img()
*gyz.insert(dom_obj).after(dom_obj)
*gyz.youtube(url,width,height)
*/

//�إ�GYZ�����O
function GYZ()
{
this.obj=null;//obj�t�d�s���ثe������											
this.aobj=new Array();//aobj�t�d�s���ثe���}�C����
this.type=null; // type�����ثe�OBy id or By tag
this.tmp=null;//����temp�����
}
//	�H�U�Ҭ�GYZ����k

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
					this.obj=o; // �N�ثe��obj�]�w���Q���o��DOM								
					return this;// !!���n return this�~��cascading
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
					return this;// !!���n return this�~��cascading
				}
				else
					console.log("No tags");						
			};
			
GYZ.prototype.html=function(str)
			{
				if(typeof str==="undefined")
					//console.log("Fail : Not str");
					return this.obj.innerHTML;
				else if(this.type=='id')//�p�G�W�@�ӧ쪺�Oid
				{
					if(str.length>2 && str.substr(0,2)=='+=')
						this.obj.innerHTML+=str.substr(3,str.length);
					else if(str.length>2 && str.substr(str.length-2)=='+=')
						this.obj.innerHTML=str.substr(0,str.length-2)+this.obj.innerHTML;
					else this.obj.innerHTML=str;
				}
				else if(this.type=='tag')
				{
				//�ثetags���@�k�O�L�k���w�A�u�������
					for(var i=0;i<this.aobj.length;i++)
					{
						if(str.length>2 && str.substr(0,2)=='+=')
							this.aobj[i].innerHTML+=str.substr(3,str.length);//�p�G�W�@�ӧ쪺�Otag
						else if(str.length>2 && str.substr(str.length-2)=='+=')
							this.aobj[i].innerHTML=str.substr(0,str.length-2)+this.aobj[i].innerHTML;//�p�G�W�@�ӧ쪺�Otag
						else  this.aobj[i].innerHTML=str;//�p�G�W�@�ӧ쪺�Otag
					}
				}
				else
				console.log("Fail : Not obj");
			}	;			


GYZ.prototype.value=function(str)
			{
				if(!str)
					console.log("Fail : Not str");
				else if(this.type=='id')//�p�G�W�@�ӧ쪺�Oid
				{
					this.obj.value=str;
					
				}
				else if(this.type=='tag')
				{
					for(var i=0;i<this.aobj.length;i++)
					{
						this.aobj[i].value=str;//�p�G�W�@�ӧ쪺�Otag
					}
				}
				else
				console.log("Fail : Not obj");
			};	
//��site						
GYZ.prototype.goto=function(url)
			{
				if(!url)
					console.log("Fail : gyz.site(url)");	
				else 
					document.location.href=url;
			};

//���ձN�r���ର�Ʀr					
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
//���title					
GYZ.prototype.title=function(str)
			{
				if(!str)
					console.log('Fail : no str');
				else 
					document.title=str;
			};


GYZ.prototype.events=function(str,o)
			{
				if(!this.type)//�èS�����U����obj��
					console.log('Fail : no obj');
				else if(this.type=='id')
					{
					//���U�ƥ�
					this.obj.addEventListener(str,o, false);
					/* addEventListener �M removeEventListener ���ĤT�ӰѼ� useCapture �h�b�ǤJ false �A�]���ǲΦ��M IE ���Ҥ��䴩 Capture ���q����禡�A���F���s�����ۮe
					�u�n�Եh��� Capture ���q����禡�C
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

//�γ~ �ֳt�����Ϥ����e				
//�u�����element	
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
				//�S�ǭȴN����true
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
		
		
//�b�S�w�����������Jyotube�v��
GYZ.prototype.youtube=function(url,width,height)
			{
				//���XID �t��k�i���٭n��
				var tmp=url.indexOf("?v=");
				if(tmp==-1)
					tmp=url.indexOf("&v=") ;						
				var tmp2=tmp+3
				url=url.substring(tmp2);
				tmpArr=url.split('&');
				var videoID=tmpArr[0];
				//�إߤ���
				var ele=document.createElement('object');
				ele.width= (width=='undefined')?width:560;
				ele.height= (height=='undefined')?height:315;
				ele.innerHTML='<embed src="http://www.youtube.com/v/'+videoID+'?version=3&amp;hl=zh_TW&amp;rel=0" type="application/x-shockwave-flash" width="'+width+'" height="'+height+'" allowscriptaccess="always" allowfullscreen="true">';
				//���J���w����m
				this.obj.appendChild(ele);					
			}
		
GYZ.prototype.insert=function(str)
			{						
				//�p�G�w�g�Oobj
				if(typeof str =='object')
				{
					try{
					this.tmp=str;							
					return this;
					}catch(exception){
					console.log('FAIL : Wrong para');
					}
				}
				//�p�G�O�������Jstr!! �n?
				else if(typeof str=='string')
				{
					//...not yet
				}
				else 
					console.log('FAIL : Wrong para');
			};	
		
GYZ.prototype.after=function(o)
			{												
				//check �O�@�몺DOM�����A�٬Ogyz��this
				if(o.type)//�N��Ogyz
				{
					if(o.type=='id')
					{								
						this.obj.appendChild(this.tmp);
					}
					else if(o.type=='tag')
					{
					}
				}
				//after�᭱�i��O�ϥΪ̦ۭq��DOM����
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

var gyz = new GYZ(); //�إ�gyz����ѨϥΪ̾ާ@
var $=gyz;

