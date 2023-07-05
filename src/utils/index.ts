const format = {
    formatDate: (date :Date) :string =>{
        date = new Date(date)
        let year = date.getFullYear()
        let month = date.getMonth()+1
        let day = date.getDate()
        let hour = date.getHours()
        let minute = date.getMinutes()
        return year+" 年 "+ month + " 月 "+ day + " 日 " + hour + ":" + minute
    },
    formatDate2: (date :Date) :string =>{
        date = new Date(date)
        let year = date.getFullYear()
        let month:any = date.getMonth()+1
        let day:any = date.getDate()
        let hour = date.getHours()
        let minute:any = date.getMinutes()
        let second:any = date.getSeconds()
        if (month < 10) {
            month = "0" + month;
         }
        if (day < 10) {
            day = "0" + day;
        }
        if (minute < 10) {
            minute = "0" + minute;
         }
        if (second < 10) {
            second = "0" + second
        }
        return year+"-"+ month + "-"+ day + " " + hour + ":" + minute + ":" + second
    },
    formatMonth: (date :Date) :string =>{
        let before = new Date(date).valueOf()
        let now = new Date().valueOf()
        if (now-before < 31536000000){
            if (now-before < 2592000000){
                return Math.floor((now-before)/86400000)+"天前"
            }else{
                return Math.floor((now-before)/2592000000)+"个月前"
            }
        }else{
            return Math.floor((now-before)/31536000000)  +"年前"
        }
    }
}

const debounce = (func:any, delay:number = 1000) :any => {
    let timer:any;
    return function (...args:any[]) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func()
        }, delay);
    }
}
export default{
    format,
    debounce
}