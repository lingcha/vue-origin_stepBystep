/**
 * 这一节主要阐述的是副作用函数和响应式数据是什么
 */

//* 副作用函数，比如此处的effect函数，该函数在执行的时候将会设置body的文本内容，但除了该函数以外的其他函数都可以读取或设置body的文本内容。也就是说，effect函数执行会直接或间接的影响其他函数的执行，这时我们说effect函数产生了副作用。

function effect() {
  document.body.innerText = "hello vue3";
}

let val = 1;
function effect() {
  val = 2;
}

//* 如下所示，副作用函数执行的时候将会赋值body的文本内容为obj.text的值，当obj.text的值发生变化的时候，我们希望副作用函数effect重新执行，如果能实现这个目标，那么obj就是响应式数据。当然这里的代码还做不到。
const obj = { text: "hello world" };

function effect() {
  document.body.innerText = obj.text;
}

//! 副作用函数是会影响其他函数的执行的函数。 响应式数据是数据本身发生变化的时候，会重新执行数据对应的副作用函数的数据