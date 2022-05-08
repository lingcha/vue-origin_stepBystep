/**
 * 如何让数据变为响应式数据
 * 1. 当副作用函数effect执行时，会触发字段obj.text的读取操作。
 * 2. 当修改obj.text的值时，会触发字段obj.text的设置操作.
 */

// 存储副作用函数的桶
const bucket = new Set()

// 原始数据
const data = { text: 'hello world' }

// 对原始数据的代理
const obj = new Proxy(data, {
    // 拦截读取操作
    get(target, key) {
        // 将副作用函数effect添加到存储副作用函数的桶里
        bucket.add(effect)
        return target[key]
    },
    // 拦截设置操作
    set(target, key, newVal) {
        // 设置操作
        target[key] = newVal
        // 把副作用函数从桶里取出并执行
        bucket.forEach(fn => fn())
        // 返回true代表执行操作成功
        return true
    }
})
 
// *当读取属性时,把副作用函数存在桶里,当执行设置属性操作时,先将原始数据更新,再从桶里取出副作用函数进行重新执行,这样就实现了响应式数据.

// 可以使用如下代码进行测试.
function effect() {
    document.body.innerText = obj.text
}
// 执行副作用函数,触发读取属性操作
effect()
// 修改数据触发副作用的重新执行
setTimeout(() => {
    obj.text = 'hello vue3'
},1000)