function initControls(){var e=document.getElementsByClassName("form-control");if(e)for(var t=0;t<e.length;t++)e[t].onkeydown=function(e){if(13===e.keyCode){e.preventDefault();var t=getStackLen();if(t&&"undefined"!=typeof currentQuote&&t<.9*currentQuote.length)return;document.forms[0]&&verifyText(document.forms[0])?document.forms[0].submit():"function"==typeof nextFunction&&nextFunction()}}}function findAncestor(e,t){for(;(e=e.parentElement)&&!e.classList.contains(t););return e}function findParentForm(e){for(;(e=e.parentElement)&&"FORM"!==e.tagName;);return e}function swapContent(e,t,n){var o=document.getElementById(e);o&&(o.style.opacity=0),setTimeout(function(){var e=document.getElementById(t);e&&(o&&(o.style.display="none"),e.style.display="block",e.style.opacity=1,n&&n())},300)}function mobileAndTabletCheck(e){var t,n=!1;t=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(n=!0),e&&e(n)}function encodeParams(e){var t="";for(var n in e)e.hasOwnProperty(n)&&(t.length>0&&(t+="&"),t+=encodeURI(n+"="+e[n]));return t}function ajaxCall(e,t){var n=new XMLHttpRequest;n.onreadystatechange=function(){4===n.readyState&&200===n.status&&t&&t(JSON.parse(n.responseText))},n.open("POST","typingdnacalls",!0),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),n.setRequestHeader("X-Requested-With","XMLHttpRequest"),n.send(encodeParams(e))}function getStackLen(){return TypingDNA&&TypingDNA.history&&TypingDNA.history.stack?TypingDNA.history.stack.length:null}function addClass(e,t){e&&-1===e.className.search(new RegExp("\\b"+t+"\\b"))&&(e.className+=" "+t+" ")}function removeClass(e,t){e&&(e.className=e.className.replace(new RegExp("\\b"+t+"\\b"),""))}function highlight(e,t,n){var o=n?n.value.length:0,a=document.getElementById(e),i=document.getElementById(t);a&&(a.innerHTML=currentQuote.slice(0,o)),i&&(i.innerHTML=currentQuote.slice(o));var r=getStackLen();o>.9*currentQuote.length&&r&&r>.9*currentQuote.length?removeClass(document.getElementById("btn_next"),"disabled"):addClass(document.getElementById("btn_next"),"disabled")}function fastCompareTexts(e,t){var n=e.split(" "),o=t.split(" "),a=0,i=0;for(var r in o)a+=n.indexOf(o[r])>-1?1:0;for(var r in n)i+=o.indexOf(n[r])>-1?1:0;return(i<a?i:a)/(n.length>o.length?n.length:o.length)}function verifyText(e){if(fastCompareTexts(document.getElementById("inputtextbox").value,currentQuote)>.7){var t=(e.attempts&&e.attempts.value)>0?80:160,n=tdna.getTypingPattern({type:0,length:t});return tdna.isMobile()&&TypingDNA.checkMobileValidity(n)<.7?(swapContent("collect","mobile"),!1):(swapContent("collect","step_loading"),e.tp.value=n,!0)}return alert("Too many typos, please re-type"),!1}function setCookie(e,t,n){var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3);var a="expires="+o.toUTCString();document.cookie=e+"="+t+";"+a+";path=/"}function getCookie(e){for(var t=e+"=",n=document.cookie.split(";"),o=0;o<n.length;o++){for(var a=n[o];" "==a.charAt(0);)a=a.substring(1);if(0==a.indexOf(t))return a.substring(t.length,a.length)}}function restart(e){document.location="/index"+(e?"?debug=1":"")}function isIframe(){try{return window.self!==window.top}catch(e){return!0}}