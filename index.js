// Hash tables
// "Hash tables are used to store key-value pairs. 
// They are like arrays, but the keys are not ordered
// Unlike arrays, hash tables are fast for all of the following operations: 
// finding values
// adding new values
// removing values"

//examples of bad Hash funcs
function slowHash(key) {
    for (let i = 0; i < 1000; i++) {
        console.log("Everyday im hashing")
    }
    return key[0].charCodeAt(0)
}

function randomHash(key) {
    return Math.floor(Math.random() * 1000)
}

function hashExample(key) {
    return 0
}

//basic hash tabel example
function hash(key, arrayLen) {
    let total = 0
    for (let char of key) {
        //map "a" to 1, "b" to 2 ect
        let value = char.charCodeAt(0) - 96
        total = (total + value) % arrayLen
    }
    return total
}

console.log(hash("pink", 10))
console.log(hash("orange", 10))
console.log(hash("cyan", 10))

// Using tables that have a size equal to a prime number reduces collisions in hash generation
// with an infiinte number of possible inputs and a limited storage array size, collisions are inevitable


// Separate Chaining
// storing more than one entry in a array index

// Linear Probing 
// Enter collision into next empty array index

// Hash Class

class HashTable {
    constructor(size = 53) {
        this.keyMap = new Array(size)
    }
    _hash(key) {
        let total = 0
        let _PRIME = 31
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i]
            let value = char.charCodeAt(0) - 96
            total = (total - _PRIME + value) % this.keyMap.length
        }
        return Math.abs(total)
    }
    set(key, value) {
        let index = this._hash(key)
        if (!this.keyMap[index]) {
            this.keyMap[index] = []
        }
        this.keyMap[index].push([key, value])
    }
    get(key) {
        let index = this._hash(key)
        let rtn;
        if (this.keyMap[index]) {
            this.keyMap[index].forEach((itm) => {
                if (itm[0] === key) {
                    rtn = itm[1]
                }
            })
        }
        return rtn
    }
    keys() {
        let keysArr = []
        this.keyMap.forEach((itm, idx) => {
            if (itm) {
                itm.forEach((subitm, subidx) => {
                    if (!keysArr.includes(subitm[0])) {
                        keysArr.push(this.keyMap[idx][subidx][0])
                    }
                })
            }
        })
        return keysArr
    }
    values() {
        let valuesArr = []
        this.keyMap.forEach((itm, idx) => {
            if (itm) {
                itm.forEach((subitm, subidx) => {
                    if (!valuesArr.includes(subitm[1])) {
                        valuesArr.push(this.keyMap[idx][subidx][1])
                    }
                })
            }
        })
        return valuesArr
    }
}

let hashTable = new HashTable()
console.log(hashTable)

hashTable.set("Beans", 42)
console.log(hashTable.keyMap)

console.log(hashTable.get("Beans"))

hashTable.set("Tomatos", 4)
hashTable.set("Apples", 5)

console.log(hashTable.keys())
console.log(hashTable.values())

/* Execution Context 
Global code
  The default enviroment where your code is executed for the first time
  Code and variables can be accessed from anything downstream

function code
  whenever the flow of execution enters the scope of a function


JS is a single threaded programing language, this means it runs programs line by line.
Code the resides within a function in JS is not run or read until it is called, this means that when the program is run JS will skip read line 1-5 and then skip the func in line 6 and continue reading after the func ends only when the func is called will JS jump back to line 6 and run the containing func.

When a function ends it is removed from the callstack and JS forgets the code, this means that using a funcion that repeatedly calling a function where the output dosnt change is not effecent, instead you should pass the return of that func to a variable and then use the var so JS dosnt have to re-run code.

e.g
func badFunc(){
    let a = 'this ', b = 'is ', c = 'not ', d = 'efficent '
    return a + b + c + d
}
console.log(badFunc())
console.log(badFunc())
console.log(badFunc())
console.log(badFunc())
console.log(badFunc())

Each time this ^ is run JS has to go back and re-do the badFunc code 
This is a better way of doing it

let rememberResult = badFunc
console.log(rememberResult)
console.log(rememberResult)
console.log(rememberResult)
console.log(rememberResult)
console.log(rememberResult)

This was JS dosnt need to re-run the func each time because it can retreive the result from the variable
*/

let a = 3                   // 1: declare var a and set val as 2
function addTwo(x){             // 3: declare func with input param of x
    let ret = x + 2                 // 4: declare var ret, set val as x param + 2
    return ret                      // 5: return val of ret var
}
let b = addTwo(a)           // 2: decalre var b and set as result of addTwo with input of var a
console.log(b)              // 6: print val of var b to console

// Function code/scope using Global code/scope
let val1 = 2                // 1: decalare var val1 and set val as 2
function multiplyThis(n) {      // 3: decalre func with input param of n
    let ret = n * val1              // 4: decalre var ret and set val as var n times val1
    return ret                      // 5: return val of ret var
}
                            // 2: decalre var multiplied and set val as result of multiplyThis fun with input of 6 
let multiplied = multiplyThis(6)
                            // 6: print string and val of multiplied var to console
console.log('example of scope:', multiplied)


let val = 7                     // 1: declare var val and set value as 7
function creativeAdder(){           // 4: declare creativeAdder func
    function addNumbers(a,b){           // 6: declare addNumbers func with params of a and b
        let ret = a + b                     // 7: declare var ret and set val as result of var a + var b
        return ret                          // 8: return val of ret var
    }
    return addNumbers               // 5: return result of addNumbers func with inherited inputs
}
let adder = creativeAdder()     // 2: declare var adder and set as creativeAdder func
let sum = adder(val,8)          // 3: daclare var sum and set val as result of adder var's creativeAdder 
                                //    func with input of val var value and 8
console.log('example of function returning a function: ', sum)
                                // 9: print string and val of sum var to console


function creativeCounter(){         // 3: declare creativeCounter func
    let counter = 0                     // 4: declare counter var and set val as 0
    const myFunction = function() {     // 6: declare myFunction var and set as annon func
        counter = counter + 1               // 7: itterate counter by 1
        return counter                      // 8: return val of counter var
    }
    return myFunction                   // 5: return result of myFunction with inherited inputs
}
const increment = creativeCounter() // 1: declare increment cont and set as creativeCounter func
const c1 = increment()              // 2: declare c1 cont and set as increment func
const c2 = increment()              // 9: declare c1 cont and set as increment func, repeats increment func
const c3 = increment()              // 10: declare c1 cont and set as increment func
console.log('example increment', c3, c1, c2)    // 11: print string and result of c3,c1 and c2 funcs

// Setting a var as a func allows JS to store the funcs variable states in the increment() var/func, this is called a closure.
// The next time we run increment() it will output the result but counter var in its local scope will be set as let counter = 1.
// Next time counter var will be 2, then 3 and ect.
// This is a simmilar concept to self edting code, the stored func increment() changes its set var values each time it is run.

