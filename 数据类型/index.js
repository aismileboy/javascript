// 弱类型特性

var num = 32;
num = 'this is a string';
console.log(num)
console.log(32+32)  //64
console.log('32'+32)    //3232
console.log('32'-32)    //0

/*
    数据类型
        -基本类型
            > number
            > string
            > boolean
            > null
            > undefined
            > symbol
        -引用类型
            > object
                >> Function
                >> Array
                >> Date
                ...
*/

/*
    隐式转换
        + 和 -
            + 一般用于字符串的拼接，可将非string隐式转换成string
            - 在与number类型运算时，会将非number隐式转换成number后进行运算
            所以，可巧用+/-规则转化类型
                num + ''  (string)
                num - 0   (number)    
    
        a == b
            类型相同，同 ===
            类型不同, 尝试类型转换再比较
                "123" == 123 // true, 左边string -> num, 再比较
                0 == false // true, 右边boolean -> num, 再比较
                null == undefined //true
                new Object() == new Object() // false，引用地址不同，比较的是地址
                [1,2] == [1,2] // false， 引用地址不同，比较的是地址
                object == number | string 尝试对象转为基本类型
                    new String('hello') == 'hello' // true
        
        a === b (严格等于)
            类型不同, 返回false
            类型相同，再比较值
                null === null
                undefined === undefined
                NaN !== NaN (比较特殊，与自身也不相等)
                new Object !== new Object (比较的是对象的引用地址，不同对象地址不同)
*/

/*
    包装类型 （String, Number, Boolean）
    var str = "string"
    var strObj = new String("string")
    strObj 是 str 对应的包装对象

    str.length  //6
    str.a = 1
    str.a // undefined

    当把string类型当作对象来使用时，其实是临时创建了对应的包装对象（JS引擎自动去查找），从而使用相应的属性和方法
    当使用完后, 该临时对象会自动销毁
*/

/**
 * 类型检测
 *  typeof --> 适合基本类型及function检测，遇到null失效
 *      typeof 100   // "number"
        typeof true  // "boolean"
        typeof function(){} // "function"
        typeof undefined // "undefined"
        typeof new Object() // "object"
        typeof [1,2] // "object"
        typeof NaN // "number"
        typeof null // "object
    
    [操作数] instanceof [构造器]  --> 适合自定义对象，也可以用来检测原生对象，在不同window和iframe间检测时失效
        *基于原型链，用来判断左侧操作数对象的原型链上是否有右侧构造函数的prototype属性
        若左侧是基本类型，直接返回false
        若右侧非构造函数，返回ReferenceError
        注: 不同window或iframe间的对象类型检测 不能 使用instanceof
            
    Object.prototype.toString  -->  适合内置对象和基元类型, 遇到null和undefined失效（IE678等返回[object Object]）
        Object.prototype.toString.apply([])  -->  "[object Array]"
        Object.prototype.toString.apply(function(){})  -->  "[object Function]"
        Object.prototype.toString.apply(null)  -->  "[object Null]"
        Object.prototype.toString.apply(undefined)  --> "[object Undefined]"
        *IE6/7/8 Object.prototype.toString.apply(null) 返回 "[object Object]"
 */


