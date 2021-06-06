// 基于原型的继承
function Foo() {
    this.y = 2
}
typeof Foo.prototype // "object"
Foo.prototype.x = 1
var obj3 = new Foo()
obj3.y  // 2
obj3.x  // 1


Foo.prototype           {
                            constructor: Foo,
                -->         __proto__: Object.prototype
                            x: 1
                        }

