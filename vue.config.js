module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/m_static/activity/year/' : '/m/activity/',
    productionSourceMap: false,
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require('postcss-plugin-px2rem')({
                        rootValue: 75,
                        ignoreIdentifier: true,
                        minPixelValue: 1
                    })
                ]
            }
        }
    }
}
