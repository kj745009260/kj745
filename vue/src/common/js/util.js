/*
 * 解析url参数
 * @example ?if=12345&a=b
 * @return object {if: 12345 , a: b}
 */

export function urlParse(){
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    if(arr){
        arr.forEach((item) => {
            let temp = item.substring(1).split('=');
            let key = decodeURIComponent(temp[0]);
            let value = decodeURIComponent(temp[1]);
            obj[key] = value;
        })
    }
    return obj;
}