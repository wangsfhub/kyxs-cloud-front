
//根据代码翻译中文
export const translateCode = (setId,codeId)=>{
    if(!setId||!codeId){
        return ''
    }
    let codeItems = sessionStorage.getItem('codeItems')
    if(codeItems){
        codeItems = JSON.parse(codeItems);
    }
    if(codeItems&&codeItems.hasOwnProperty(setId)){
        for(let i = 0;i<codeItems[setId].length;i++){
            let code = codeItems[setId][i];
            if(code['id']==codeId){
                return code['codeName']
            }
        }
    }
    return '';
}
//根据代码项id 返回子集列表
export const getCodeItemBySetId =(setId)=>{
    if(!setId){
        return null;
    }
    let codeItems = sessionStorage.getItem('codeItems')
    if(codeItems){
        codeItems = JSON.parse(codeItems);
    }
    if(codeItems&&codeItems.hasOwnProperty(setId)){
        return codeItems[setId];
    }
    return null;
}