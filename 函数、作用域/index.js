/*
    函数
        是一块Javascript代码，被定义一次，但可执行和调用多次。
        JS中的函数也是对象，所以JS函数可以像其他对象那样操作和传递
        所以我们也常叫JS中的函数为函数对象。
    
    函数调用不同方式
        直接调用    foo()
        对象方法    o.method()
        构造器      new Foo()
        call/apply/bind     func.call(o)
*/
function foo(x,y) {
    if (typeof x === 'number' && typeof y === 'number') {
        return x+y
    } else {
        return 0
    }
}

foo(1,2)    // 3


// 函数声明
    function add(a,b) {
        a = +a;
        b = +b;
        if(isNaN(a) || isNaN(b)) {
            return;
        }
        return a+b;
    }

// 函数表达式
    var add = function(a,b) {}
    
    (function(){})()

    return function(){}

    var add = function foo(a,b) {}


// 变量&函数的声明前置
var num = add(1,2)
console.log(num)    // 3

function add(a,b) {
    a=+a;
    b=+b;
    if(isNaN(a) || isNaN(b)) {
        return;
    }else {
        return a+b
    }
}

// ---------------

var num = add(1,2)
console.log(num)    // undefined is not a function
var add = function(a, b) {
    a=+a;
    b=+b;
    if(isNaN(a) || isNaN(b)) {
        return;
    }else {
        return a+b
    }
}

// 构造器
var func = new Function('a','b','console.log(a+b)')
func(1,2)   // 3

var func = Function('a','b','console.log(a+b)')
func(1,2)   // 3


// this 
/*
    全局的this(浏览器 -> window)
    console.log(this.document === document)  // true
    console.log(this === window)    // true

    this.a = 37
    console.log(window.a)   // 37

    一般函数的this(浏览器)
    function f1(){
        return this
    }
    f1() === window // true, global object

    function f2(){
        "use strict"
        return this
    }
    f2() === undefined  // true, 严格模式下，一般函数的this == undefined

    *作为对象方法的函数的this
    var o = {
        prop: 37,
        f: function() {
            return this.prop
        }
    }
    console.log(o.f())  // 37

    var o = {prop:37}
    function independent() {
        return this.prop
    }
    o.f = independent
    console.log(o.f())  // 37

    *对象原型链上的this
    var o = {f:function(){return this.a + this.b}}
    var p = Object.create(o)
    p.a = 1
    p.b = 4
    console.log(p.f())  // 5   --> this指向对象p

    *get/set方法与this
        -- this指向 get/set方法所属的对象

    *构造器中的this
    function MyClass() {
        this.a = 37
    }
    var o = new MyClass()
    console.log(o.a) // 37

    function C2(){
        this.a = 37
        return {a:38}
    }

    o = new C2()
    console.log(o.a)    // 38

    *call/apply方法与this
    function add(c,d) {
        return this.a + this.b + c + d
    }
    var o = {a:1,b=3}
    add.call(o,5,7) // 1+3+5+7 =16
    add.apply(o,[10,20])    // 1+3+10+20=34

    function bar() {
        console.log(Object.prototype.toString.call(this))
    }
    bar.call(7) // "[object Number]"

    bind方法与this
    function f() {
        return this.a
    }
    var g = f.bind({a:"test"})  // this ->  {a:"test"}这个对象，返回一个函数
    console.log(g())    // test

    var o = {a:37,f:f,g:g}
    console.log(o.f(),o.g())    // 37,test
*/

// 函数属性 & arguments

// bind 与 currying （科里化 --> 将函数拆分为不同的子函数）    -->  可以将函数进行拆分
function add(a,b,c) {
    return a+b+c
}
var func = add.bind(undefined, 100)     // --> 不变更this指向，第二个参数100是默认给a赋值为100
func(1,2)   // 103   --> 因为上面给a赋值了100，所以这里 1赋值给形参b, 2赋值给形参c

var func2 = func.bind(undefined, 200)   // -->  这里在func的基础上，给b默认赋值为200
func2(10)   // 310  --> 这里 c = 10


function getConfig(colors, size, otherOptions) {
    console.log(colors, size, otherOptions)
}

var defaultConfig = getConfig.bind(null, "#CC0000", "1024*768")

defaultConfig("123")    // #CC0000 1024*768 123
defaultConfig("456")    // #CC0000 1024*768 456


// bind与new
function foo() {
    this.b = 100
    return this.a
}

var func = foo.bind({a:1})

func()  //1
new func()  // bind的this会被忽略，this仍然指向之前的对象，这里是空对象，最终返回一个对象


// 闭包
    // -- 不同于一般的函数，它允许一个函数在立即词法作用域外调用时，仍可访问非本地变量
    // 灵活使用、封装属性和方法，但使用不当空间浪费、内存泄漏、性能消耗
    function outer() {
        var localVal = 30
        return localVal
    }

    // 闭包例子
    function outer() {
        var localVal = 30
        return function() {
            return localVal
        }
    }
    var func = outer()
    func()  // 30

    // 作用域 [全局、函数、eval]
    var a = 10          //  --> 全局
    (function(){
        var b = 20      //   -->  函数
    })()
    console.log(a)  // 10
    console.log(b)  // error, b in not defined
    
    eval("var a = 1")   //  --> eval

    // 利用函数作用域封装  
        (function(){            
            // do sth
            var a,b         // 可以将a,b封装成私有属性，不允许对外访问
        })()

        // function前添加！或者 + - 等符号，作用是将函数变成函数表达式而不是函数声明
        !function(){
            // do sth
            var a,b
        }()

    
    /*
        执行上下文 （Execution Context 缩写EC）   -- 栈级结构

        JS 解释器如何找到我们定义的函数和变量？
            -- 变量对象（Variable Object 缩写VO）是一个抽象概念中的"对象"，
                它用于存储执行上下文中的：
                    1. 变量
                    2. 函数声明
                    3. 函数参数 

            -- 函数中的激活对象 （Active Object 缩写AO）

                VO(functionContext) === AO  -->  函数级的VO 等价于 AO
                
            -- 1. 变量初始化阶段
                VO按照如下顺序填充：
                    1）函数参数（若未传入，初始化该参数值为undefined）
                    2) 函数声明（若发生命名冲突，会覆盖）
                    3）变量声明 (初始化变量值为undefined, 若发生命名冲突，会忽略)


                function test(a,b) {
                    var c = 10;
                    function d() {}
                    var e = function _e() {}
                    (function x(){})
                    b = 20
                }
                test(10)

                对应的AO:   (函数表达式不会影响VO)
                    AO(test) = {
                        a: 10
                        b: undefined
                        c: undefined
                        d: <ref to func "d">
                        e: undefined
                    }

                例子:
                    function foo(x,y,z) {
                        function x(){}
                        alert(x)
                    }
                    foo(100)    // function x(){}      -->   这里x出现命名冲突，以函数声明覆盖

                    function foo(x,y,z){
                        function func(){}
                        var func
                        console.log(func)
                    }
                    foo(100)    // function func(){}    -->   这里变量声明与函数声明命名冲突，忽略变量声明

                    function foo(x,y,z) {
                        function func(){}
                        var func = 1
                        console.log(func)
                    }
                    foo(100)    // 1        -->    代码执行阶段对变量func进行了赋值

            -- 代码执行阶段

                    分析：
                        alert(x)    // function
                        var x = 10
                        alert(x)    // 10
                        x = 20

                        function x(){}
                        alert(x)    // 20

                        if(true) {
                            var a = 1
                        }else {
                            var b = true
                        }

                        alert(a)    // 1
                        alert(b)    // undefined


                        VO = {
                            x：<ref to func x>
                            x: undefined (重名冲突，被忽略)
                            a: undefined
                            b: undefined
                        }
    */


    




