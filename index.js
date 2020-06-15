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
        if (this.keyMap[index]){
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
hashTable.set("Apples", 4)

console.log(hashTable.keys())
console.log(hashTable.values())

