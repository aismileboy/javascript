// JS中数组是弱类型，可以含有不同类型的元素
var arr = [1,true,null,undefined,{x:1}, [1,2,3]]

// 创建数组 [字面量 | new Array]
var arr = new Array()
var arrWithLength = new Array(100)  // undefined*100
var arrLikesLiteral = new Array(true,false,null,1,2,"hi")

// 数组元素读写
var arr = [1,2,3,4,5]
delete arr[0]   //  --> 不改变数组的长度，只是将值(包括)改为undefined
arr[0]  // undefined

// 数组元素增删   -- 动态的，无需指定大小
var arr = []
arr[0] = 1
arr[1] = 2
arr.push(3)
arr // [1,2,3]

arr[arr.length] = 4     // equal to arr.push(4)
arr     // [1,2,3,4]

arr.unshift(0)
arr     // [0,1,2,3,4]

delete arr[2]
arr     // [0,1,undefined,3,4]
arr.length     //   5
2 in arr    //  false


// 数组迭代
// for 循环  -->  有序
// for in    -->  不保证顺序且会迭代原型链上的属性
var i = 0
var arr = [1,2,3,4,5]
for (; i<5; i++) {
    console.log(arr[i])     // 1,2,3,4,5
}

for (i in arr) {
    console.log(arr[i])     // 1,2,3,4,5
}

Array.prototype.x = 'inherited'
for (i in arr) {
    console.log(arr[i])     // 1,2,3,4,5,inherited
}

for (i in arr) {
    if (arr.hasOwnProperty(i)) {
        console.log(arr[i])     // 1,2,3,4,5
    }
}


// 二维数组
var arr = [[0,1],[2,3],[4,5]]
var i = 0,j = 0
var row
for(; i<arr.length; i++){
    row = arr[i]
    console.log('row'+ i)
    for(; j<row.length; j++) {
        console.log(row[j])
    }
}


// 稀疏数组     --  不含有从0开始的连续索引，一般length属性值比实际元素个数大


/* 数组方法     
        -- Array.prototype.join [将数组转为字符串]
            var arr = [1,2,3]
            arr.join()  // "1,2,3"
            arr.join('_')   // "1_2_3"

            function repeatString(str,n) {
                return new Array(n+1).join(str)
            }
            repeatString("a", 3)
            repeatString("Hi", 5)

        -- Array.prototype.reverse  [将数组逆序]
            var arr = [1,2,3]
            arr.reverse()   // [3,2,1]
            arr // [3,2,1] 原数组被修改

        -- Array.prototype.sort     [排序 -- 默认是按照字母的顺序]
            var arr = ["a","b","c","d"]
            arr.sort()      // ["a","b","c","d"]

            arr = [13,24,51,3]      
            arr.sort()      // [13,24,3,51]  -->  转成字符串，按照字母顺序
            arr // [13,24,3,51] 原数组被修改

            // 传入一个自定义函数进行排序
            arr.sort((a,b) => {
                return a-b
            })      // [3,13,24,51]

            arr = [{age:25},{age:39},{age:99}]
            arr.sort((a,b) => {
                return a.age - b.age
            })

        -- Array.prototype.concat   [数组合并]
            var arr = [1,2,3]
            arr.concat(4,5)     // [1,2,3,4,5]
            arr // [1,2,3]  原数组未被修改
            arr.concat([10,11],13)  // [1,2,3,10,11,13]
            arr.concat([1,[2,3]])   // [1,2,3,1,[2,3]]

        -- Array.prototype.slice    [返回部分数组 -- 左闭右开]
            var arr = [1,2,3,4,5]
            arr.slice(1,3)  // [2,3]    原数组未被修改
            arr.slice(1)    // [2,3,4,5]
            arr.slice(1,-1)     // [2,3,4]
            arr.slice(-4,-3)    // [2]

        -- Array.prototype.splice   [数组拼接]
            var arr = [1,2,3,4,5]
            arr.splice(2)   // return [3,4,5]
            arr // [1,2]    原数组被修改

            arr = [1,2,3,4,5]
            arr.splice(2,2)     // return [3,4] -- 第二个参数为删除的个数
            arr // [1,2,5]

            arr = [1,2,3,4,5]
            arr.splice(1,1,'a','b')     // return [2]  -- 删除一个元素再补上a、b元素(类似替换)
            arr // [1,a,b,3,4,5]

        -- Array.prototype.forEach  [数组遍历]
            var arr = [1,2,3,4,5]
            arr.forEach((x,index,a) => {
                console.log(x+ '|' + index + '|' + (a===arr))
            })

            // 1|0|true
            // 2|1|true
            // 3|2|true
            // 4|3|true
            // 5|4|true

        -- Array.prototype.map  [数组映射]
            var arr = [1,2,3]
            arr.map(x => {
                return x+10
            })      // [11,12,13]
            arr // [1,2,3]  原数组未被修改

        -- Array.prototype.filter   [数组过滤]
            var arr = [1,2,3,4,5,6,7,8,9,10]
            arr.filter((x,index) => {
                return index % 3===0 || x>=8
            })      // [1,4,7,8,9,10]
            arr // [1,2,3,4,5,6,7,8,9,10] 原数组未被修改

        -- Array.prototype.every & some
            var arr = [1,2,3,4,5]
            arr.every(x => {
                return x < 10
            })  // true

            arr.every(x => {
                return x < 3
            })  // false

            arr.some(x => {
                return x === 3
            })  // true

            arr.some(x => {
                return x === 100
            })  // false

        -- Array.prototype.reduce & reduceRight(顺序从右到左)
            var arr = [1,2,3]
            var sum = arr.reduce((x,y) => {
                return x+y
            },0)    // 6       -- 第二个参数0是可选参数，指第一个值， 每次函数返回值作为下一次的x 
            arr     // [1,2,3]  原数组未被修改

            arr = [3,9,6]
            var max = arr.reduce((x,y) => {
                console.log(x + '|' + y)
                return x > y ? x : y
            })

            // 3|9
            // 9|6
            max // 9

            max = arr.reduceRight((x,y) => {
                console.log(x + '|' + y)
                return x > y ? x : y
            })
            // 6|9
            // 9|3
            max // 9

        -- Array.prototype.indexOf(从左到右) & lastIndexOf(从右到左)    [数组检索]
            var arr = [1,2,3,2,1]
            arr.indexOf(2)  // 1
            arr.indexOf(99) // -1   -- 没有返回-1
            arr.indexOf(1,1)    // 4
            arr.indexOf(1,-3)   // 4
            arr.indexOf(2,-1)   // -1
            arr.lastIndexOf(2)  // 3
            arr.lastIndexOf(2,-2)   // 3
            arr.lastIndexOf(2,-3)   // 1

        -- Array.isArray    [判断是否为数组]
            Array.isArray([])   // true
            [] instanceOf Array // true
            ({}).toString.apply([]) === '[object Array]'    // true
            [].constructor === Array // true   -- constructor可以修改








*/