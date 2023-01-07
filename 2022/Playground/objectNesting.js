let obj = {}
let key = 'level'
obj[key] = {}

console.log(obj)

for (let i = 0; i < 5; i++) {
    obj[key + i] = {}
    obj[key + i]['item'] = {
        index: i,
        name: 'name',
        type: 'dir',
        size: 'size',
    }

}

console.log(obj)

function addNestedItem(obj) {
    obj.item2 = {}
}

addNestedItem(obj.level0)
console.log(obj)

console.log('end')