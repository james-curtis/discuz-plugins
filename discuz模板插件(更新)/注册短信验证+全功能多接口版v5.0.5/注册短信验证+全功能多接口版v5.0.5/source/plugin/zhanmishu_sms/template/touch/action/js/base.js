!function(){function e(){document.body?FastClick.attach(document.body):setTimeout(e,0)}var t=null;"function"==typeof require?require(["fastclick"],function(e){e.attach(document.body)}):"function"==typeof FastClick?e():console.log("To fix tap bug requires fastclick.js");var n,a,r=null,s=5,o=0,c="yes",d=30,l=!0,u=$(".phone").val(),f={loadingTimeout:null,init:function(){try{a=util.Sync()}catch(e){a={lock:function(e){return e},unlock:function(e){return e}}}r=this,r.validateForm(),r.tip(),r.bind()},bind:function(){},getSearch:function(e,t){for(var n="",i=t||location.search,a=i.slice(1).split("&"),r=0;r<a.length;r++){var s=a[r],o="",c=s.indexOf("=");if(o=s.substr(0,c),o==e)return decodeURIComponent(s.substr(c+1,s.length))}return n},changeSearch:function(e,t,n){for(var i=n||location.href,a=i.split("&"),r=0;r<a.length;r++){var s=a[r],o="",c=s.indexOf("=");o=s.substr(0,c),o==e&&(a[r]=o+"="+t)}return a.join("&")},getSearchObject:function(e){var t=location.search,n="";e&&e.search?(t=e.search,n=t):n=location.search.length>0?location.search.substring(1):"";for(var i={},a=n.length?n.split("&"):[],r=0;r<a.length;r++){var s=a[r].split("="),o=decodeURIComponent(s[0]),c=decodeURIComponent(s[1]);o.length&&(i[o]=c)}return i},verificationCodeTime:function(e){0===d?(a.unlock(t),l=!0,$(e).removeData("disabled"),e.innerHTML="获取验证码",$(e).removeClass("btn-disabled"),d=30):(e.innerHTML="还剩"+d+"秒",$(e).addClass("btn-disabled"),d--,n=setTimeout(function(){r.verificationCodeTime(e)},1e3))},verificationCode:function(e){function i(e){0===d?(a.unlock(t),l=!0,$(e).removeData("disabled"),e.innerHTML="获取验证码",$(e).removeClass("btn-disabled"),d=30):(e.innerHTML="还剩"+d+"秒",$(e).addClass("btn-disabled"),d--,n=setTimeout(function(){i(e)},1e3))}var f={$wrap:e.$wrap,data:null},h=null,m=null,p=null;m=f.$wrap.find(".verification"),$.trim(m.val())&&m.removeAttr("disabled"),t=a.lock(function(d){if(l){l=!1;var u=$(this),g={};if(!u.data("disabled")){if(e.isOnlySpeech)return $("#houseModal").show(),void u.data("disabled",!1);if(o>=4)return $("#codeFreq").show(),void setTimeout(function(){a.unlock(t),l=!0},"1000");if(o>=2)return $("#houseModal").show(),void u.data("disabled",!1);var v=u;if(h=f.$wrap.find(".phone"),f.data=e.data,f.data.tel=h.val(),p=h.siblings(".tip"),p.length<1,""===f.data.phone)return void loadingTip.show({content:"手机号不能为空"});if(p.hide(),m.removeAttr("disabled"),f.data||(f.data={},f.data.phone=h.val()),!r.checkCellPhone(f.data.tel))return void loadingTip.show({content:"请输入正确的手机号"});f.data.CUSTOMER_ID=wecash.CUSTOMER_ID,g=f.data,10!=f.data.sourceFlag&&11!=f.data.sourceFlag||(g=wecash.addSign(g)),$(this).data("disabled","disabled"),$.ajax({url:e.url||"/iosapi/ios/grsz/sendSMSCode",type:"post",dataType:"json",data:g}).always(function(e){}).done(function(e){if(u.removeData("disabled"),m.removeAttr("disabled"),c=e.data.isSend,"1"==e.errorNo){if(o=e.data.count,e.data.count>=s)return clearInterval(n),$("#codeFreq").show(),a.unlock(t),void(l=!0)}else 1==e.successful&&"yes"==e.data.isSend?(o=e.data.count,loadingTip.show({content:"发送成功"}),i(v[0]),setTimeout(function(){$("#codeTip").show(function(){})},1e4),loadingTip.hide({callBack:function(){}})):(a.unlock(t),l=!0,loadingTip.show({content:e.errorDescription}))})}}}),$(document).on("blur",".phone",function(){""!==$(this).val()&&$(this).val()!==u&&(o=0,u=$(this).val())}).on("click",".sendVerification",t)},sendVoiceCode:function(e){$(document).on("tap","#codeTip",function(){o>=4?$("#codeFreq").show():$("#houseModal").show()}),$("#cancelBtn").tap(function(){$("#houseModal").hide(),$(".sendVerification").hasClass("btn-disabled")||(l=!0,a.unlock(t))}),$("#codeFreqConfirm").tap(function(){$("#codeFreq").hide()}),$("#confirmBtn").tap(function(){$("#houseModal").hide();var n={sourceFlag:e.sourceFlag,markVersion:4};8!=e.sourceFlag&&(n.CUSTOMER_ID=wecash.CUSTOMER_ID),8!=e.sourceFlag&&10!=e.sourceFlag&&11!=e.sourceFlag||(n.tel=$(".phone").val()),"10"!=e.sourceFlag&&"11"!=e.sourceFlag||(n=wecash.addSign(n)),$.ajax({url:"/iosapi/ios/grsz/sendVoiceCode",data:n,type:"post",dataType:"json"}).done(function(n){return e.countDown&&n.data.count<5?r.verificationCodeTime($(".sendVerification")[0]):(a.unlock(t),l=!0),$("#houseModal").hide(),0===n.successful?"no"==n.data.isSend?(c="no",void $("#codeFreq").show()):void loadingTip.show({content:n.errorDescription}):(o=n.data.count,void("yes"==n.data.isSend?(c="yes",sessionStorage.setItem("register",1)):"no"==n.data.isSend&&(c="no",loadingTip.show({content:n.errorDescription}))))})})},arrayConvertObject:function(e){for(var t={},n=null,i=0;i<e.length;i++)n=e[i],t[n.name]=n.value;return t},CardAddStar:function(e){var t=e.substr(0,4),n=e.substr(e.length-4);return t+"***********"+n},idCardAddStar:function(e){var t=e.substr(0,4),n=e.substr(e.length-4);return t+"**********"+n},phoneAddStar:function(e){var t=e.substr(0,3),n=e.substr(e.length-4);return t+"****"+n},checkRule:function(e){e=$(this);var t=this.nodeName,n=this.dataset,i=!0;if(!t)return!0;var a=null,s=$(this).parent(),o=s.children(".tip"),c=n.validate,d=($(this).is(":visible"),n.vtip),l=!0;if(!c)return!0;var u=c.split(":")[0],f=c.split(":")[1],h=0,m="",p="",g=!0,v=!1;if(o.length<1&&(o=$("<p class='tip'><span></span></p>"),$("body").append(o)),c){if(m=$.trim($(this).prop("value")),m||(m=$(this).val()),"SELECT"==t)a=$(this).children("option:selected")[0],m=a.hasAttribute("value")&&-1!=a.value?1:"";else if("checkbox"==this.type||"radio"==this.type){m=this.form.elements[this.name].value,thisElem=this.form.elements[this.name];for(var w=0;w<thisElem.length;w++)thisElem[w].checked&&(m=thisElem[w].value)}for(var b=f.split(","),C=0;C<b.length;C++){var x=b[C],T=0,k=0,y=(x.substr(0,1),x.substr(1,x.length)),O=0,N="",S="",A="";if("required"==x){if(!$.trim(m))return v=!0,p="INPUT"==t&&"checkbox"!=this.type&&"radio"!=this.type?"请输入"+u:"请选择"+u,l=!1,g=!1,loadingTip.show({content:e.attr("data-empty-msg")||p}),!1}else if(!m)break;if(0===x.indexOf("n")&&(A="数字",y.indexOf("-")<0&&isNaN(m))){g=!1,l=!1;break}if(y.indexOf("-")>-1){if(O=y.indexOf("-"),N=y.split("-")[0],S=y.split("-")[1],"*"!=N&&Number(m)<Number(N)){p="请输入>"+N,A&&(p+="的数字"),g=!1,l=!1;break}if("*"!=S&&m-S>0){p="请输入<"+S,A&&(p+="的数字"),g=!1,l=!1;break}}if("passwordOther"==x)r.isPasswordOther(m)||(g=!1);else if(x.indexOf("password")>-1)r.isPassword(m)||(g=!1);else if(/phone/.test(x))r.checkCellPhone(m)||(g=!1);else if("inviteNum"==x)m=m.toString(),8!=m.length&&11!=m.length?g=!1:11==m.length&&(r.checkCellPhone(m)||(g=!1));else if(x.indexOf("telareafixed")>-1)r.checkTelareafixed(m)||(g=!1,isTelareafixed=!1);else if(x.indexOf("telarea")>-1)r.checkTelarea(m)||(g=!1,i=!1);else if(x.indexOf("telnum")>-1)r.checkTelnum(m)||(g=!1),i||(g=!1);else if(/number/.test(x))isNaN(m)&&(g=!1);else if(x.indexOf("qq")>-1)r.checkQQ(m)||(g=!1);else if(x.indexOf("cardId")>-1)r.checkcardId(m)||(g=!1);else if(x.indexOf("chinese")>-1||x.indexOf("zh")>-1)r.isChinese(m)||(g=!1);else if(x.indexOf("email")>-1)r.isEmail(m)||(g=!1);else if(x.indexOf("bankNumber")>-1)try{r.isBankNumber(m)||(g=!1)}catch(I){}else x.indexOf("beiyinBankNumber")>-1&&(16==m.length||19==m.length||(g=!1));if(x.indexOf("areaNum")>-1&&(r.isAreaNum(m)||(g=!1)),x.indexOf("interger")>-1&&(/^\d+$/.test(this.value)||(g=!1)),/company/.test(x))r.isCompanyName(m)||(g=!1);else if(/trueName/.test(x))r.isUserName(m)||(g=!1);else if(/address/.test(x))r.isAddress(m)||(g=!1);else if(/addrFifty/.test(x))r.isAddrFifty(m)||(g=!1);else if(/postCode/.test(x))r.isPostCode(m)||(g=!1);else if(/arg/.test(x)){var F=new RegExp(n.arg);F.test(m)||(g=!1)}x.indexOf("range")>-1&&(isNaN(m)?g=!1:(m=Number(m),(m<Number(e.attr("data-start"))||m>Number(e.attr("data-end")))&&(g=!1))),p="请输入正确的"+u,x.toLowerCase().indexOf("length")>-1&&(x.indexOf("minLength")>-1?(h=x.substr(x.indexOf("h")+1),r.strLen(m)<h&&(g=!1)):x.indexOf("maxLength")>-1?(k=x.substr(x.indexOf("h")+1),r.strLen(m)>k&&(g=!1)):(T=x.substr(x.indexOf("h")+1),m.length!=T&&(g=!1)),p="请输入正确的"+u),x.indexOf("commonEmail")>-1&&(r.isCommonEmail(m)||(g=!1)),x.indexOf("tenMillions")>-1&&(r.isTenMillions(m)||(g=!1)),x.indexOf("thousand")>-1&&(r.isThousand(m)||(g=!1)),x.indexOf("hundredth")>-1&&(r.isHundredth(m)||(g=!1))}var E=parseFloat(n.minvalue),M=parseFloat(n.maxvalue),P=parseFloat(m);x.indexOf("scopeCheck")>-1?(E>P||P>M)&&(g=!1,u="",d="请输入"+n.minvalue+"-"+n.maxvalue+"之间的整数"):(n.minvalue&&m-n.minvalue<0&&(g=!1,d="不可小于"+n.minvalue),n.maxvalue&&m-n.maxvalue>0&&(g=!1,d="不可大于"+n.maxvalue)),g||(l=!1)}return g?(o.hide(),$(this).removeClass("validateNoPass")):($(this).addClass("validateNoPass"),d&&(p=u+d),loadingTip.show({content:e.attr("data-msg")||p})),l},validateForm:function(){var e=null;$(document).on("blur","[data-validate]",function(e){var t=$(this).val(),n=e.target,i=e.relatedTarget;if(t){if(i){if($(i).hasClass("submit"))return;if($(i).hasClass("clearBtn")&&$(i).parent()==$(this).parent())return}"SELECT"==n.nodeName&&this.firstElementChild?this.firstElementChild.value!=this.value&&r.checkRule.call(this):r.checkRule.call(this)}}),$(document).on("focus keyup","[data-validate]",function(e){$(this).removeClass("validateNoPass")}),$.fn.validateForm=function(t){e=$.extend(e,t);var n=!0;$(this).addClass("validateForm");var i=(document.forms.registerStepOne,$(this).find("[data-validate]"));return i.removeClass("validateNoPass"),$(this).find("[data-validate]").each(function(e,t){$(t).removeClass("validateNoPass");var i=r.checkRule.call(t);return i?void 0:(n=!1,!1)}),n}},isBankNumber:function(e){return/\d{16,19}/.test(e)},isPassword:function(e){return/^([0-9a-zA-Z]){6,20}$/.test(e)},isPasswordOther:function(e){return/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,20}$/.test(e)},isEmail:function(e){return/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test($.trim(e))},isCommonEmail:function(e){return/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.com|cn|net$/.test($.trim(e))},isPostCode:function(e){return/[0-9]\d{5}(?!\d)/.test(e)},isTenMillions:function(e){var t=!(Number(e)%1e4);return t},isThousand:function(e){var t=!(Number(e)%1e3);return t},isHundredth:function(e){var t=!(Number(e)%100);return t},strLen:function(e){var t=0;for(i=0;i<e.length;i++)e.charCodeAt(i)>256?t+=2:t++;return t},isChinese:function(e){return/^[\u4e00-\u9fa5]+$/i.test($.trim(e))},checkLength:function(e){return/[0-9]|[a-z][A-Z]{6,20}/.test(e)},checkQQ:function(e){return/^[1-9][0-9]{3,8}$/.test(e)},checkCellPhone:function(e){return/^0?(13[0-9]|15[012356789]|17[0135678]|18[0-9]|14[57])[0-9]{8}$/.test(e)},checkPhoneCode:function(e){return/[0-9]|[a-z][A-Z]{8}/.test(e)},checkTelareafixed:function(e){return/^(0\d{2,3})-?(\d{7,8})$/.test(e)},checkTelarea:function(e){return/^0[0-9]{2,3}$/.test(e)},checkTelnum:function(e){return/^[2-9][0-9]{6,7}$/.test(e)},checkcardId:function(e){return/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(e)},isUserName:function(e){return/^[\u4e00-\u9fa5]{2,15}$/.test(e)},isAreaNum:function(e){return/^(0\d{2,3})$/.test(e)},isAddress:function(e){return/^[0-9a-zA-Z\u4e00-\u9fa5]{2,25}$/.test(e)},isAddrFifty:function(e){return/^[0-9a-zA-Z\u4e00-\u9fa5]{2,50}$/.test(e)},isCompanyName:function(e){for(var t=e.length,n=e.split(""),i=0;t>i;i++)if(!("（"==n[i]||"）"==n[i]||"("==n[i]||")"==n[i]||"."==n[i]||"-"==n[i]||"&"==n[i]||n[i]>="A"&&n[i]<="Z"||n[i]>="a"&&n[i]<="z"||r.isChinese(n[i])))return!1;return!0},trimAll:function(e){return e.replace(/\s+/g,"")},isWechatBrowser:function(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)},tip:function(){function e(e){var t=null;t={$wrap:e.$wrap,$tipContent:e.$wrap.find("p"),isWaitCon:!1,content:"请求正在加载中...",showTime:2e3,hide:!0},this.cfg=$.extend(t,e)}e.prototype.show=function(e){if("string"==typeof e&&(e={content:e}),e&&e.content){this.cfg.$wrap[0]||($(document.body).append('<div id="globalTip"><div><i class="waitIcon"></i><p></p></div></div>'),this.cfg.$wrap=$("#globalTip"),this.cfg.$tipContent=$("#globalTip").find("p")),this.cfg.$wrap.hide();var t=0,n=0,i=this.cfg.$wrap.find(".waitIcon");$.extend(this.cfg,e),e&&e.content||(this.cfg.content="请求正在加载中"),this.cfg.isWaitCon||/加载|30秒/.test(this.cfg.content)?i.show():i.hide(),this.cfg.$tipContent.html(this.cfg.content),this.cfg.$wrap.show(100),this.cfg.width=this.cfg.$wrap.width(),this.cfg.height=this.cfg.$wrap.height(),n=-(this.cfg.height/2),t=-(this.cfg.width/2),this.cfg.$wrap.css("marginLeft",t+"px"),window.my=this,clearTimeout(window.loadingTimeout),window.loadingTimeout=setTimeout(function(){my.cfg.$wrap.hide(),my.cfg.callBack&&my.cfg.callBack()},this.cfg.showTime)}},e.prototype.setTipInfo=function(e){this.cfg.$tipContent.html(e.content)},e.prototype.hide=function(e){this.cfg.$wrap.hide(),e&&e.callBack&&e.callBack()},window.Tip=e,$(document).ready(function(){window.loadingTip=new e({$wrap:$("#globalTip")})})}};f.init(),"function"==typeof define&&define.amd&&define([],function(){return f}),window.base=f;try{"function"==typeof Object.defineProperty&&Object.defineProperty(window,"localStorage",{value:window.localStorage||window.sessionStorage,writable:!0,enumerable:!0,configurable:!0})}catch(h){}$.fn.serializeJson=function(){var e={},t=this.serializeArray();this.serialize();return $(t).each(function(){var t=this.name,n=this.value;e[t]?$.isArray(e[t])?e[t].push($.trim(n)):e[t]=[e[t],$.trim(n)]:e[t]=$.trim(n)}),e};try{sessionStorage.setItem("0","1")}catch(h){!function(){window.sessionStorage={},$.extend(window.sessionStorage,{getItem:function(e){var t=window.name;try{t=JSON.parse(t)}catch(n){return t={},null}return t[e]||""},setItem:function(e,t){var n=window.name;try{n=JSON.parse(n)}catch(i){n={}}n[e]=t,window.name=JSON.stringify(n)},removeItem:function(e){var t=window.name;try{t=JSON.parse(t)}catch(n){return null}delete t[e]},clear:function(){window.name="{}"}});var e={name:"fakeLocalStorage",options:{path:"/",expires:365},setItem:function(t,n,i){return e._resetItem(function(e){return e[t]=n,e})},getItem:function(t){return e._get()[t]},removeItem:function(t){return e._resetItem(function(e){return delete e[t],e})},clear:function(){return e._resetItem(function(e){return"{}"})},_resetItem:function(t,n){n=n||e.options;var i=new Date,a=e._get()||{};return i.setDate(+i.getDate()+n.expires),n.expires=i.toGMTString(),document.cookie=[this.name,"=",escape(JSON.stringify(a)),n.expires?"; expires="+n.expires:"",n.path?"; path="+n.path:"",n.domain?"; domain="+n.domain:"",n.secure?"; secure":""].join(""),a[key]},_get:function(){var e=document.cookie.match(new RegExp(this.name+"=(.*?)(?:;|$)"));return JSON.parse(e?unescape(e[1]):"{}")}};for(var t in{setItem:1,getItem:1,removeItem:1,clear:1})window.localStorage[t]=e[t];window.overwritten=!0}()}}();