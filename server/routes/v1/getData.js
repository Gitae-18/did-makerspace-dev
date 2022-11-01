import ApiUtil from "./ApiUtil";

export const getData1 = async () =>{
    const url='/path?param1=1&&param2=abc';
    return await ApiUtil.get(url);

}
export const getData2 = async(reqData) =>{
    const url ='/path';
    return await ApiUtil({
        url : url,
        method : 'get',
        data : reqData
    })
}
export const postData1 = async (reqData) =>{
    const url = '/path';
    return await ApiUtil.post(url,reqData)
}
export const postData2 = async(reqData) =>{
    const url = '/path';
    return await ApiUtil({
        url : url,
        method : 'post',
        data : reqData
    })
}