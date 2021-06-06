/*
对象中包含一系列属性，这些属性是无序的。
每个属性都有一个字符串key和对应的value。
*/ 

// 非字符串key 会自动转换成字符串
/* 
var obj = {}
obj[1] = 1
obj['1'] = 2
obj     // Object {1:2}

obj[{}] = true
obj[{x:1}] = true
obj     // Object {1:2, [object Object]:true}
*/


/**
 * 创建对象
 *      -- 字面量方式
 *          var obj1 = {x:1,y:2}
 *      -- new/原型链
 * 
 *      *原型链
 *          每一个对象都有[__proto__]属性, 都指向构造器的prototype对象属性，
 *          而prototype对象也有[__proto__]属性, 会指向上一层构造器的prototype
 *          对象属性
 *          ...
 *          最终到达原型链的末端,指向 Object[prototype] --> null
 *      
 *      对象添加/修改/删除（delete）属性时，只在对象自身进行操作，不会影响到原型，当读取属性时，先看
 *      对象本身是否存在，不存在向原型链上查找，原型链上也没有则返回undefined
 *      
 *      -- Object.create()      
 *          var obj = Object.create({x:1})          --> 创建一个对象obj, 让obj.__proto__ = {x:1}
 *          obj.x   // 1
 *          typeof obj.string   // "function"
 *          obj.hasOwnProperty('x') // false
 * 
 *          var obj = Object.create(null)
 *          obj.toString // undefined
 */

/**
 * 属性操作
 *      -- 属性读写
 *              var obj = {x:1, y:2}
 *              obj.x   |   obj["y"]
 *              obj["x"] = 3    |   obj.y = 4
 * 
 *      -- 属性删除
 *              var person = {age: 28, title: 'fe'}
 *              delete person.age
 *              delete person['fe']
 *              person.age // undefined
 *              delete person.age   // true
 * 
 *      -- 属性检测
 *             var cat = new Object
 *             cat.legs = 4
 *             cat.name = "Kitty"
 *             "legs" in cat    // true
 *             "abc" in cat     // false
 *             "toString" in cat    // true, inherited property, 原型链向上查找
 * 
 *             cat.hasOwnProperty("legs")   // true
 *             cat.hasOwnProperty("toString")   // false
 *              
 *             // 是否可枚举。值为true，则可以显示与遍历
 *             cat.propertyIsEnumerable("legs")    // true
 *             cat.propertyIsEnumerable("toString")     // false 
 * 
 *             Object.defineProperty(cat,'price',{enumerable:false,value:1000})     // 默认为false
 *             cat.propertyIsEnumerable('price')    // false
 *             cat.hasOwnProperty('price')  // true
 * 
 *       -- 属性枚举
 *              var o = {x:1,y:2,z:3}
 *              "toString" in o     //true
 *              o.propertyIsEnumerable('toString')      //false
 *              var key
 *              for(key in o) {
 *                  console.log(key)    //x,y,z   --> 原型链查找
 *              }
 *              
 *              var obj = Object.create(o)
 *              obj.a = 4
 *              var key
 *              for (key in obj) {
 *                  console.log(key)    // a,x,y,z
 *              }
 *              
 *              *如果过滤掉原型链上的属性，只查看当前对象的属性，用obj.hasOwnProperty(key)
 *              进行过滤
 *              var obj = Object.create(o)
 *              obj.a = 4
 *              var key
 *              for (key in obj) {
 *                  if (obj.hasOwnProperty(key))
 *                  console.log(key)    // a
 *              }
 * 
 *      -- getter/setter 方法 （另外一种读写属性）, 注意是属性，不能当作方法来使用
 * 
 *      var man = {
 *          name: 'Lcs',
 *          weibo: '@Lcs',
 *          get age() {
 *              return new Date().getFullYear() - 1988
 *          },
 *          set age(val) {
 *              console.log('Age can\'t be set to ' + val)
 *          }
 *      }   
 * 
 *      console.log(man.age)    // 30
        man.age = 100       // Age can't be set to 100


        var man = {
            name: 'Lcs',
            $age: null,    // $[变量名]这种设置是为了不向外暴露该属性
            get age() {
                if (this.$age == undefined) {  // 这里的 == 意味着 this.$age === undefined | null
                    return new Date().getFullYear() - 1991
                } else {
                    return this.$age
                }
            },
            set age(val) {
                val = +val     // 转换成数值
                if (!isNaN(val) && val > 0 && val < 150) {
                    this.$age = +val
                } else {
                    throw new Error('Incorrect val = ' + val)
                }
            }
        }
 *              
 */

// get/set 与 原型链
/*
function foo(){}
// 在对象原型上定义值为get方法的属性
Object.defineProperty(foo.prototype, 'z', {get: function(){return 1}}) 
var obj = new foo()

console.log(obj.z)   // 1       -->     向原型上查找属性z的get方法并调用
obj.z = 10      //      -->     当原型上有get/set方法时，无法在对象本身修改/添加属性，
                //      -->     想要修改需要通过defineProperty来设置属性的configurable=true
console.log(obj.z)   // still 1

Object.defineProperty(obj,'z', {value: 100, configurable: true})
console.log(obj.z)  //  修改后值为 100
delete obj.z        //  configurable=true 可以删除对象自身属性
console.log(obj.z)  // back to 1


var o = {}
Object.defineProperty(o,'x',{value: 1})     // 默认 writable = false,configurable = false
var obj2 = Object.create(o)     // 以对象o作为原型创建对象
console.log(obj2.x)      // 1
obj2.x = 200
console.log(obj2.x)      // still 1, can't change it

Object.defineProperty(obj2, 'x', {writable: true, configurable: true, value: 100})
console.log(obj2.x) // 100
obj2.x = 500
console.log(obj2.x) // 500
console.log(obj2.__proto__.x)   // 1    -->     不改变原型上的属性
*/


// 属性标签

/*
// 获取字面量对象{pro: true}的pro属性的所有属性标签
Object.getOwnPropertyDescriptor({pro: true}, 'pro') // Object {value:true,writable:true,enumerable:true,configurable:true}
// 获取字面量对象{pro: true}的a属性的所有属性标签
Object.getOwnPropertyDescriptor({pro: true}, 'a')   // undefined (因为对象上没有a属性)

var person = {}
Object.defineProperty(person, 'name', {
  configurable: false,  // delete 失败
  writable: false,      // 不可写 不能修改
  enumerable: true,
  value: 'Lcs' 
})
person.name     // Lcs
person.name = 1
person.name     // still Lcs
delete person.name  // false

Object.defineProperty(person, 'type', {
    configurable: true,  
    writable: true,     
    enumerable: false,      // 不可枚举
    value: 'Object' 
  })

Object.keys(person)     // ['name']


Object.defineProperties(person, {
    title: {value: 'fe', enumerable: true},
    corp: {value: 'BABA', enumerable: true},
    salary: {value: 50000, writable: true, enumerable: true},
    luck: {
        get: function() {
            return Math.random() > 0.5 ? 'good' : 'bad'
        }
    },
    promote: {
        set: function(level) {
            this.salary*= 1 + level*0.1
        }
    }
})

Object.getOwnPropertyDescriptor(person, 'salary')   // Object {value:50000,writable:true,enumerable:true,configurable:false}
Object.getOwnPropertyDescriptor(person, 'corp')     // Object {value:'BABA',writable:false,enumerable:true,configurable:false}   
person.salary   // 50000
person.promote = 2
person.salary   // 60000
*/

// 对象标签
// [[proto]]、[[class]]、[[extensible]]

// [[class]]
/*
var toString = Object.prototype.toString
function getType(o) {return toString.call(o).slice(8,-1)}
toString(null)  // "[object Null]"
getType(null)   // "Null"
getType(undefined)  // "Undefined"
getType(1)  // "Number"
getType(new Number(1))  // "Number"
typeof new Number(1)    // "object"
getType(true)   // "Boolean"
getType(new Boolean(true))  // "Boolean"

// [[extensible]]       -->  not affects prototype chain
var obj = {x: 1, y:2}
Object.isExtensible(obj)    // true
Object.preventExtensions(obj)
Object.isExtensible(obj)    // false
obj.z = 1
obj.z       // undefined, add new property failed
Object.getOwnPropertyDescriptor(obj, 'x')   // Object {value:1,writable:true,enumerable:true,configurable:true}

Object.seal(obj)
Object.getOwnPropertyDescriptor(obj, 'x')   // Object {value:1,writable:true,enumerable:true,configurable:false}
Object.isSealed(obj)    // true

Object.freeze(obj)
Object.getOwnPropertyDescriptor(obj, 'x')   // Object {value:1,writable:false,enumerable:true,configurable:false}
Object.isFrozen(obj)    // true
*/

// 序列化
var obj = {x:1,y:true,z:[1,2,3],nullVal:null}
JSON.stringify(obj) // "{"x":1,"y":true,"z":[1,2,3],"nullVal":null}"

// JSON.stringify()在将对象转换成字符串时，会过滤掉值为undefined的属性，且会将值为NaN|Infinity转换成null
obj = {val: undefined, a:NaN, b:Infinity, c: new Date()}
JSON.stringify(obj) // "{"a":null,"b":null,"c":"2021-05-14T14:15:43.910Z"}"

// JSON.parse() 会将字符串转换成对象
obj = JSON.parse('{"x": 1}')
obj.x   // 1


// 对象方法
// toString 一般重新定义
obj.toString = function() {}
// valueOf 将对象转换成基本类型