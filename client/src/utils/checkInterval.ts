const nullLocal = () =>{
    localStorage.setItem("interval", '1');
}

if (window.performance){
    nullLocal();
}

export const checkInterval = () =>{

    const intervalSecond = Number(localStorage.getItem("interval"));

    let timeNow = new Date().getTime();

    timeNow/=1000;

    if (timeNow - intervalSecond < 1){
        localStorage.setItem("interval", String(timeNow))
        return false
    }
    localStorage.setItem("interval", String(timeNow))
    return true
}