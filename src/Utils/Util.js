export const setItemLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
    return key;
  };
  export const getItemLocalStorage = (key) => {
    let token = key ? localStorage.getItem(key) : "";
    return token;
  };
  export const removeItemLocalStorage = (key) => {
    localStorage.removeItem(key)
  };

  export const minuteToHourConvert = (minute) =>{
      var num = minute;
      var hours = (num / 60);
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      if(rhours<10){
        rhours = "0"+rhours
      }
      if(rminutes<10){
        rminutes = "0"+rminutes
      }
      return   rhours+ ":" +rminutes+ ":"+ "00" ;
  }
  export const minuteToSecondConvert = (minute) =>{
    var num = minute;
    var rnum = Math.floor(num);
    var seconds = rnum*60;
    return  seconds ;
}

  export const secondToMinuteOrHourConvert = (second)=>{
    second = Number(second);
      var h = Math.floor(second / 3600);
      var m = Math.floor(second% 3600 / 60);
      var s = Math.floor(second% 3600 % 60);
      var hDisplay = h > 0 ? h + (h == 1 ? "" : "") : "00";
      var mDisplay = m > 0 ? m + (m == 1 ? "" : "") : "00";
      var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "00";
      
      if(mDisplay<10 && mDisplay>0){
        mDisplay = '0'+mDisplay
      }
      if(hDisplay<10 && hDisplay>0){
        hDisplay = '0'+hDisplay
      }
      if(sDisplay<10 && sDisplay>0){
        sDisplay = '0'+sDisplay
      }
    
      return hDisplay +":"+ mDisplay +":" +sDisplay; 
  }

  
  