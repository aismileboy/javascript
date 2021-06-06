// *没有块级作用域
/**
for (var i=0;i<10;i++) {
    var str = 'hi'           
    console.log(str)
}

    等价于

var i=0
for(; i<10; i++) {
    var str = 'hi'
    console.log(str)
}

{
    var x = 1
}

    等价于
    
var x = 1
{

}


// 函数作用域
function foo() {
    var a = 1
    console.log(a)  //1
}
foo()
console.log(typeof a)   //undefined



var 声明语句
    var a=b=1   -->     b是全局变量
    function foo() {
        var a=b=1;
    }
    console.log(typeof a)   // undefined
    console.log(typeof b)   // Number


try-catch 语句
    try {
        throw "test"
    }catch(ex) {
        console.log(ex) 
    }finally {
        console.log("finally")
    }

    执行结果: test 
             finally

    try {
        try {
            throw new Error("ops")
        }
        finally {
            console.log("finally")
        }
    }
    catch(ex) {
        console.log("outer", ex.message)
    }

    执行结果: finally
             outer ops

    
    try {
        try {
            throw new Error("oops")
        }
        catch(ex) {
            console.log("inner", ex.message)
        }
        finally {
            console.log("finally")
        }
    }
    catch(ex) {
        console.log("outer", ex.message)
    }

    执行结果: inner oops
             finally


    try {
        try {
            throw new Error("oops")
        }
        catch(ex) {
            console.log("inner", ex.message)
            throw ex;
        }
        finally {
            console.log("finally")
        }
    }
    catch(ex) {
       console.log("outer", ex.message) 
    }

    执行结果: inner oops
             finally
             outer oops



    function 语句
        -- 函数声明   -->   函数可以预解析（先调用后声明）
            function fd() {
                // do sth
                return true
            }
        
        -- 函数表达式   -->   不可以先调用
            var fe = function() {
                // do str
            }

    
    for ... in 语句
    1. 顺序不确定
    2. enumerable为false时不会出现
    3. for in对象属性时受原型链影响
            var p;
            var obj = {x:1, y:2}
            for(p in obj) {}        // 遍历顺序不确定，有js引擎决定

    
    switch - case 语句

    循环语句

    严格模式    -->     提供错误检查、增强安全性
        'use strict'
            不允许未声明的变量被赋值
            arguments变为参数的静态副本
            delete参数、函数名报错 （SyntaxError）
            delete不可配置的属性报错 （TypeError）
            对象字面量重复属性名报错 （SyntaxError）
            禁止八进制字面量 （SyntaxError）
            eval、arguments变为关键字，不能作为变量、函数名 （SyntaxError）
            eval创建独立作用域

*/