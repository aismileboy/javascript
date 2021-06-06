/**
 * 原始表达式
 *      常量、直接量
 *      关键字
 *      变量
 * 
 * 复合表达式
 *     = [原始表达式] [运算符]
 * 
 * 数组、对象的初始化表达式
 *      [1, 2]            new Array(1,2)
 *      [1,,, 4]          [1, undefined, undefined, 4]
 *      {x:1, y:2}        var o = new Object()
 *                        o.x = 1; o.y = 2
 * 
 * 函数表达式
 *      var f = function(){}
 *      (function(){console.log('hello world')})()
 * 
 * 属性访问表达式
 *      var o = {x: 1}
 *      o.x
 *      o['x']
 * 
 * 调用表达式
 *      func()
 * 
 * 对象创建表达式
 *      new Func(1,2)
 *      new Object  
 * 
 * 
 * 运算符
 *      一元    +num
 *      二元    a + b
 *      三元    c? a: b
 *      赋值    x+=1
 *      比较    a==b
 *      算术    a-b
 *      位      a|b
 *      逻辑    exp1 && exp2
 *      字符串  "a"+"b"
 *      特殊 (条件、逗号、delete、in、instanceof、new、this、typeof、void)
 *          delete obj.x
 *          var obj = {x:1}
 *          obj.x   //1
 *          delete obj.x    // 返回true|false
 *          obj.x   //undefined
 *      
 * 
 *          var obj = {}
            Object.defineProperty(obj,'x',
                {configurable:false,value:1}    //配置configurable为false时，不可删除
            )
            delete obj.x    //false
            obj.x   //1

            void 0  // undefined
            void(0) // undefined
 */