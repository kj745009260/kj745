/**
 * 数据存储到localStorage中
 * @param id [用户id]
 * @param key
 * @param value
 */
export function saveToLocal(id, key, value){
    let seller = window.localStorage.__seller__;
    if(!seller){
        seller = {};
        seller[id] = {};
    }else{
        seller = JSON.parse(seller);
        if(!seller[id]){
            seller[id] = {};
        }
    }
    seller[id][key] = value;
    window.localStorage.__seller__ = JSON.stringify(seller);
}

/**
 * 从localStorage中取值
 * @param id 用户id
 * @param key
 * @param def 默认值
 */

export function loadFromLocal(id, key, def){
    let seller = window.localStorage.__seller__;
    if(!seller){
        return def;
    }
    seller = JSON.parse(seller)[id];
    if(!seller){
        return def;
    }
    let res = seller[key];
    return res || def;
}