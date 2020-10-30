module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:'http://192.168.124.9:80/chengpei/manager',
                // target:'http://www.canggangwulian.com/canggang',
                changeOrigin:true,
                pathRewrite:{
                    '^/chengpei':''
                }
            }
           
        }
    }
}