function TypingDNA(){if(!0===TypingDNA.initialized)return TypingDNA.instance;TypingDNA.prototype.start=function(){return TypingDNA.start.apply(this,arguments)},TypingDNA.prototype.stop=function(){return TypingDNA.stop.apply(this,arguments)},TypingDNA.prototype.reset=function(){return TypingDNA.reset.apply(this,arguments)},TypingDNA.prototype.addTarget=function(){return TypingDNA.addTarget.apply(this,arguments)},TypingDNA.prototype.removeTarget=function(){return TypingDNA.removeTarget.apply(this,arguments)},TypingDNA.prototype.getTypingPattern=function(){return TypingDNA.getTypingPattern.apply(this,arguments)},TypingDNA.prototype.getMouseDiagram=function(){return TypingDNA.getMouseDiagram.apply(this,arguments)},TypingDNA.prototype.startMouse=function(){return TypingDNA.startMouse.apply(this,arguments)},TypingDNA.prototype.stopMouse=function(){return TypingDNA.stopMouse.apply(this,arguments)},TypingDNA.prototype.getQuality=function(){return TypingDNA.getQuality.apply(this,arguments)},TypingDNA.prototype.getLength=function(){return TypingDNA.getLength.apply(this,arguments)},TypingDNA.prototype.isMobile=function(){return TypingDNA.isMobile.apply(this,arguments)},TypingDNA.prototype.getTextId=function(){return TypingDNA.getTextId.apply(this,arguments)},TypingDNA.prototype.checkEnvironment=function(){return TypingDNA.checkEnvironment.apply(this,arguments)},TypingDNA.prototype.get=function(){return TypingDNA.get.apply(this,arguments)},TypingDNA.prototype.startDiagram=function(){},TypingDNA.prototype.stopDiagram=function(){},TypingDNA.prototype.getDiagram=function(){return TypingDNA.getDiagram.apply(this,arguments)},TypingDNA.prototype.getExtendedDiagram=function(){return TypingDNA.getExtendedDiagram.apply(this,arguments)},TypingDNA.initialized=!0,TypingDNA.prototype.maxHistoryLength=TypingDNA.maxHistoryLength,TypingDNA.prototype.defaultHistoryLength=TypingDNA.defaultHistoryLength,TypingDNA.prototype.maxSeekTime=TypingDNA.maxSeekTime,TypingDNA.prototype.maxPressTime=TypingDNA.maxPressTime,TypingDNA.version=3.1,TypingDNA.cookieId=0,TypingDNA.flags=0,TypingDNA.instance=this,TypingDNA.document=document,TypingDNA.ua=window.navigator.userAgent,TypingDNA.platform=window.navigator.platform,TypingDNA.maxHistoryLength=2e3,TypingDNA.maxSeekTime=1500,TypingDNA.maxPressTime=300,TypingDNA.defaultHistoryLength=160,TypingDNA.spKeyCodes=[8,13,32],TypingDNA.spKeyCodesObj={8:1,13:1,32:1},TypingDNA.keyCodes=[65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,32,222,188,190,186,187,189,191,48,49,50,51,52,53,54,55,56,57],TypingDNA.keyCodesObj={};for(var i=TypingDNA.keyCodes.length,n=0;n<i;n++)TypingDNA.keyCodesObj[TypingDNA.keyCodes[n]]=1;TypingDNA.pt1=TypingDNA.ut1=(new Date).getTime(),TypingDNA.wfk=[],TypingDNA.sti=[],TypingDNA.skt=[],TypingDNA.recording=!0,TypingDNA.mouseRecording=!0,TypingDNA.mouseMoveRecording=!1,TypingDNA.spKeyRecording=!0,TypingDNA.diagramRecording=!0,TypingDNA.motionFixedData=!0,TypingDNA.motionArrayData=!0,TypingDNA.dwfk=[],TypingDNA.dsti=[],TypingDNA.dskt=[],TypingDNA.drkc=[],TypingDNA.dlastDownKey,TypingDNA.prevKeyCode=0,TypingDNA.maxMoveDeltaTime=600,TypingDNA.maxScrollDeltaTime=800,TypingDNA.maxStopTime=1500,TypingDNA.maxClickTime=600,TypingDNA.maxMouseHistoryLength=500,TypingDNA.lastMouseMoveTime=TypingDNA.lastMouseDownTime=(new Date).getTime(),TypingDNA.stopTimes=[],TypingDNA.clickTimes=[],TypingDNA.lastMouseStop=!1,TypingDNA.zl=1e-7,TypingDNA.ACInputLengths={inputs:[],lastLength:[]},TypingDNA.targetIds=[],TypingDNA.lastTarget="",TypingDNA.lastTargetFound=!1,TypingDNA.replaceMissingKeys=!0,TypingDNA.replaceMissingKeysPerc=7,TypingDNA.pressCalculated=!1,TypingDNA.pressRecorded=!1,TypingDNA.checkEnvironment=function(){var i={browserType:"",isMobile:1===this.isMobile(),hasMotionSensors:!1,needsPermissionForMotionSensors:!1};return(window.chrome&&(window.chrome.webstore||window.chrome.runtime||window.chrome.loadTimes)||window.opr&&opr.addons||window.opera||navigator.userAgent.indexOf(" OPR/")>=0)&&window.CSS?i.browserType="blink":window.opr&&window.opr.addons||window.opera||navigator.userAgent.indexOf(" OPR/")>=0?i.browserType="opera":"undefined"!=typeof InstallTrigger?i.browserType="firefox":document.documentMode?i.browserType="internet explorer":!document.documentMode&&window.StyleMedia?i.browserType="edge":window.chrome&&(window.chrome.webstore||window.chrome.runtime||window.chrome.loadTimes)&&-1!=navigator.userAgent.indexOf("Edg")?i.browserType="edge chromium":window.chrome&&(window.chrome.webstore||window.chrome.runtime||window.chrome.loadTimes)?i.browserType="chrome":(/constructor/i.test(window.HTMLElement)||"[object SafariRemoteNotification]"===(!window.safari||"undefined"!=typeof safari&&safari.pushNotification).toString()||navigator.userAgent.indexOf("Safari")>-1&&-1===navigator.userAgent.indexOf("Chrome"))&&(i.browserType="safari"),i.isMobile&&(i.hasMotionSensors=void 0!==window.DeviceMotionEvent,i.needsPermissionForMotionSensors=void 0!==window.DeviceMotionEvent&&"function"==typeof window.DeviceMotionEvent.requestPermission),i},TypingDNA.keyDown=function(i){if((TypingDNA.recording||TypingDNA.diagramRecording)&&TypingDNA.isTarget(i.target.id)){var n=i.keyCode;1===TypingDNA.wfk[n]||TypingDNA.dwfk[n];var e=TypingDNA.pt1;TypingDNA.pt1=(new Date).getTime();var t=TypingDNA.pt1-e,p=TypingDNA.pt1;(!0===TypingDNA.recording||TypingDNA.spKeyCodesObj[n]&&!0===TypingDNA.spKeyRecording)&&(i.shiftKey||(TypingDNA.wfk[n]=1,TypingDNA.skt[n]=t,TypingDNA.sti[n]=p)),!0===TypingDNA.diagramRecording&&(TypingDNA.dwfk[n]=1,TypingDNA.dskt[n]=t,TypingDNA.dsti[n]=p,TypingDNA.dlastDownKey=n)}},TypingDNA.keyPress=function(i){if((TypingDNA.recording||TypingDNA.diagramRecording)&&TypingDNA.isTarget(i.target.id)&&!0===TypingDNA.diagramRecording){var n=TypingDNA.dlastDownKey;TypingDNA.drkc[n]=i.charCode}},TypingDNA.keyUp=function(i){if((TypingDNA.recording||TypingDNA.diagramRecording)&&TypingDNA.isTarget(i.target.id)){var n=(new Date).getTime(),e=i.keyCode,t=0;if(!0===TypingDNA.recording||TypingDNA.spKeyCodesObj[e]&&!0===TypingDNA.spKeyRecording){if(!i.shiftKey&&1===TypingDNA.wfk[e]){t=n-TypingDNA.sti[e];var p=[e,TypingDNA.skt[e],t,TypingDNA.prevKeyCode,n,i.target.id];TypingDNA.history.add(p),TypingDNA.prevKeyCode=e}TypingDNA.wfk[e]=0}if(!0===TypingDNA.diagramRecording){if(void 0!==TypingDNA.drkc[e]&&0!==TypingDNA.drkc[e]&&1===TypingDNA.dwfk[e]){t=n-TypingDNA.dsti[e];var g=[e,TypingDNA.dskt[e],t,TypingDNA.drkc[e],n,i.target.id];TypingDNA.history.addDiagram(g)}TypingDNA.dwfk[e]=0}}},TypingDNA.MobileKeyDown=function(i){if((TypingDNA.recording||TypingDNA.diagramRecording)&&TypingDNA.isTarget(i.target.id)){var n=i.keyCode;1===TypingDNA.wfk[n]||TypingDNA.dwfk[n],TypingDNA.lastPressTime=(new Date).getTime(),(!0===TypingDNA.recording||TypingDNA.spKeyCodesObj[n]&&!0===TypingDNA.spKeyRecording)&&(TypingDNA.wfk[n]=1),!0===TypingDNA.diagramRecording&&(TypingDNA.dwfk[n]=1,TypingDNA.dlastDownKey=n)}},TypingDNA.MobileKeyPress=function(i){if((TypingDNA.recording||TypingDNA.diagramRecording)&&TypingDNA.isTarget(i.target.id)&&!0===TypingDNA.diagramRecording){var n=TypingDNA.dlastDownKey;TypingDNA.drkc[n]=i.charCode}},TypingDNA.MobileKeyUp=function(i){if((TypingDNA.recording||TypingDNA.diagramRecording)&&TypingDNA.isTarget(i.target.id)){var n=TypingDNA.ut1;TypingDNA.ut1=(new Date).getTime();var e=TypingDNA.ut1-n,t=TypingDNA.kpGetAll(),p=0!==t[0]?Math.round(TypingDNA.ut1-t[0]):0;isNaN(p)&&(p=0);var g=i.keyCode;if(!0===TypingDNA.recording||TypingDNA.spKeyCodesObj[g]&&!0===TypingDNA.spKeyRecording){if(1===TypingDNA.wfk[g]){var r=[g,e,p,TypingDNA.prevKeyCode,TypingDNA.ut1,i.target.id];TypingDNA.history.add(r),TypingDNA.prevKeyCode=g}TypingDNA.wfk[g]=0}if(!0===TypingDNA.diagramRecording){if(void 0!==TypingDNA.drkc[g]&&0!==TypingDNA.drkc[g]&&1===TypingDNA.dwfk[g]){var o=[g,e,p,TypingDNA.drkc[g],TypingDNA.ut1,i.target.id,t[1].join(","),t[2].join(","),t[3].join(","),t[4].join(",")];TypingDNA.history.addDiagram(o)}TypingDNA.dwfk[g]=0}}},TypingDNA.AndroidKeyDown=function(i){(TypingDNA.recording||TypingDNA.diagramRecording)&&TypingDNA.isTarget(i.target.id)&&(TypingDNA.lastPressTime=(new Date).getTime(),-1===TypingDNA.ACInputLengths.inputs.indexOf(i.target)&&(TypingDNA.ACInputLengths.inputs.push(i.target),TypingDNA.ACInputLengths.lastLength.push(0)))},TypingDNA.AndroidKeyUp=function(i){if(TypingDNA.recording||TypingDNA.diagramRecording){var n=TypingDNA.ut1;if(TypingDNA.ut1=(new Date).getTime(),TypingDNA.isTarget(i.target.id)){var e=TypingDNA.ut1-n,t=TypingDNA.kpGetAll(),p=0!==t[0]?Math.round(TypingDNA.ut1-t[0]):0;isNaN(p)&&(p=0);var g=i.keyCode,r=TypingDNA.ACInputLengths.inputs.indexOf(i.target);-1===r&&(TypingDNA.ACInputLengths.inputs.push(i.target),TypingDNA.ACInputLengths.lastLength.push(0),r=TypingDNA.ACInputLengths.inputs.indexOf(i.target));var o=0;if(i.target.value.length>=TypingDNA.ACInputLengths.lastLength[r]){var a=i.target.value.substr(i.target.selectionStart-1||0,1);g=a.toUpperCase().charCodeAt(0),o=a.charCodeAt(0)}TypingDNA.ACInputLengths.lastLength[r]=i.target.value.length;var s=[g,e,p,TypingDNA.prevKeyCode,TypingDNA.ut1,i.target.id];if(TypingDNA.history.add(s),TypingDNA.prevKeyCode=g,!0===TypingDNA.diagramRecording){var y=[g,e,p,o,TypingDNA.ut1,i.target.id,t[1].join(","),t[2].join(","),t[3].join(","),t[4].join(",")];TypingDNA.history.addDiagram(y)}}}},TypingDNA.mouseScroll=function(i){if(!0===TypingDNA.mouseRecording&&!0===TypingDNA.mouseMoveRecording)if(!0===TypingDNA.mouse.scrollStarted){var n=(new Date).getTime();TypingDNA.mouse.scrollTimes.push(n),TypingDNA.mouse.scrollTopArr.push(TypingDNA.document.body.scrollTop),clearInterval(TypingDNA.scrollInterval),TypingDNA.scrollInterval=setInterval(TypingDNA.mouse.checkScroll,TypingDNA.maxScrollDeltaTime)}else TypingDNA.mouse.scrollStarted=!0},TypingDNA.mouseMove=function(i){if(!0===TypingDNA.mouseRecording){var n=(new Date).getTime();!0===TypingDNA.mouseMoveRecording&&(!0===TypingDNA.mouse.started?(TypingDNA.mouse.times.push(n),TypingDNA.mouse.xPositions.push(i.screenX),TypingDNA.mouse.yPositions.push(i.screenY),clearInterval(TypingDNA.moveInterval),TypingDNA.moveInterval=setInterval(TypingDNA.mouse.checkMove,TypingDNA.maxMoveDeltaTime)):TypingDNA.mouse.started=!0),TypingDNA.lastMouseMoveTime=n}},TypingDNA.mouseDown=function(i){if(!0===TypingDNA.mouseRecording&&(TypingDNA.mouse.checkMove(),TypingDNA.mouse.checkScroll(),1===i.which)){TypingDNA.lastMouseDownTime=(new Date).getTime();var n=TypingDNA.lastMouseDownTime-TypingDNA.lastMouseMoveTime;if(n<TypingDNA.maxStopTime&&!1===TypingDNA.lastMouseStop&&(TypingDNA.stopTimes.push(n),!0===TypingDNA.mouseMoveRecording)){var e=[3,n];TypingDNA.mouse.history.add(e),TypingDNA.lastMouseStop=!0}}},TypingDNA.mouseUp=function(i){if(!0===TypingDNA.mouseRecording&&1===i.which){var n=(new Date).getTime()-TypingDNA.lastMouseDownTime;if(n<TypingDNA.maxClickTime&&TypingDNA.clickTimes.push(n),!0===TypingDNA.mouseMoveRecording)if(!0===TypingDNA.mouse.started)TypingDNA.mouse.checkMove(!0);else{var e=[4,n];TypingDNA.mouse.history.add(e)}}},TypingDNA.isMobile=function(){if(void 0!==TypingDNA.mobile)return TypingDNA.mobile;var i,n=0;return i=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(i)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(i.substr(0,4)))&&(n=1),TypingDNA.mobile=n,n},TypingDNA.isAndroid=function(){return/Android/i.test(navigator.userAgent)},TypingDNA.isFirefox=function(){return/Firefox/i.test(navigator.userAgent)},TypingDNA.isTarget=function(i){if(TypingDNA.lastTarget===i&&TypingDNA.lastTargetFound)return!0;var n=TypingDNA.targetIds.length,e=!1;if(n>0){for(var t=0;t<n;t++)if(TypingDNA.targetIds[t]===i){e=!0;break}return TypingDNA.lastTarget=i,TypingDNA.lastTargetFound=e,e}return TypingDNA.lastTarget=i,TypingDNA.lastTargetFound=!0,!0},TypingDNA.kpAccZ=[],TypingDNA.kpX=[],TypingDNA.kpY=[],TypingDNA.kpTimes=[],TypingDNA.kpLastZ=0,TypingDNA.kpLastAccX=0,TypingDNA.kpLastAccY=0,TypingDNA.kpLastPitch=0,TypingDNA.kpLastRoll=0,TypingDNA.lastPressTime=0,TypingDNA.hasDeviceMotion=!1,TypingDNA.hasDeviceOrientation=!1,TypingDNA.deviceMotionHandler=function(i){TypingDNA.kpTimes.push((new Date).getTime());var n=Math.round(100*i.accelerationIncludingGravity.x),e=Math.round(100*i.accelerationIncludingGravity.y),t=Math.round(100*i.accelerationIncludingGravity.z);if(i.rotationRate)var p=Math.round(10*i.rotationRate.alpha),g=Math.round(10*i.rotationRate.beta),r=Math.round(10*i.rotationRate.gamma);TypingDNA.kpLastAccX=n,TypingDNA.kpLastAccY=e,TypingDNA.kpAccZ.push(t),TypingDNA.kpX.push(p),TypingDNA.kpY.push(g),TypingDNA.kpLastZ=r,TypingDNA.kpLastPitch=Math.floor(180*Math.atan2(-e,Math.sqrt(Math.pow(n,2)+Math.pow(t,2)))/Math.PI*10),TypingDNA.kpLastRoll=Math.floor(180*Math.atan2(-n,Math.sqrt(Math.pow(e,2)+Math.pow(t,2)))/Math.PI*10),TypingDNA.kpX.length>21&&(TypingDNA.kpTimes.shift(),TypingDNA.kpAccZ.shift(),TypingDNA.kpX.shift(),TypingDNA.kpY.shift()),TypingDNA.hasDeviceMotion||(TypingDNA.hasDeviceMotion=!0,TypingDNA.hasDeviceOrientation=!0)},1===TypingDNA.isMobile()?(TypingDNA.isAndroid()?TypingDNA.isFirefox()?(TypingDNA.document.addEventListener("input",TypingDNA.AndroidKeyUp),TypingDNA.document.addEventListener("keydown",TypingDNA.AndroidKeyDown)):(TypingDNA.document.addEventListener("keyup",TypingDNA.AndroidKeyUp),TypingDNA.document.addEventListener("keydown",TypingDNA.AndroidKeyDown)):(TypingDNA.document.addEventListener("keyup",TypingDNA.MobileKeyUp),TypingDNA.document.addEventListener("keydown",TypingDNA.MobileKeyDown),TypingDNA.document.addEventListener("keypress",TypingDNA.MobileKeyPress)),void 0!==window.DeviceMotionEvent&&window.addEventListener("devicemotion",TypingDNA.deviceMotionHandler)):TypingDNA.document.addEventListener?(TypingDNA.document.addEventListener("keyup",TypingDNA.keyUp),TypingDNA.document.addEventListener("keydown",TypingDNA.keyDown),TypingDNA.document.addEventListener("keypress",TypingDNA.keyPress),TypingDNA.document.addEventListener("mousemove",TypingDNA.mouseMove),TypingDNA.document.addEventListener("mousedown",TypingDNA.mouseDown),TypingDNA.document.addEventListener("mouseup",TypingDNA.mouseUp),TypingDNA.document.addEventListener("scroll",TypingDNA.mouseScroll)):TypingDNA.document.attachEvent?(TypingDNA.document.attachEvent("onkeyup",TypingDNA.keyUp),TypingDNA.document.attachEvent("onkeydown",TypingDNA.keyDown),TypingDNA.document.attachEvent("onkeypress",TypingDNA.keyPress),TypingDNA.document.attachEvent("onmousemove",TypingDNA.mouseMove),TypingDNA.document.attachEvent("onmousedown",TypingDNA.mouseDown),TypingDNA.document.attachEvent("onmouseup",TypingDNA.mouseUp),TypingDNA.document.attachEvent("onscroll",TypingDNA.mouseScroll)):console.log("browser not supported"),TypingDNA.kpADifArr=function(i){var n=i.length-1,e=[0];if(n<2)return[[0],[0]];for(var t=[],p=[],g=0;g<n;g++)e.push(i[g+1]-i[g]);for(g=0;g<n;g++){var r=e[g+1]-e[g];t.push(r),p.push(Math.abs(r))}return[t,p]},TypingDNA.kpRDifArr=function(i){var e=i.length-2,t=[];if(e<0)return[[0],[0]];var p=0,g=0,r=0,o=0,a=0;if(e>0)for(n=0;n<e;n++)a=i[n+1]-i[n],t.push(a),a>=p?(p=a,r=n):a<=g&&(g=a,o=n);else a=i[1]-i[0],t.push(a);return[t,[r-1,r,r+1,r+2,r+3,o-1,o,o+1,o+2,o+3]]},TypingDNA.kpGetAll=function(){var i=0,e=[];if(TypingDNA.kpAccZ.length<2)return[i=TypingDNA.hasDeviceMotion&&TypingDNA.hasDeviceOrientation?0:TypingDNA.lastPressTime,e=[0,0,0,0,0,0,TypingDNA.kpLastPitch,TypingDNA.kpLastRoll],[0],[0],[0]];[kpza,kpzaAbs]=TypingDNA.kpADifArr(TypingDNA.kpAccZ),[kpXR,kpxPos]=TypingDNA.kpRDifArr(TypingDNA.kpX),[kpYR,kpyPos]=TypingDNA.kpRDifArr(TypingDNA.kpY),TypingDNA.kpX.shift(),TypingDNA.kpY.shift(),TypingDNA.kpAccZ.shift(),TypingDNA.kpTimes.shift();var t=kpxPos.concat(kpyPos);t=t.sort();var p=[];for(n=1;n<t.length;n++)t[n]!==t[n-1]&&p.push(t[n]);var g=0,r=TypingDNA.kpTimes[TypingDNA.kpTimes.length-1];for(n=0;n<p.length;n++){var o=p[n];o>(kpzaAbs.length>8?2:kpzaAbs.length>4?1:0)&&void 0!==kpzaAbs[o]&&kpzaAbs[o]>g&&(g=kpzaAbs[o],r=TypingDNA.kpTimes[o])}return i=r,e=[TypingDNA.kpLastAccX,TypingDNA.kpLastAccY,TypingDNA.kpAccZ.pop(),TypingDNA.kpX.pop(),TypingDNA.kpY.pop(),TypingDNA.kpLastZ,TypingDNA.kpLastPitch,TypingDNA.kpLastRoll],TypingDNA.kpX=[],TypingDNA.kpY=[],TypingDNA.kpAccZ=[],TypingDNA.kpTimes=[],TypingDNA.pressCalculated||(TypingDNA.pressCalculated=!0),[i,e,kpza,kpXR,kpYR]},TypingDNA.mouse={},TypingDNA.mouse.times=[],TypingDNA.mouse.xPositions=[],TypingDNA.mouse.yPositions=[],TypingDNA.mouse.scrollTimes=[],TypingDNA.mouse.scrollTopArr=[],TypingDNA.mouse.history={},TypingDNA.mouse.history.stack=[],TypingDNA.mouse.getDistance=function(i,n){return Math.sqrt(i*i+n*n)},TypingDNA.mouse.getTotalDistance=function(i,e){var t=0,p=i.length;for(n=1;n<p-1;n++){var g=i[n]-i[n-1],r=e[n]-e[n-1];t+=TypingDNA.mouse.getDistance(g,r)}return t},TypingDNA.mouse.getAngle=function(i,n){var e=n<0;return i>=0?e?180+Math.round(Math.atan(Math.abs(i)/(Math.abs(n)+1e-7))/.01745329251):90-Math.round(Math.atan(Math.abs(i)/(Math.abs(n)+1e-7))/.01745329251)+270:e?90-Math.round(Math.atan(Math.abs(i)/(Math.abs(n)+1e-7))/.01745329251)+90:Math.round(Math.atan(Math.abs(i)/(Math.abs(n)+1e-7))/.01745329251)},TypingDNA.mouse.recordMoveAction=function(i){var n=TypingDNA.mouse.times.length;if(!(n<3)){for(var e=TypingDNA.mouse.times[n-1]-TypingDNA.mouse.times[0],t=TypingDNA.mouse.xPositions[n-1]-TypingDNA.mouse.xPositions[0],p=TypingDNA.mouse.yPositions[n-1]-TypingDNA.mouse.yPositions[0],g=Math.round(TypingDNA.mouse.getDistance(t,p)),r=Math.round(TypingDNA.mouse.getTotalDistance(TypingDNA.mouse.xPositions,TypingDNA.mouse.yPositions)),o=Math.round(100*r/g),a=[!0===i?5:1,e,g,Math.round(100*g/e),TypingDNA.mouse.getAngle(t,p),o],s=a.length,y=0;y<s;y++)if(isNaN(a[y]))return;TypingDNA.mouse.history.add(a),TypingDNA.lastMouseStop=!1}},TypingDNA.mouse.recordScrollAction=function(){var i=TypingDNA.mouse.scrollTimes.length;if(!(i<2)){for(var n=TypingDNA.mouse.scrollTimes[i-1]-TypingDNA.mouse.scrollTimes[0],e=TypingDNA.mouse.scrollTopArr[i-1]-TypingDNA.mouse.scrollTopArr[0],t=[2,n,e,Math.round(100*e/n)],p=t.length,g=0;g<p;g++)if(isNaN(t[g])&&!isFinite(t[g]))return;TypingDNA.mouse.history.add(t)}},TypingDNA.mouse.history.add=function(i){this.stack.push(i),this.stack.length>TypingDNA.maxMouseHistoryLength&&this.stack.shift()},TypingDNA.mouse.history.getDiagram=function(){var i=this.stack.join("|");return[String(TypingDNA.isMobile())+","+String(TypingDNA.version)+","+TypingDNA.flags+",9,0,0,"+TypingDNA.getSpecialKeys()+","+TypingDNA.getDeviceSignature(),i].join("|")},TypingDNA.mouse.clearLastMove=function(){TypingDNA.mouse.times=[],TypingDNA.mouse.xPositions=[],TypingDNA.mouse.yPositions=[]},TypingDNA.mouse.checkMove=function(i){clearInterval(TypingDNA.moveInterval),!0===TypingDNA.mouse.started&&(TypingDNA.mouse.started=!1,TypingDNA.mouse.recordMoveAction(i),TypingDNA.mouse.clearLastMove())},TypingDNA.mouse.clearLastScroll=function(){TypingDNA.mouse.scrollTimes=[],TypingDNA.mouse.scrollTopArr=[]},TypingDNA.mouse.checkScroll=function(){clearInterval(TypingDNA.scrollInterval),!0===TypingDNA.mouse.scrollStarted&&(TypingDNA.mouse.scrollStarted=!1,TypingDNA.mouse.recordScrollAction(),TypingDNA.mouse.clearLastScroll())},TypingDNA.addTarget=function(i){var n=TypingDNA.targetIds.length,e=!1;if(n>0){for(var t=0;t<n;t++)if(TypingDNA.targetIds[t]===i){e=!0;break}e||TypingDNA.targetIds.push(i)}else TypingDNA.targetIds.push(i)},TypingDNA.removeTarget=function(i){var n=TypingDNA.targetIds.length;if(n>0)for(var e=0;e<n;e++)if(TypingDNA.targetIds[e]===i){TypingDNA.targetIds.splice(e,1);break}},TypingDNA.reset=function(i){TypingDNA.history.stack=[],TypingDNA.history.stackDiagram=[],TypingDNA.clickTimes=[],TypingDNA.stopTimes=[],TypingDNA.ACInputLengths={inputs:[],lastLength:[]},!0===i&&(TypingDNA.mouse.history.stack=[])},TypingDNA.start=function(){return TypingDNA.diagramRecording=!0,TypingDNA.recording=!0},TypingDNA.stop=function(){return TypingDNA.diagramRecording=!1,TypingDNA.recording=!1},TypingDNA.startMouse=function(){return TypingDNA.mouseRecording=TypingDNA.mouseMoveRecording=!0},TypingDNA.stopMouse=function(){return TypingDNA.mouseRecording=TypingDNA.mouseMoveRecording=!1},TypingDNA.resetMouse=function(i){!0===i&&(TypingDNA.clickTimes=[],TypingDNA.stopTimes=[]),TypingDNA.mouse.history.stack=[]},TypingDNA.getTypingPattern=function(i){var n="";if("object"!=typeof i)return TypingDNA.get();switch(i.type){case 0:return TypingDNA.get(i.length,i.targetId);case 1:return n=void 0!==i.text?i.text:i.length,TypingDNA.history.getDiagram(i.extended,n,i.textId,i.targetId,i.caseSensitive);case 2:return n=void 0!==i.text?i.text:i.length,TypingDNA.history.getDiagram(!0,n,i.textId,i.targetId,i.caseSensitive);default:return TypingDNA.get(i.length)}},TypingDNA.getDiagram=function(i,n){return TypingDNA.history.getDiagram(!1,i,n,void 0,!1)},TypingDNA.getExtendedDiagram=function(i,n){return TypingDNA.history.getDiagram(!0,i,n,void 0,!1)},TypingDNA.getMouseDiagram=function(){return TypingDNA.mouse.history.getDiagram()},TypingDNA.getSpecialKeys=function(){return TypingDNA.history.getSpecialKeys()},TypingDNA.get=function(i,n){var e=TypingDNA.history.stack.length;void 0!==i&&0!==i||(i=TypingDNA.defaultHistoryLength),i>e&&(i=e);var t={},p=TypingDNA.history.get(i,"",n);t.arr=p[0];var g=p[1];void 0!==n&&""!==n&&(i=g);var r=TypingDNA.zl,o=i,a=TypingDNA.math.fo(TypingDNA.history.get(i,"seek",n)),s=TypingDNA.math.fo(TypingDNA.history.get(i,"press",n)),y=Math.round(TypingDNA.math.avg(s)),T=Math.round(TypingDNA.math.avg(a)),D=Math.round(TypingDNA.math.sd(s)),A=Math.round(TypingDNA.math.sd(a)),N=T+y,d=TypingDNA.math.rd((y+r)/(N+r),4),u=TypingDNA.math.rd((1-d)/d,4),c=TypingDNA.math.rd((D+r)/(y+r),4),m=TypingDNA.math.rd((A+r)/(y+r),4),h=Math.round(6e4/(N+r));0===o&&(h=0);var l=[];for(var v in t.arr){var f=t.arr[v][1].length,k=0,w=0,M=0,b=0,x=0,L=0;switch(t.arr[v][0].length){case 0:break;case 1:k=TypingDNA.math.rd((t.arr[v][0][0]+r)/(T+r),4);break;default:l=TypingDNA.math.fo(t.arr[v][0]),k=TypingDNA.math.rd((TypingDNA.math.avg(l)+r)/(T+r),4),b=TypingDNA.math.rd((TypingDNA.math.sd(l)+r)/(A+r),4)}switch(t.arr[v][1].length){case 0:break;case 1:w=TypingDNA.math.rd((t.arr[v][1][0]+r)/(y+r),4);break;default:l=TypingDNA.math.fo(t.arr[v][1]),w=TypingDNA.math.rd((TypingDNA.math.avg(l)+r)/(y+r),4),x=TypingDNA.math.rd((TypingDNA.math.sd(l)+r)/(D+r),4)}switch(t.arr[v][2].length){case 0:break;case 1:M=TypingDNA.math.rd((t.arr[v][2][0]+r)/(T+r),4);break;default:l=TypingDNA.math.fo(t.arr[v][2]),M=TypingDNA.math.rd((TypingDNA.math.avg(l)+r)/(T+r),4),L=TypingDNA.math.rd((TypingDNA.math.sd(l)+r)/(A+r),4)}delete t.arr[v][2],delete t.arr[v][1],delete t.arr[v][0],t.arr[v][0]=f,t.arr[v][1]=k,t.arr[v][2]=w,t.arr[v][3]=M,t.arr[v][4]=b,t.arr[v][5]=x,t.arr[v][6]=L}l=[],TypingDNA.apu(l,o),TypingDNA.apu(l,h),TypingDNA.apu(l,N),TypingDNA.apu(l,d),TypingDNA.apu(l,u),TypingDNA.apu(l,c),TypingDNA.apu(l,m),TypingDNA.apu(l,y),TypingDNA.apu(l,T),TypingDNA.apu(l,D),TypingDNA.apu(l,A);for(var C=0;C<=6;C++)for(v=0;v<44;v++){var I=TypingDNA.keyCodes[v],S=t.arr[I][C];0===S&&C>0&&(S=1),TypingDNA.apu(l,S)}return TypingDNA.apu(l,TypingDNA.isMobile()),TypingDNA.apu(l,TypingDNA.version),TypingDNA.apu(l,TypingDNA.flags),TypingDNA.apu(l,-1),TypingDNA.apu(l,o),TypingDNA.apu(l,0),l.push(TypingDNA.getSpecialKeys()),l.push(TypingDNA.getDeviceSignature()),l.join(",")},TypingDNA.apu=function(i,n){"NaN"===String(n)&&(n=0),i.push(n)},TypingDNA.math={},TypingDNA.math.rd=function(i,n){return Number(i.toFixed(n))},TypingDNA.math.avg=function(i){var n=i.length;if(n>0){for(var e=0,t=0;t<n;t++)e+=i[t];return this.rd(e/n,4)}return 0},TypingDNA.math.sd=function(i){var n=i.length;if(n<2)return 0;for(var e=0,t=this.avg(i),p=0;p<n;p++)e+=(i[p]-t)*(i[p]-t);return Math.sqrt(e/n)},TypingDNA.math.fo=function(i){if(i.length>1){var n=i.concat(),e=i.length;n.sort(function(i,n){return i-n});var t=this.sd(n),p=n[Math.ceil(i.length/2)],g=p+2*t,r=p-2*t;e<20&&(r=0);for(var o=[],a=0;a<e;a++){var s=n[a];s<g&&s>r&&o.push(s)}return o}return i},TypingDNA.math.fnv1aHash=function(i){if(void 0===i||"string"!=typeof i)return 0;var n,e,t=1914395348;for(n=0,e=(i=i.toLowerCase()).length;n<e;n++)t^=i.charCodeAt(n),t+=(t<<1)+(t<<4)+(t<<7)+(t<<8)+(t<<24);return t>>>0},TypingDNA.history={},TypingDNA.history.stack=[],TypingDNA.history.stackDiagram=[],TypingDNA.history.add=function(i){this.stack.push(i),this.stack.length>TypingDNA.maxHistoryLength&&this.stack.shift()},TypingDNA.history.addDiagram=function(i){this.stackDiagram.push(i)},TypingDNA.history.getDiagram=function(i,n,e,t,p){p=void 0!==p?p:void 0===n||""===n;var g=[],r=[],o=[],a=[],s=[],y=Boolean(TypingDNA.isMobile()),T=!0===i?1:0,D=this.stackDiagram,A={};if(void 0!==t&&""!==t&&D.length>0)D=TypingDNA.sliceStackByTargetId(D,t),void 0!==n&&""!==n||null!=(A=TypingDNA.document.getElementById(t))&&(n=A.value);else{var N=TypingDNA.targetIds.length;if(void 0===n||""===n)if(N>0){n="";for(var d=0;d<N;d++)null!=(A=TypingDNA.document.getElementById(TypingDNA.targetIds[d]))&&(n+=A.value)}else i||console.log("Please provide a fixed string param OR use the addTarget method.")}var u=0,c=D.length,m=c;"string"==typeof n?m=n.length:"number"==typeof n&&n<c&&(m=n);var h=0;void 0!==e?h=isNaN(parseInt(e))?TypingDNA.math.fnv1aHash(e):parseInt(e):"string"==typeof n&&(h=TypingDNA.math.fnv1aHash(n)),g.push([TypingDNA.isMobile(),TypingDNA.version,TypingDNA.flags,T,m,h,TypingDNA.getSpecialKeys(),TypingDNA.getDeviceSignature()]);var l=[],v=0,f=0,k=0,w=0;if(void 0!==n&&n.length>0&&"string"==typeof n){var M,b,x=n.toLowerCase(),L=n.toUpperCase(),C=[],I=0;for(d=0;d<n.length;d++){var S=n.charCodeAt(d);p||(b=(M=L.charCodeAt(d))!==S?M:x.charCodeAt(d));for(var P=I,R=c,K=!1;!1===K;){for(var E=P;E<R;E++)if((f=(l=D[E])[3])===S||!p&&f===b){if(K=!0,E===I)I++,C=[];else{C.push(E);var j=C.length;j>1&&C[j-1]===C[j-2]+1&&(I=E+1,C=[])}v=l[0],k=l[1],w=l[2],i?g.push([f,k,w,v]):g.push([k,w]),!0===y&&void 0!==l[6]&&l[6].length>0&&TypingDNA.hasDeviceMotion&&TypingDNA.hasDeviceOrientation&&(!0===TypingDNA.motionFixedData&&r.push(l[6]),!0===TypingDNA.motionArrayData&&(o.push(l[7]),a.push(l[8]),s.push(l[9])));break}if(!1===K)if(0!==P)P=0,R=I;else if(K=!0,TypingDNA.replaceMissingKeys){if(u++,"object"!=typeof TypingDNA.savedMissingAvgValues||TypingDNA.savedMissingAvgValues.historyLength!==c){var O=TypingDNA.math.fo(TypingDNA.history.get(0,"seek")),z=TypingDNA.math.fo(TypingDNA.history.get(0,"press"));k=Math.round(TypingDNA.math.avg(O)),w=Math.round(TypingDNA.math.avg(z)),TypingDNA.savedMissingAvgValues={seekTime:k,pressTime:w,historyLength:c}}else k=TypingDNA.savedMissingAvgValues.seekTime,w=TypingDNA.savedMissingAvgValues.pressTime;i?g.push([S,k,w,S,1]):g.push([k,w,1]),!0===y&&(!0===TypingDNA.motionFixedData&&r.push(""),!0===TypingDNA.motionArrayData&&(o.push(""),a.push(""),s.push("")));break}}if(TypingDNA.replaceMissingKeysPerc<100*u/m)return null}}else{var F=0;for("number"==typeof n&&(F=c-n),F<0&&(F=0),d=F;d<c;d++)v=(l=D[d])[0],k=l[1],w=l[2],i?(f=l[3],g.push([f,k,w,v])):g.push([k,w]),!0===y&&void 0!==l[6]&&l[6].length>0&&(!0===TypingDNA.motionFixedData&&r.push(l[6]),!0===TypingDNA.motionArrayData&&(o.push(l[7]),a.push(l[8]),s.push(l[9])))}var H=g.join("|");return!0===y&&(!0===TypingDNA.motionFixedData&&(H+="#"+r.join("|")),!0===TypingDNA.motionArrayData&&(H+="#"+o.join("|"),H+="/"+a.join("|"),H+="/"+s.join("|"))),H},TypingDNA.sliceStackByTargetId=function(i,e){var t=i.length,p=[];for(n=0;n<t;n++){var g=i[n];g[5]===e&&p.push(g)}return p},TypingDNA.history.get=function(n,e,t){var p=this.stack;void 0!==t&&""!==t&&p.length>0&&(p=TypingDNA.sliceStackByTargetId(p,t));var g=p.length;0!==n&&void 0!==n||(n=TypingDNA.defaultHistoryLength),n>g&&(n=g);var r=0,o=0;switch(e){case"seek":for(var a=[],s=1;s<=n;s++)(r=p[g-s][1])<=TypingDNA.maxSeekTime&&a.push(r);return a;case"press":var y=[];for(s=1;s<=n;s++)(o=p[g-s][2])<=TypingDNA.maxPressTime&&y.push(o);return y;default:var T={};for(s=0;s<i;s++)T[TypingDNA.keyCodes[s]]=[[],[],[]];for(s=1;s<=n;s++){var D=p[g-s],A=D[0];r=D[1],o=D[2];var N=D[3];TypingDNA.keyCodesObj[A]&&(r<=TypingDNA.maxSeekTime&&(T[A][0].push(r),0!==N&&TypingDNA.keyCodesObj[N]&&T[N][2].push(r)),o<=TypingDNA.maxPressTime&&T[A][1].push(o))}return[T,n]}},TypingDNA.history.getSpecialKeys=function(){for(var i=[],n=this.stack.length,e={},t=TypingDNA.spKeyCodes.length,p={},g=0;g<t;g++)e[TypingDNA.spKeyCodes[g]]=[[]];for(g=1;g<=n;g++)if(p=this.stack[n-g],TypingDNA.spKeyCodesObj[p[0]]){var r=p[0],o=p[2];o<=TypingDNA.maxPressTime&&e[r][0].push(o)}for(g=0;g<t;g++){var a=(p=TypingDNA.math.fo(e[TypingDNA.spKeyCodes[g]][0])).length;i.push(a),a>1?(i.push(Math.round(TypingDNA.math.avg(p))),i.push(Math.round(TypingDNA.math.sd(p)))):1===a?i.push([p[0],-1]):i.push([-1,-1])}var s=TypingDNA.clickTimes.length;i.push(s),s>1?(i.push(Math.round(TypingDNA.math.avg(TypingDNA.clickTimes))),i.push(Math.round(TypingDNA.math.sd(TypingDNA.clickTimes)))):1===s?i.push(TypingDNA.clickTimes[0],-1):i.push([-1,-1]);var y=TypingDNA.stopTimes.length;return i.push(y),y>1?(i.push(Math.round(TypingDNA.math.avg(TypingDNA.stopTimes))),i.push(Math.round(TypingDNA.math.sd(TypingDNA.stopTimes)))):1===y?i.push(TypingDNA.stopTimes[0],-1):i.push([-1,-1]),i},TypingDNA.getOSBrowserMobile=function(){var i=TypingDNA.ua,n=TypingDNA.platform,e=screen.height>=screen.width,t=0,p=0,g=0,r=0,o=1;/MSIE/.test(i)?(g=4,/IEMobile/.test(i)&&(o=2),/MSIE \d+[.]\d+/.test(i)&&(r=/MSIE \d+[.]\d+/.exec(i)[0].split(" ")[1].split(".")[0])):/Edge/.test(i)?(g=6,/Edge\/[\d\.]+/.test(i)&&(r=/Edge\/[\d\.]+/.exec(i)[0].split("/")[1].split(".")[0])):/Chrome/.test(i)?(/CrOS/.test(i)&&(n="CrOS"),g=1,/Chrome\/[\d\.]+/.test(i)&&(r=/Chrome\/[\d\.]+/.exec(i)[0].split("/")[1].split(".")[0])):/Opera/.test(i)?(g=3,(/mini/.test(i)||/Mobile/.test(i))&&(o=2)):/Android/.test(i)?(g=7,o=2,t=6):/Firefox/.test(i)?(g=2,/Fennec/.test(i)&&(o=2),/Firefox\/[\.\d]+/.test(i)&&(r=/Firefox\/[\.\d]+/.exec(i)[0].split("/")[1].split(".")[0])):/Safari/.test(i)&&(g=5,(/iPhone/.test(i)||/iPad/.test(i)||/iPod/.test(i))&&(t=5,o=/iPad/.test(i)?3:2)),r||(/Version\/[\.\d]+/.test(i)&&(r=/Version\/[\.\d]+/.exec(i)),r?r=r[0].split("/")[1].split(".")[0]:/Opera\/[\.\d]+/.test(i)&&(r=/Opera\/[\.\d]+/.exec(i)[0].split("/")[1].split(".")[0])),"MacIntel"===n||"MacPPC"===n?(t=2,/10[\.\_\d]+/.test(i)&&(p=/10[\.\_\d]+/.exec(i)[0].split(".",2).join("")),/[\_]/.test(p)&&(p=p.split("_").slice(0,2).join(""))):"CrOS"===n?t=4:"Win32"===n||"Win64"===n?t=1:!t&&/Android/.test(i)?t=6:!t&&/Linux/.test(n)?t=3:!t&&/Windows/.test(i)&&(t=1),3===o&&2!==o||1!==TypingDNA.isMobile()||(/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(i)?o=3:6!==t&&0!==t||!(e&&screen.height>767&&screen.width>480||!e&&screen.width>767&&screen.height>480)?1===t?window.navigator.msPointerEnabled&&navigator.msMaxTouchPoints>0&&(o=3):o=2:o=3);var a=Number(void 0!==window.orientation||-1!==i.indexOf("IEMobile"))+1,s=Number("ontouchstart"in window||navigator.maxTouchPoints||window.DocumentTouch&&document instanceof DocumentTouch||!1)+1;return[Number(t),Number(p),Number(g),Number(r),Number(o),a,Number(e),s]},TypingDNA.getDeviceSignature=function(){var i=TypingDNA.getOSBrowserMobile(),n=i[4],e=0,t=0,p=i[5],g=i[0],r=1,o=TypingDNA.math.fnv1aHash(navigator.language),a=i[7],s=TypingDNA.getPressType(),y=0,T=0,D=0,A=i[2],N=screen.width||0,d=screen.height||0,u=i[6]?1:2,c=i[1],m=i[3],h=TypingDNA.cookieId,l=TypingDNA.math.fnv1aHash([n,e,t,p,g,r,o,a,s,y,T,D,A,N,d,u,c,m,h].join("-"));return[n,e,t,p,g,r,o,a,s,y,T,D,A,N,d,u,c,m,h,l]},TypingDNA.getPressType=function(){return 0===TypingDNA.isMobile()?(TypingDNA.pressRecorded,1):!0===TypingDNA.pressCalculated?!0===TypingDNA.pressRecorded?3:2:!0===TypingDNA.pressRecorded?1:0},TypingDNA.getQuality=function(i){for(var n=i.split(","),e=0;e<n.length;e++)n[e]=Number(n[e]);var t=0,p=0,g=0,r=n.slice(11,55),o=TypingDNA.math.avg(r),a=r.length;for(e=0;e<a;e++)p+=Number(r[e]>0),t+=Number(r[e]>4),g+=Number(r[e]>o);var s=Math.sqrt(p*t*g)/75;return s>1?1:s},TypingDNA.checkMobileValidity=function(i){var n=i.split(","),e=n[0];if(0===e)return 0;for(var t=0,p=n.slice(11,55),g=p.length,r=0;r<g;r++)t+=Number(p[r]);return t/e},TypingDNA.getLength=function(i){if(i&&"string"==typeof i){var n=i.indexOf("|");return n>0?Number(i.substring(0,n).split(",")[4])||0:Number(i.split(",")[0])||0}return 0},TypingDNA.getTextId=function(i){return TypingDNA.math.fnv1aHash(i)}}