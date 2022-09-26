// 借助postcss-pxtorem实现自动将px转换成rem
module.exports = {
    plugins: {
        autoprefixer: {},
        'postcss-pxtorem': {
            rootValue: 100, // 根元素字体大小
            // propList: ['width','height'] 只转宽高
            propList: ['*'] //全部转为rem
        }
    }
}