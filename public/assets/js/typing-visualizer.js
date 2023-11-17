function TypingVisualizer(t){t||(t={}),this.deltaX=3,this.vpMaxHeight=16,this.typingLength=7,this.vpAlpha=.5,this.timeDown=(new Date).getTime(),this.timeUp=(new Date).getTime(),this.targets={},this.showTDNALogo=void 0===t.showTDNALogo||t.showTDNALogo,this.logoHeight=16,this.scrollOffset=18,this.setStyle=function(t,e){if(void 0!==t)for(var i in e)e.hasOwnProperty(i)&&(t.style[i]=e[i])};var e=this;this.keyDown=function(t){e.timeDown=(new Date).getTime()},this.keyUp=function(t){var i=e.targets[t.target.id];if(void 0!==i){var n=e.timeUp;e.timeUp=(new Date).getTime();var s=Math.min(500,e.timeUp-n)/500,a=Math.min(180,e.timeUp-e.timeDown)/180;if(8==t.keyCode||46==t.keyCode)i.deleteKeyData();else if(13!=t.keyCode&&9!=t.keyCode){var o=2+Math.round(s*(.8*e.vpMaxHeight)),r=e.vpMaxHeight-o,h=Math.round(a*e.vpMaxHeight);h>r&&(h=r);var l=2+i.visualPattern.length*(e.deltaX+1),g=1+e.vpMaxHeight-(o+h),p=e.vpAlpha;e.vpAlpha=s;var c=4*Math.abs(e.vpAlpha-p);c=c>1?.3:1.3-c,i.addKeyData([l,g,e.deltaX,o,c])}}},this.onChange=function(t){var i=e.targets[t.target.id];void 0!==i&&i.updatePosition()}}TypingVisualizer.prototype.removeTarget=function(t){if(void 0!==t){"object"!=typeof t&&(t=[t]);for(var e=0;e<t.length;e++){var i;(i="string"==typeof t[e]?document.getElementById(t[e]):t[e])&&this.targets.hasOwnProperty(i.id)&&(this.targets[i.id].removeEventListener("input",this.onChange),delete this.targets[i.id])}}},TypingVisualizer.prototype.addTarget=function(t){if(void 0!==t){"object"!=typeof t&&(t=[t]);for(var e=this,i=0;i<t.length;i++){var n;if((n="string"==typeof t[i]?document.getElementById(t[i]):t[i])&&!this.targets.hasOwnProperty(n.id)){var s=this.generateCanvas(n),a=n.parentNode,o=document.createElement("DIV");if(this.setStyle(o,{position:"relative"}),s&&a&&o.appendChild(s.container)){n.addEventListener("input",e.onChange),void 0!==n.style.width&&(this.setStyle(o,{position:"relative",width:n.style.width}),n.style.width="100%");var r=n.scrollHeight>n.clientHeight?this.scrollOffset:0;this.setStyle(s.container,{position:"absolute",width:this.typingLength*(e.deltaX+2)+"px",height:"100%",right:(this.showTDNALogo?this.logoHeight+8+r:r+6)+"px",top:0,"z-index":3}),a.insertBefore(o,n),o.appendChild(n);var h,l=s.container.getBoundingClientRect();s.canvas.width=l.width||this.typingLength*(e.deltaX+2),s.canvas.height=Math.min(l.height||this.vpMaxHeight,this.vpMaxHeight),this.setStyle(s.canvas,{"margin-top":"6px"}),this.setStyle(n,{"padding-right":s.canvas.width+6+(this.showTDNALogo?this.logoHeight+4:0)+"px"}),this.showTDNALogo&&(h=this.generateTDNALogo(),this.setStyle(h,{position:"absolute",right:r+6+"px",top:"0","margin-top":"6px","line-height":this.logoHeight+"px","z-index":3}),o.appendChild(h),"undefined"!=typeof tippy&&tippy(h)),this.targets[n.id]={element:n,canvas:s.canvas,canvasContainer:s.container,canvasContext:s.canvas.getContext("2d"),logo:h,visualPattern:[],scrollOffset:18,hasScroll:n.scrollHeight>n.clientHeight,hasVerticalScroll:function(){return this.element.scrollHeight>this.element.clientHeight},clearCanvas:function(){this.canvasContext&&this.canvasContext.clearRect(0,0,120,30)},addKeyData:function(t){this.visualPattern.push(t),this.update()},deleteKeyData:function(){this.visualPattern.pop(),this.update()},updatePosition:function(){var t=this.hasVerticalScroll();this.hasScroll!==t&&(this.hasScroll=t,this.logo.style.right=parseInt(this.logo.style.right)+(t?this.scrollOffset:-this.scrollOffset)+"px",this.canvasContainer.style.right=parseInt(this.canvasContainer.style.right)+(t?this.scrollOffset:-this.scrollOffset)+"px")},update:function(){this.updatePosition();for(var t=this.visualPattern.slice(-e.typingLength);t.length<e.typingLength;)t.unshift([0,0,0,0,0]);this.clearCanvas();for(var i=0;i<t.length;i++)this.canvasContext.fillStyle="rgba(256, 110, 0, "+t[i][4]+")",this.canvasContext.fillRect(i*(e.deltaX+2),t[i][1],t[i][2],t[i][3])}}}}}this.initListeners()}},TypingVisualizer.prototype.generateTDNALogo=function(){var t=document.createElement("A");t.href="javascript: void(0)",t.setAttribute("tabindex",-1),t.setAttribute("data-toggle","popover"),t.setAttribute("data-trigger","focus"),t.setAttribute("data-content","Protected by TypingDNA"),t.setAttribute("title","Protected by TypingDNA"),t.setAttribute("data-placement","left");var e=document.createElement("IMG");return this.setStyle(e,{height:this.logoHeight+"px",width:this.logoHeight+"px","vertical-align":"top"}),e.src="https://www.typingdna.com/assets/images/external/icon-48.png",e.alt="Protected by TypingDNA",t.appendChild(e),t},TypingVisualizer.prototype.generateCanvas=function(t){if(void 0!==t){var e=document.createElement("DIV"),i=document.createElement("CANVAS");return e.appendChild(i),{canvas:i,container:e}}},TypingVisualizer.prototype.init=function(){for(var t in this.targets)this.targets.hasOwnProperty(t)&&(this.targets[t].visualPattern=[]);this.initListeners()},TypingVisualizer.prototype.clearCanvas=function(t){if(void 0===t)this.targets.hasOwnProperty(t)&&this.targets[t].canvas.clearRect(0,0,120,30);else for(var e in this.targets)this.targets.hasOwnProperty(e)&&this.targets[e].canvas&&this.targets[e].canvas.clearRect(0,0,120,30)},TypingVisualizer.prototype.initListeners=function(){document.removeEventListener("keyup",this.keyUp),document.removeEventListener("keydown",this.keyDown),TypingVisualizer.isEmpty(this.targets)||(document.addEventListener("keyup",this.keyUp),document.addEventListener("keydown",this.keyDown))},TypingVisualizer.isEmpty=function(t){for(var e in t)if(t.hasOwnProperty(e))return!1;return!0};