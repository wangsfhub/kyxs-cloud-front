/**
 * 校验编制人数
 */
export const checkInteger = (rule, value, callback) => {
    if (!value) {
        return callback()
    }
    if (Number.isInteger(Number(value)) && Number(value) >= 0){
        callback()
    } else {
        callback(new Error('请输入整数'))
    }
}
/**
 * 校验金额
 */
export const checkDecimal = (rule,value,callback) => {
    let regExp = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    if (value && !regExp.test(value)) {
        callback(new Error('请输入正确的数据格式'))
    }else{
        callback()
    }
}

/**
 * 校验手机号
 */
export const checkPhone = (rule, value, callback) => {
    let regExp =  /^[1][3-9][0-9]{9}$/
    if (value && !regExp.test(value)) {
        callback(new Error('请输入正确的手机号'))
    }else{
        callback()
    }
}
/**
 * 校验邮箱
 */
export const checkEmail = (rule, value, callback) => {
    let regExp =  /^\w+([-+.]\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*$/
    if (value && !regExp.test(value)) {
        callback(new Error('请输入正确的邮箱地址'))
    }else{
        callback()
    }
}
/**
 * 校验证件号码
 */
export const checkIdCard = (rule,value,callback) => {
    let regExp = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    if (value && !regExp.test(value)) {
        callback(new Error('请输入正确的证件号码'))
    }else{
        callback()
    }
}
/**
 * 校验数字字符串
 */
export const checkChar = (rule,value,callback) => {
    let regExp = /^[A-Za-z0-9]{3,20}$/
    if (value && !regExp.test(value)) {
        callback(new Error('请输入数字字符组合，长度在3-20字符'))
    }else{
        callback()
    }
}
/**
 * 校验描述长度
 */
export const checkDesc = (rule,value,callback) => {
    if (value && value.length>100) {
        callback(new Error('描述长度在100字符以内'))
    }else{
        callback()
    }
}
