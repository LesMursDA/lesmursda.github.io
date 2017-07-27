
function InfoBox(opt_opts){opt_opts=opt_opts||{};google.maps.OverlayView.apply(this,arguments);this.content_=opt_opts.content||"";this.disableAutoPan_=opt_opts.disableAutoPan||false;this.maxWidth_=opt_opts.maxWidth||0;this.pixelOffset_=opt_opts.pixelOffset||new google.maps.Size(0,0);this.position_=opt_opts.position||new google.maps.LatLng(0,0);this.zIndex_=opt_opts.zIndex||null;this.boxClass_=opt_opts.boxClass||"infoBox";this.boxStyle_=opt_opts.boxStyle||{};this.closeBoxMargin_=opt_opts.closeBoxMargin||"2px";this.closeBoxURL_=opt_opts.closeBoxURL||"http://www.google.com/intl/en_us/mapfiles/close.gif";if(opt_opts.closeBoxURL===""){this.closeBoxURL_="";}
this.infoBoxClearance_=opt_opts.infoBoxClearance||new google.maps.Size(1,1);if(typeof opt_opts.visible==="undefined"){if(typeof opt_opts.isHidden==="undefined"){opt_opts.visible=true;}else{opt_opts.visible=!opt_opts.isHidden;}}
this.isHidden_=!opt_opts.visible;this.alignBottom_=opt_opts.alignBottom||false;this.pane_=opt_opts.pane||"floatPane";this.enableEventPropagation_=opt_opts.enableEventPropagation||false;this.div_=null;this.closeListener_=null;this.moveListener_=null;this.contextListener_=null;this.eventListeners_=null;this.fixedWidthSet_=null;}
InfoBox.prototype=new google.maps.OverlayView();InfoBox.prototype.createInfoBoxDiv_=function(){var i;var events;var bw;var me=this;var cancelHandler=function(e){e.cancelBubble=true;if(e.stopPropagation){e.stopPropagation();}};var ignoreHandler=function(e){e.returnValue=false;if(e.preventDefault){e.preventDefault();}
if(!me.enableEventPropagation_){cancelHandler(e);}};if(!this.div_){this.div_=document.createElement("div");this.setBoxStyle_();if(typeof this.content_.nodeType==="undefined"){this.div_.innerHTML=this.getCloseBoxImg_()+this.content_;}else{this.div_.innerHTML=this.getCloseBoxImg_();this.div_.appendChild(this.content_);}
this.getPanes()[this.pane_].appendChild(this.div_);this.addClickHandler_();if(this.div_.style.width){this.fixedWidthSet_=true;}else{if(this.maxWidth_!==0&&this.div_.offsetWidth>this.maxWidth_){this.div_.style.width=this.maxWidth_;this.div_.style.overflow="auto";this.fixedWidthSet_=true;}else{bw=this.getBoxWidths_();this.div_.style.width=(this.div_.offsetWidth-bw.left-bw.right)+"px";this.fixedWidthSet_=false;}}
this.panBox_(this.disableAutoPan_);if(!this.enableEventPropagation_){this.eventListeners_=[];events=["mousedown","mouseover","mouseout","mouseup","click","dblclick","touchstart","touchend","touchmove"];for(i=0;i<events.length;i++){this.eventListeners_.push(google.maps.event.addDomListener(this.div_,events[i],cancelHandler));}
this.eventListeners_.push(google.maps.event.addDomListener(this.div_,"mouseover",function(e){this.style.cursor="default";}));}
this.contextListener_=google.maps.event.addDomListener(this.div_,"contextmenu",ignoreHandler);google.maps.event.trigger(this,"domready");}};InfoBox.prototype.getCloseBoxImg_=function(){var img="";if(this.closeBoxURL_!==""){img="<img";img+=" src='"+this.closeBoxURL_+"'";img+=" align=right";img+=" style='";img+=" position: relative;";img+=" cursor: pointer;";img+=" margin: "+this.closeBoxMargin_+";";img+="'>";}
return img;};InfoBox.prototype.addClickHandler_=function(){var closeBox;if(this.closeBoxURL_!==""){closeBox=this.div_.firstChild;this.closeListener_=google.maps.event.addDomListener(closeBox,"click",this.getCloseClickHandler_());}else{this.closeListener_=null;}};InfoBox.prototype.getCloseClickHandler_=function(){var me=this;return function(e){e.cancelBubble=true;if(e.stopPropagation){e.stopPropagation();}
google.maps.event.trigger(me,"closeclick");me.close();};};InfoBox.prototype.panBox_=function(disablePan){var map;var bounds;var xOffset=0,yOffset=0;if(!disablePan){map=this.getMap();if(map instanceof google.maps.Map){if(!map.getBounds().contains(this.position_)){map.setCenter(this.position_);}
bounds=map.getBounds();var mapDiv=map.getDiv();var mapWidth=mapDiv.offsetWidth;var mapHeight=mapDiv.offsetHeight;var iwOffsetX=this.pixelOffset_.width;var iwOffsetY=this.pixelOffset_.height;var iwWidth=this.div_.offsetWidth;var iwHeight=this.div_.offsetHeight;var padX=this.infoBoxClearance_.width;var padY=this.infoBoxClearance_.height;var pixPosition=this.getProjection().fromLatLngToContainerPixel(this.position_);if(pixPosition.x<(-iwOffsetX+padX)){xOffset=pixPosition.x+iwOffsetX-padX;}else if((pixPosition.x+iwWidth+iwOffsetX+padX)>mapWidth){xOffset=pixPosition.x+iwWidth+iwOffsetX+padX-mapWidth;}
if(this.alignBottom_){if(pixPosition.y<(-iwOffsetY+padY+iwHeight)){yOffset=pixPosition.y+iwOffsetY-padY-iwHeight;}else if((pixPosition.y+iwOffsetY+padY)>mapHeight){yOffset=pixPosition.y+iwOffsetY+padY-mapHeight;}}else{if(pixPosition.y<(-iwOffsetY+padY)){yOffset=pixPosition.y+iwOffsetY-padY;}else if((pixPosition.y+iwHeight+iwOffsetY+padY)>mapHeight){yOffset=pixPosition.y+iwHeight+iwOffsetY+padY-mapHeight;}}
if(!(xOffset===0&&yOffset===0)){var c=map.getCenter();map.panBy(xOffset,yOffset);}}}};InfoBox.prototype.setBoxStyle_=function(){var i,boxStyle;if(this.div_){this.div_.className=this.boxClass_;this.div_.style.cssText="";boxStyle=this.boxStyle_;for(i in boxStyle){if(boxStyle.hasOwnProperty(i)){this.div_.style[i]=boxStyle[i];}}
this.div_.style.WebkitTransform="translateZ(0)";if(typeof this.div_.style.opacity!=="undefined"&&this.div_.style.opacity!==""){this.div_.style.MsFilter="\"progid:DXImageTransform.Microsoft.Alpha(Opacity="+(this.div_.style.opacity*100)+")\"";this.div_.style.filter="alpha(opacity="+(this.div_.style.opacity*100)+")";}
this.div_.style.position="absolute";this.div_.style.visibility='hidden';if(this.zIndex_!==null){this.div_.style.zIndex=this.zIndex_;}}};InfoBox.prototype.getBoxWidths_=function(){var computedStyle;var bw={top:0,bottom:0,left:0,right:0};var box=this.div_;if(document.defaultView&&document.defaultView.getComputedStyle){computedStyle=box.ownerDocument.defaultView.getComputedStyle(box,"");if(computedStyle){bw.top=parseInt(computedStyle.borderTopWidth,10)||0;bw.bottom=parseInt(computedStyle.borderBottomWidth,10)||0;bw.left=parseInt(computedStyle.borderLeftWidth,10)||0;bw.right=parseInt(computedStyle.borderRightWidth,10)||0;}}else if(document.documentElement.currentStyle){if(box.currentStyle){bw.top=parseInt(box.currentStyle.borderTopWidth,10)||0;bw.bottom=parseInt(box.currentStyle.borderBottomWidth,10)||0;bw.left=parseInt(box.currentStyle.borderLeftWidth,10)||0;bw.right=parseInt(box.currentStyle.borderRightWidth,10)||0;}}
return bw;};InfoBox.prototype.onRemove=function(){if(this.div_){this.div_.parentNode.removeChild(this.div_);this.div_=null;}};InfoBox.prototype.draw=function(){this.createInfoBoxDiv_();var pixPosition=this.getProjection().fromLatLngToDivPixel(this.position_);this.div_.style.left=(pixPosition.x+this.pixelOffset_.width)+"px";if(this.alignBottom_){this.div_.style.bottom=-(pixPosition.y+this.pixelOffset_.height)+"px";}else{this.div_.style.top=(pixPosition.y+this.pixelOffset_.height)+"px";}
if(this.isHidden_){this.div_.style.visibility="hidden";}else{this.div_.style.visibility="visible";}};InfoBox.prototype.setOptions=function(opt_opts){if(typeof opt_opts.boxClass!=="undefined"){this.boxClass_=opt_opts.boxClass;this.setBoxStyle_();}
if(typeof opt_opts.boxStyle!=="undefined"){this.boxStyle_=opt_opts.boxStyle;this.setBoxStyle_();}
if(typeof opt_opts.content!=="undefined"){this.setContent(opt_opts.content);}
if(typeof opt_opts.disableAutoPan!=="undefined"){this.disableAutoPan_=opt_opts.disableAutoPan;}
if(typeof opt_opts.maxWidth!=="undefined"){this.maxWidth_=opt_opts.maxWidth;}
if(typeof opt_opts.pixelOffset!=="undefined"){this.pixelOffset_=opt_opts.pixelOffset;}
if(typeof opt_opts.alignBottom!=="undefined"){this.alignBottom_=opt_opts.alignBottom;}
if(typeof opt_opts.position!=="undefined"){this.setPosition(opt_opts.position);}
if(typeof opt_opts.zIndex!=="undefined"){this.setZIndex(opt_opts.zIndex);}
if(typeof opt_opts.closeBoxMargin!=="undefined"){this.closeBoxMargin_=opt_opts.closeBoxMargin;}
if(typeof opt_opts.closeBoxURL!=="undefined"){this.closeBoxURL_=opt_opts.closeBoxURL;}
if(typeof opt_opts.infoBoxClearance!=="undefined"){this.infoBoxClearance_=opt_opts.infoBoxClearance;}
if(typeof opt_opts.isHidden!=="undefined"){this.isHidden_=opt_opts.isHidden;}
if(typeof opt_opts.visible!=="undefined"){this.isHidden_=!opt_opts.visible;}
if(typeof opt_opts.enableEventPropagation!=="undefined"){this.enableEventPropagation_=opt_opts.enableEventPropagation;}
if(this.div_){this.draw();}};InfoBox.prototype.setContent=function(content){this.content_=content;if(this.div_){if(this.closeListener_){google.maps.event.removeListener(this.closeListener_);this.closeListener_=null;}
if(!this.fixedWidthSet_){this.div_.style.width="";}
if(typeof content.nodeType==="undefined"){this.div_.innerHTML=this.getCloseBoxImg_()+content;}else{this.div_.innerHTML=this.getCloseBoxImg_();this.div_.appendChild(content);}
if(!this.fixedWidthSet_){this.div_.style.width=this.div_.offsetWidth+"px";if(typeof content.nodeType==="undefined"){this.div_.innerHTML=this.getCloseBoxImg_()+content;}else{this.div_.innerHTML=this.getCloseBoxImg_();this.div_.appendChild(content);}}
this.addClickHandler_();}
google.maps.event.trigger(this,"content_changed");};InfoBox.prototype.setPosition=function(latlng){this.position_=latlng;if(this.div_){this.draw();}
google.maps.event.trigger(this,"position_changed");};InfoBox.prototype.setZIndex=function(index){this.zIndex_=index;if(this.div_){this.div_.style.zIndex=index;}
google.maps.event.trigger(this,"zindex_changed");};InfoBox.prototype.setVisible=function(isVisible){this.isHidden_=!isVisible;if(this.div_){this.div_.style.visibility=(this.isHidden_?"hidden":"visible");}};InfoBox.prototype.getContent=function(){return this.content_;};InfoBox.prototype.getPosition=function(){return this.position_;};InfoBox.prototype.getZIndex=function(){return this.zIndex_;};InfoBox.prototype.getVisible=function(){var isVisible;if((typeof this.getMap()==="undefined")||(this.getMap()===null)){isVisible=false;}else{isVisible=!this.isHidden_;}
return isVisible;};InfoBox.prototype.show=function(){this.isHidden_=false;if(this.div_){this.div_.style.visibility="visible";}};InfoBox.prototype.hide=function(){this.isHidden_=true;if(this.div_){this.div_.style.visibility="hidden";}};InfoBox.prototype.open=function(map,anchor){var me=this;if(anchor){this.position_=anchor.getPosition();this.moveListener_=google.maps.event.addListener(anchor,"position_changed",function(){me.setPosition(this.getPosition());});}
this.setMap(map);if(this.div_){this.panBox_();}};InfoBox.prototype.close=function(){var i;if(this.closeListener_){google.maps.event.removeListener(this.closeListener_);this.closeListener_=null;}
if(this.eventListeners_){for(i=0;i<this.eventListeners_.length;i++){google.maps.event.removeListener(this.eventListeners_[i]);}
this.eventListeners_=null;}
if(this.moveListener_){google.maps.event.removeListener(this.moveListener_);this.moveListener_=null;}
if(this.contextListener_){google.maps.event.removeListener(this.contextListener_);this.contextListener_=null;}
this.setMap(null);};
function initialize(){var myLatlng=new google.maps.LatLng(37.7915392,-122.4010832);var mapOptions={zoom:17,center:myLatlng,scrollwheel:false};var map=new google.maps.Map(document.getElementById('js-footer-map'),mapOptions);var marker=new google.maps.Marker({position:myLatlng,map:map,icon:'/img/map-marker.svg'});var infoContent=document.createElement("ul");infoContent.innerHTML='<li>'+'<a href="https://www.google.com/maps/place/115+Sansome+St,+San+Francisco,+CA+94104/@37.7915392,-122.4010832,17z/data=!3m1!4b1!4m2!3m1!1s0x808580620f6b3de1:0xd0572d0a7df07a3b">'+'<span class="icon icon--compass" aria-hidden="true"></span><span class="contact__details__item">115 Sansome St, Floor 7<br/>San Francisco, CA 94104</span>'+'</a>'+'</li>'+'<li>'+'<a href="mailto:hello@echouser.com">'+'<span class="icon icon--mail" aria-hidden="true"></span><span class="contact__details__item contact__details__item--large">hello@echouser.com</span>'+'</a>'+'</li>'+'<li>'+'<a href="tel:+14154495750">'+'<span class="icon icon--phone" aria-hidden="true"></span><span class="contact__details__item">+1 415 449 5750</span>'+'</a>'+'</li>';var infoOptions={boxClass:"contact__details",alignBottom:true,content:infoContent,disableAutoPan:false,maxWidth:0,pixelOffset:new google.maps.Size(48,6),zIndex:null,closeBoxURL:"",infoBoxClearance:new google.maps.Size(1,1),isHidden:false,pane:"floatPane",enableEventPropagation:false};var ib=new InfoBox(infoOptions);ib.open(map,marker);map.panBy(48,-48);}
google.maps.event.addDomListener(window,'load',initialize);
$('.js-click-down__toggle').on('click',function(e){e.preventDefault();$(this).closest('.js-click-down').toggleClass('is-active');});var mqOnlyBp0Bp1=window.matchMedia('only screen and (max-width: 899px)');var checkMq=function(mq){if(mq.matches){$('.js-drop-down__toggle').on('click',function(e){e.preventDefault();$(this).closest('.js-drop-down').toggleClass('is-active');});}else{$('.js-drop-down__toggle').off('click');}}
mqOnlyBp0Bp1.addListener(checkMq);checkMq(mqOnlyBp0Bp1);
(function(expose){var Markdown=expose.Markdown=function Markdown(dialect){switch(typeof dialect){case"undefined":this.dialect=Markdown.dialects.Gruber;break;case"object":this.dialect=dialect;break;default:if(dialect in Markdown.dialects){this.dialect=Markdown.dialects[dialect];}
else{throw new Error("Unknown Markdown dialect '"+String(dialect)+"'");}
break;}
this.em_state=[];this.strong_state=[];this.debug_indent="";};expose.parse=function(source,dialect){var md=new Markdown(dialect);return md.toTree(source);};expose.toHTML=function toHTML(source,dialect,options){var input=expose.toHTMLTree(source,dialect,options);return expose.renderJsonML(input);};expose.toHTMLTree=function toHTMLTree(input,dialect,options){if(typeof input==="string")input=this.parse(input,dialect);var attrs=extract_attr(input),refs={};if(attrs&&attrs.references){refs=attrs.references;}
var html=convert_tree_to_html(input,refs,options);merge_text_nodes(html);return html;};function mk_block_toSource(){return"Markdown.mk_block( "+
uneval(this.toString())+", "+
uneval(this.trailing)+", "+
uneval(this.lineNumber)+" )";}
function mk_block_inspect(){var util=require('util');return"Markdown.mk_block( "+
util.inspect(this.toString())+", "+
util.inspect(this.trailing)+", "+
util.inspect(this.lineNumber)+" )";}
var mk_block=Markdown.mk_block=function(block,trail,line){if(arguments.length==1)trail="\n\n";var s=new String(block);s.trailing=trail;s.inspect=mk_block_inspect;s.toSource=mk_block_toSource;if(line!=undefined)
s.lineNumber=line;return s;};function count_lines(str){var n=0,i=-1;while((i=str.indexOf('\n',i+1))!==-1)n++;return n;}
Markdown.prototype.split_blocks=function splitBlocks(input,startLine){var re=/([\s\S]+?)($|\n(?:\s*\n|$)+)/g,blocks=[],m;var line_no=1;if((m=/^(\s*\n)/.exec(input))!=null){line_no+=count_lines(m[0]);re.lastIndex=m[0].length;}
while((m=re.exec(input))!==null){blocks.push(mk_block(m[1],m[2],line_no));line_no+=count_lines(m[0]);}
return blocks;};Markdown.prototype.processBlock=function processBlock(block,next){var cbs=this.dialect.block,ord=cbs.__order__;if("__call__"in cbs){return cbs.__call__.call(this,block,next);}
for(var i=0;i<ord.length;i++){var res=cbs[ord[i]].call(this,block,next);if(res){if(!isArray(res)||(res.length>0&&!(isArray(res[0]))))
this.debug(ord[i],"didn't return a proper array");return res;}}
return[];};Markdown.prototype.processInline=function processInline(block){return this.dialect.inline.__call__.call(this,String(block));};Markdown.prototype.toTree=function toTree(source,custom_root){var blocks=source instanceof Array?source:this.split_blocks(source);var old_tree=this.tree;try{this.tree=custom_root||this.tree||["markdown"];blocks:while(blocks.length){var b=this.processBlock(blocks.shift(),blocks);if(!b.length)continue blocks;this.tree.push.apply(this.tree,b);}
return this.tree;}
finally{if(custom_root){this.tree=old_tree;}}};Markdown.prototype.debug=function(){var args=Array.prototype.slice.call(arguments);args.unshift(this.debug_indent);if(typeof print!=="undefined")
print.apply(print,args);if(typeof console!=="undefined"&&typeof console.log!=="undefined")
console.log.apply(null,args);}
Markdown.prototype.loop_re_over_block=function(re,block,cb){var m,b=block.valueOf();while(b.length&&(m=re.exec(b))!=null){b=b.substr(m[0].length);cb.call(this,m);}
return b;};Markdown.dialects={};Markdown.dialects.Gruber={block:{atxHeader:function atxHeader(block,next){var m=block.match(/^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/);if(!m)return undefined;var header=["header",{level:m[1].length}];Array.prototype.push.apply(header,this.processInline(m[2]));if(m[0].length<block.length)
next.unshift(mk_block(block.substr(m[0].length),block.trailing,block.lineNumber+2));return[header];},setextHeader:function setextHeader(block,next){var m=block.match(/^(.*)\n([-=])\2\2+(?:\n|$)/);if(!m)return undefined;var level=(m[2]==="=")?1:2;var header=["header",{level:level},m[1]];if(m[0].length<block.length)
next.unshift(mk_block(block.substr(m[0].length),block.trailing,block.lineNumber+2));return[header];},code:function code(block,next){var ret=[],re=/^(?: {0,3}\t| {4})(.*)\n?/,lines;if(!block.match(re))return undefined;block_search:do{var b=this.loop_re_over_block(re,block.valueOf(),function(m){ret.push(m[1]);});if(b.length){next.unshift(mk_block(b,block.trailing));break block_search;}
else if(next.length){if(!next[0].match(re))break block_search;ret.push(block.trailing.replace(/[^\n]/g,'').substring(2));block=next.shift();}
else{break block_search;}}while(true);return[["code_block",ret.join("\n")]];},horizRule:function horizRule(block,next){var m=block.match(/^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/);if(!m){return undefined;}
var jsonml=[["hr"]];if(m[1]){jsonml.unshift.apply(jsonml,this.processBlock(m[1],[]));}
if(m[3]){next.unshift(mk_block(m[3]));}
return jsonml;},lists:(function(){var any_list="[*+-]|\\d+\\.",bullet_list=/[*+-]/,number_list=/\d+\./,is_list_re=new RegExp("^( {0,3})("+any_list+")[ \t]+"),indent_re="(?: {0,3}\\t| {4})";function regex_for_depth(depth){return new RegExp("(?:^("+indent_re+"{0,"+depth+"} {0,3})("+any_list+")\\s+)|"+"(^"+indent_re+"{0,"+(depth-1)+"}[ ]{0,4})");}
function expand_tab(input){return input.replace(/ {0,3}\t/g,"    ");}
function add(li,loose,inline,nl){if(loose){li.push(["para"].concat(inline));return;}
var add_to=li[li.length-1]instanceof Array&&li[li.length-1][0]=="para"?li[li.length-1]:li;if(nl&&li.length>1)inline.unshift(nl);for(var i=0;i<inline.length;i++){var what=inline[i],is_str=typeof what=="string";if(is_str&&add_to.length>1&&typeof add_to[add_to.length-1]=="string"){add_to[add_to.length-1]+=what;}
else{add_to.push(what);}}}
function get_contained_blocks(depth,blocks){var re=new RegExp("^("+indent_re+"{"+depth+"}.*?\\n?)*$"),replace=new RegExp("^"+indent_re+"{"+depth+"}","gm"),ret=[];while(blocks.length>0){if(re.exec(blocks[0])){var b=blocks.shift(),x=b.replace(replace,"");ret.push(mk_block(x,b.trailing,b.lineNumber));}
break;}
return ret;}
function paragraphify(s,i,stack){var list=s.list;var last_li=list[list.length-1];if(last_li[1]instanceof Array&&last_li[1][0]=="para"){return;}
if(i+1==stack.length){last_li.push(["para"].concat(last_li.splice(1)));}
else{var sublist=last_li.pop();last_li.push(["para"].concat(last_li.splice(1)),sublist);}}
return function(block,next){var m=block.match(is_list_re);if(!m)return undefined;function make_list(m){var list=bullet_list.exec(m[2])?["bulletlist"]:["numberlist"];stack.push({list:list,indent:m[1]});return list;}
var stack=[],list=make_list(m),last_li,loose=false,ret=[stack[0].list],i;loose_search:while(true){var lines=block.split(/(?=\n)/);var li_accumulate="";tight_search:for(var line_no=0;line_no<lines.length;line_no++){var nl="",l=lines[line_no].replace(/^\n/,function(n){nl=n;return"";});var line_re=regex_for_depth(stack.length);m=l.match(line_re);if(m[1]!==undefined){if(li_accumulate.length){add(last_li,loose,this.processInline(li_accumulate),nl);loose=false;li_accumulate="";}
m[1]=expand_tab(m[1]);var wanted_depth=Math.floor(m[1].length/4)+1;if(wanted_depth>stack.length){list=make_list(m);last_li.push(list);last_li=list[1]=["listitem"];}
else{var found=false;for(i=0;i<stack.length;i++){if(stack[i].indent!=m[1])continue;list=stack[i].list;stack.splice(i+1);found=true;break;}
if(!found){wanted_depth++;if(wanted_depth<=stack.length){stack.splice(wanted_depth);list=stack[wanted_depth-1].list;}
else{list=make_list(m);last_li.push(list);}}
last_li=["listitem"];list.push(last_li);}
nl="";}
if(l.length>m[0].length){li_accumulate+=nl+l.substr(m[0].length);}}
if(li_accumulate.length){add(last_li,loose,this.processInline(li_accumulate),nl);loose=false;li_accumulate="";}
var contained=get_contained_blocks(stack.length,next);if(contained.length>0){forEach(stack,paragraphify,this);last_li.push.apply(last_li,this.toTree(contained,[]));}
var next_block=next[0]&&next[0].valueOf()||"";if(next_block.match(is_list_re)||next_block.match(/^ /)){block=next.shift();var hr=this.dialect.block.horizRule(block,next);if(hr){ret.push.apply(ret,hr);break;}
forEach(stack,paragraphify,this);loose=true;continue loose_search;}
break;}
return ret;};})(),blockquote:function blockquote(block,next){if(!block.match(/^>/m))
return undefined;var jsonml=[];if(block[0]!=">"){var lines=block.split(/\n/),prev=[];while(lines.length&&lines[0][0]!=">"){prev.push(lines.shift());}
block=lines.join("\n");jsonml.push.apply(jsonml,this.processBlock(prev.join("\n"),[]));}
while(next.length&&next[0][0]==">"){var b=next.shift();block=new String(block+block.trailing+b);block.trailing=b.trailing;}
var input=block.replace(/^> ?/gm,''),old_tree=this.tree;jsonml.push(this.toTree(input,["blockquote"]));return jsonml;},referenceDefn:function referenceDefn(block,next){var re=/^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;if(!block.match(re))
return undefined;if(!extract_attr(this.tree)){this.tree.splice(1,0,{});}
var attrs=extract_attr(this.tree);if(attrs.references===undefined){attrs.references={};}
var b=this.loop_re_over_block(re,block,function(m){if(m[2]&&m[2][0]=='<'&&m[2][m[2].length-1]=='>')
m[2]=m[2].substring(1,m[2].length-1);var ref=attrs.references[m[1].toLowerCase()]={href:m[2]};if(m[4]!==undefined)
ref.title=m[4];else if(m[5]!==undefined)
ref.title=m[5];});if(b.length)
next.unshift(mk_block(b,block.trailing));return[];},para:function para(block,next){return[["para"].concat(this.processInline(block))];}}};Markdown.dialects.Gruber.inline={__oneElement__:function oneElement(text,patterns_or_re,previous_nodes){var m,res,lastIndex=0;patterns_or_re=patterns_or_re||this.dialect.inline.__patterns__;var re=new RegExp("([\\s\\S]*?)("+(patterns_or_re.source||patterns_or_re)+")");m=re.exec(text);if(!m){return[text.length,text];}
else if(m[1]){return[m[1].length,m[1]];}
var res;if(m[2]in this.dialect.inline){res=this.dialect.inline[m[2]].call(this,text.substr(m.index),m,previous_nodes||[]);}
res=res||[m[2].length,m[2]];return res;},__call__:function inline(text,patterns){var out=[],res;function add(x){if(typeof x=="string"&&typeof out[out.length-1]=="string")
out[out.length-1]+=x;else
out.push(x);}
while(text.length>0){res=this.dialect.inline.__oneElement__.call(this,text,patterns,out);text=text.substr(res.shift());forEach(res,add)}
return out;},"]":function(){},"}":function(){},"\\":function escaped(text){if(text.match(/^\\[\\`\*_{}\[\]()#\+.!\-]/))
return[2,text[1]];else
return[1,"\\"];},"![":function image(text){var m=text.match(/^!\[(.*?)\][ \t]*\([ \t]*(\S*)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);if(m){if(m[2]&&m[2][0]=='<'&&m[2][m[2].length-1]=='>')
m[2]=m[2].substring(1,m[2].length-1);m[2]=this.dialect.inline.__call__.call(this,m[2],/\\/)[0];var attrs={alt:m[1],href:m[2]||""};if(m[4]!==undefined)
attrs.title=m[4];return[m[0].length,["img",attrs]];}
m=text.match(/^!\[(.*?)\][ \t]*\[(.*?)\]/);if(m){return[m[0].length,["img_ref",{alt:m[1],ref:m[2].toLowerCase(),original:m[0]}]];}
return[2,"!["];},"[":function link(text){var orig=String(text);var res=Markdown.DialectHelpers.inline_until_char.call(this,text.substr(1),']');if(!res)return[1,'['];var consumed=1+res[0],children=res[1],link,attrs;text=text.substr(consumed);var m=text.match(/^\s*\([ \t]*(\S+)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/);if(m){var url=m[1];consumed+=m[0].length;if(url&&url[0]=='<'&&url[url.length-1]=='>')
url=url.substring(1,url.length-1);if(!m[3]){var open_parens=1;for(var len=0;len<url.length;len++){switch(url[len]){case'(':open_parens++;break;case')':if(--open_parens==0){consumed-=url.length-len;url=url.substring(0,len);}
break;}}}
url=this.dialect.inline.__call__.call(this,url,/\\/)[0];attrs={href:url||""};if(m[3]!==undefined)
attrs.title=m[3];link=["link",attrs].concat(children);return[consumed,link];}
m=text.match(/^\s*\[(.*?)\]/);if(m){consumed+=m[0].length;attrs={ref:(m[1]||String(children)).toLowerCase(),original:orig.substr(0,consumed)};link=["link_ref",attrs].concat(children);return[consumed,link];}
if(children.length==1&&typeof children[0]=="string"){attrs={ref:children[0].toLowerCase(),original:orig.substr(0,consumed)};link=["link_ref",attrs,children[0]];return[consumed,link];}
return[1,"["];},"<":function autoLink(text){var m;if((m=text.match(/^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/))!=null){if(m[3]){return[m[0].length,["link",{href:"mailto:"+m[3]},m[3]]];}
else if(m[2]=="mailto"){return[m[0].length,["link",{href:m[1]},m[1].substr("mailto:".length)]];}
else
return[m[0].length,["link",{href:m[1]},m[1]]];}
return[1,"<"];},"`":function inlineCode(text){var m=text.match(/(`+)(([\s\S]*?)\1)/);if(m&&m[2])
return[m[1].length+m[2].length,["inlinecode",m[3]]];else{return[1,"`"];}},"  \n":function lineBreak(text){return[3,["linebreak"]];}};function strong_em(tag,md){var state_slot=tag+"_state",other_slot=tag=="strong"?"em_state":"strong_state";function CloseTag(len){this.len_after=len;this.name="close_"+md;}
return function(text,orig_match){if(this[state_slot][0]==md){this[state_slot].shift();return[text.length,new CloseTag(text.length-md.length)];}
else{var other=this[other_slot].slice(),state=this[state_slot].slice();this[state_slot].unshift(md);var res=this.processInline(text.substr(md.length));var last=res[res.length-1];var check=this[state_slot].shift();if(last instanceof CloseTag){res.pop();var consumed=text.length-last.len_after;return[consumed,[tag].concat(res)];}
else{this[other_slot]=other;this[state_slot]=state;return[md.length,md];}}};}
Markdown.dialects.Gruber.inline["**"]=strong_em("strong","**");Markdown.dialects.Gruber.inline["__"]=strong_em("strong","__");Markdown.dialects.Gruber.inline["*"]=strong_em("em","*");Markdown.dialects.Gruber.inline["_"]=strong_em("em","_");Markdown.buildBlockOrder=function(d){var ord=[];for(var i in d){if(i=="__order__"||i=="__call__")continue;ord.push(i);}
d.__order__=ord;};Markdown.buildInlinePatterns=function(d){var patterns=[];for(var i in d){if(i.match(/^__.*__$/))continue;var l=i.replace(/([\\.*+?|()\[\]{}])/g,"\\$1").replace(/\n/,"\\n");patterns.push(i.length==1?l:"(?:"+l+")");}
patterns=patterns.join("|");d.__patterns__=patterns;var fn=d.__call__;d.__call__=function(text,pattern){if(pattern!=undefined){return fn.call(this,text,pattern);}
else
{return fn.call(this,text,patterns);}};};Markdown.DialectHelpers={};Markdown.DialectHelpers.inline_until_char=function(text,want){var consumed=0,nodes=[];while(true){if(text[consumed]==want){consumed++;return[consumed,nodes];}
if(consumed>=text.length){return null;}
var res=this.dialect.inline.__oneElement__.call(this,text.substr(consumed));consumed+=res[0];nodes.push.apply(nodes,res.slice(1));}}
Markdown.subclassDialect=function(d){function Block(){}
Block.prototype=d.block;function Inline(){}
Inline.prototype=d.inline;return{block:new Block(),inline:new Inline()};};Markdown.buildBlockOrder(Markdown.dialects.Gruber.block);Markdown.buildInlinePatterns(Markdown.dialects.Gruber.inline);Markdown.dialects.Maruku=Markdown.subclassDialect(Markdown.dialects.Gruber);Markdown.dialects.Maruku.processMetaHash=function processMetaHash(meta_string){var meta=split_meta_hash(meta_string),attr={};for(var i=0;i<meta.length;++i){if(/^#/.test(meta[i])){attr.id=meta[i].substring(1);}
else if(/^\./.test(meta[i])){if(attr['class']){attr['class']=attr['class']+meta[i].replace(/./," ");}
else{attr['class']=meta[i].substring(1);}}
else if(/\=/.test(meta[i])){var s=meta[i].split(/\=/);attr[s[0]]=s[1];}}
return attr;}
function split_meta_hash(meta_string){var meta=meta_string.split(""),parts=[""],in_quotes=false;while(meta.length){var letter=meta.shift();switch(letter){case" ":if(in_quotes){parts[parts.length-1]+=letter;}
else{parts.push("");}
break;case"'":case'"':in_quotes=!in_quotes;break;case"\\":letter=meta.shift();default:parts[parts.length-1]+=letter;break;}}
return parts;}
Markdown.dialects.Maruku.block.document_meta=function document_meta(block,next){if(block.lineNumber>1)return undefined;if(!block.match(/^(?:\w+:.*\n)*\w+:.*$/))return undefined;if(!extract_attr(this.tree)){this.tree.splice(1,0,{});}
var pairs=block.split(/\n/);for(p in pairs){var m=pairs[p].match(/(\w+):\s*(.*)$/),key=m[1].toLowerCase(),value=m[2];this.tree[1][key]=value;}
return[];};Markdown.dialects.Maruku.block.block_meta=function block_meta(block,next){var m=block.match(/(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/);if(!m)return undefined;var attr=this.dialect.processMetaHash(m[2]);var hash;if(m[1]===""){var node=this.tree[this.tree.length-1];hash=extract_attr(node);if(typeof node==="string")return undefined;if(!hash){hash={};node.splice(1,0,hash);}
for(a in attr){hash[a]=attr[a];}
return[];}
var b=block.replace(/\n.*$/,""),result=this.processBlock(b,[]);hash=extract_attr(result[0]);if(!hash){hash={};result[0].splice(1,0,hash);}
for(a in attr){hash[a]=attr[a];}
return result;};Markdown.dialects.Maruku.block.definition_list=function definition_list(block,next){var tight=/^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,list=["dl"],i;if((m=block.match(tight))){var blocks=[block];while(next.length&&tight.exec(next[0])){blocks.push(next.shift());}
for(var b=0;b<blocks.length;++b){var m=blocks[b].match(tight),terms=m[1].replace(/\n$/,"").split(/\n/),defns=m[2].split(/\n:\s+/);for(i=0;i<terms.length;++i){list.push(["dt",terms[i]]);}
for(i=0;i<defns.length;++i){list.push(["dd"].concat(this.processInline(defns[i].replace(/(\n)\s+/,"$1"))));}}}
else{return undefined;}
return[list];};Markdown.dialects.Maruku.inline["{:"]=function inline_meta(text,matches,out){if(!out.length){return[2,"{:"];}
var before=out[out.length-1];if(typeof before==="string"){return[2,"{:"];}
var m=text.match(/^\{:\s*((?:\\\}|[^\}])*)\s*\}/);if(!m){return[2,"{:"];}
var meta=this.dialect.processMetaHash(m[1]),attr=extract_attr(before);if(!attr){attr={};before.splice(1,0,attr);}
for(var k in meta){attr[k]=meta[k];}
return[m[0].length,""];};Markdown.buildBlockOrder(Markdown.dialects.Maruku.block);Markdown.buildInlinePatterns(Markdown.dialects.Maruku.inline);var isArray=Array.isArray||function(obj){return Object.prototype.toString.call(obj)=='[object Array]';};var forEach;if(Array.prototype.forEach){forEach=function(arr,cb,thisp){return arr.forEach(cb,thisp);};}
else{forEach=function(arr,cb,thisp){for(var i=0;i<arr.length;i++){cb.call(thisp||arr,arr[i],i,arr);}}}
function extract_attr(jsonml){return isArray(jsonml)&&jsonml.length>1&&typeof jsonml[1]==="object"&&!(isArray(jsonml[1]))?jsonml[1]:undefined;}
expose.renderJsonML=function(jsonml,options){options=options||{};options.root=options.root||false;var content=[];if(options.root){content.push(render_tree(jsonml));}
else{jsonml.shift();if(jsonml.length&&typeof jsonml[0]==="object"&&!(jsonml[0]instanceof Array)){jsonml.shift();}
while(jsonml.length){content.push(render_tree(jsonml.shift()));}}
return content.join("\n\n");};function escapeHTML(text){return text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");}
function render_tree(jsonml){if(typeof jsonml==="string"){return escapeHTML(jsonml);}
var tag=jsonml.shift(),attributes={},content=[];if(jsonml.length&&typeof jsonml[0]==="object"&&!(jsonml[0]instanceof Array)){attributes=jsonml.shift();}
while(jsonml.length){content.push(arguments.callee(jsonml.shift()));}
var tag_attrs="";for(var a in attributes){tag_attrs+=" "+a+'="'+escapeHTML(attributes[a])+'"';}
if(tag=="img"||tag=="br"||tag=="hr"){return"<"+tag+tag_attrs+"/>";}
else{return"<"+tag+tag_attrs+">"+content.join("")+"</"+tag+">";}}
function convert_tree_to_html(tree,references,options){var i;options=options||{};var jsonml=tree.slice(0);if(typeof options.preprocessTreeNode==="function"){jsonml=options.preprocessTreeNode(jsonml,references);}
var attrs=extract_attr(jsonml);if(attrs){jsonml[1]={};for(i in attrs){jsonml[1][i]=attrs[i];}
attrs=jsonml[1];}
if(typeof jsonml==="string"){return jsonml;}
switch(jsonml[0]){case"header":jsonml[0]="h"+jsonml[1].level;delete jsonml[1].level;break;case"bulletlist":jsonml[0]="ul";break;case"numberlist":jsonml[0]="ol";break;case"listitem":jsonml[0]="li";break;case"para":jsonml[0]="p";break;case"markdown":jsonml[0]="html";if(attrs)delete attrs.references;break;case"code_block":jsonml[0]="pre";i=attrs?2:1;var code=["code"];code.push.apply(code,jsonml.splice(i));jsonml[i]=code;break;case"inlinecode":jsonml[0]="code";break;case"img":jsonml[1].src=jsonml[1].href;delete jsonml[1].href;break;case"linebreak":jsonml[0]="br";break;case"link":jsonml[0]="a";break;case"link_ref":jsonml[0]="a";var ref=references[attrs.ref];if(ref){delete attrs.ref;attrs.href=ref.href;if(ref.title){attrs.title=ref.title;}
delete attrs.original;}
else{return attrs.original;}
break;case"img_ref":jsonml[0]="img";var ref=references[attrs.ref];if(ref){delete attrs.ref;attrs.src=ref.href;if(ref.title){attrs.title=ref.title;}
delete attrs.original;}
else{return attrs.original;}
break;}
i=1;if(attrs){for(var key in jsonml[1]){i=2;}
if(i===1){jsonml.splice(i,1);}}
for(;i<jsonml.length;++i){jsonml[i]=arguments.callee(jsonml[i],references,options);}
return jsonml;}
function merge_text_nodes(jsonml){var i=extract_attr(jsonml)?2:1;while(i<jsonml.length){if(typeof jsonml[i]==="string"){if(i+1<jsonml.length&&typeof jsonml[i+1]==="string"){jsonml[i]+=jsonml.splice(i+1,1)[0];}
else{++i;}}
else{arguments.callee(jsonml[i]);++i;}}}})((function(){if(typeof exports==="undefined"){window.markdown={};return window.markdown;}
else{return exports;}})());