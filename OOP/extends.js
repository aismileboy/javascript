function Person(name, age) {
    this.name = name;
    this.age = age
}

// 在原型上定义属性和方法可以被所有对象共享
Person.prototype.hi = function() {
    console.log("Hi, my name is " + this.name + "I'm" +
    this.age + "years old now")
}
Person.prototype.LEGS_NUM = 2
Person.prototype.ARMS_NUM = 2
Person.prototype.walk = function() {
    console.log(this.name + " is walking...")
}

function Student(name,age,className) {
    // 继承
    Person.call(this, name, age)
    this.className = className
}

// Object.create(obj)  创建一个空对象，原型[[protocd]]指向obj
Student.prototype = Object.create(Person.prototype)         
Student.prototype.constructor = Student

// 重写
Student.prototype.hi = function() {
    console.log("Hi, my name is "+ this.name + " I'm " +
    this.age + " years old now, and from "+ this.className + '.')
}
// 新增自己的方法
Student.prototype.learn = function(subject) {
    console.log(this.name + ' is learning '+ subject + 
    ' at ' + this.className + '.')
}

// test
var lsc = new Student("Lsc", 30, 'Class 3, Grade 2')
lsc.hi()
lsc.LEGS_NUM
lsc.walk()
lsc.learn('chemistry')