const CryptoJS = require('crypto-js');  //引用AES源码js
// const key = CryptoJS.enc.Utf8.parse("LdfbAo1S8Dggjj==");  //十六位十六进制数作为密钥
// const iv = CryptoJS.enc.Utf8.parse('L+\\~f4,Ir)b$=pkf');   //十六位十六进制数作为密钥偏移量

//加密方法
function Encrypt(word){
    var key = CryptoJS.enc.Utf8.parse("LdfbAo1S8Dggjj==");
    var srcs = CryptoJS.enc.Utf8.parse(word);
    // CBC加密
	var options = {
	    iv: CryptoJS.enc.Utf8.parse("L+\\~f4,Ir)b$=pkf"),
	    mode: CryptoJS.mode.CBC,
	    padding: CryptoJS.pad.Pkcs7
	}
	// EBC加密
    // var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    var encrypted = CryptoJS.AES.encrypt(srcs, key, options);
    return encrypted.toString();
}

export default {
    Encrypt
}