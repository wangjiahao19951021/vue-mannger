module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            // http://192.168.124.9:80/canggang/manager/login?password=4M8S3C2Rm%2BIBPe6Yh0Ll8w==&mobile=17700008851&captcha=5cqu
            '/api':{
                target:'http://192.168.124.9:80/',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
           
        }
    }
}