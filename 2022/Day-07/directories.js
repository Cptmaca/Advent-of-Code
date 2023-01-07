const fs = require('fs');

let lines
let demo = true;
try {
    const data = fs.readFileSync(demo ? 'demo input.txt' : 'input.txt', 'utf8')
    lines = data.split('\r\n')
} catch (err) {
    console.error(err)
}

// returns an object with parsed terminal lines
function parseTerminalLines(terminalLines) {
    let terminalLinesObj = {}
    for (let i = 0; i < terminalLines.length; i++) {
        let line = terminalLines[i]
        let item = {}
        if (line.startsWith('$')) {
            item.type = 'command'
            item.name = line.split(' ')[1]
            if (item.name == 'cd')
                item.parameter = line.split(' ')[2]
        }
        if (line.startsWith('dir')) {
            item.type = 'dir'
            item.name = line.split(' ')[1]
        }
        if (line.match(/^\d/)) {
            item.type = 'file'
            item.name = line.split(' ')[1]
        }
        terminalLinesObj[i] = item
    }
    return terminalLinesObj
}

// console.log(parseTerminalLines(lines))

// let's navigate a sample file structure
// function takes a parsed line object
let terminalLinesObj = parseTerminalLines(lines)

function navigateUpdatePath(line, path, tree) {
    let pathCpy = path.slice() //do not alter the original array
    console.log('line:', line)
    if (line.type == 'command' && line.name == 'cd') {
        if (line.parameter == '/')
            return ['root']
        else if (line.parameter == '..')
            return pathCpy.slice(0, -1)
        else // cd directory
        {
            pathCpy.push(line.parameter)
            // TODO: add children to tree
            let newChild = {
                type: 'dir',
                name: line.parameter,
                size: 0,
                children: []
            }
            console.log('inside the addchild part')
            addChild(tree, newChild, pathCpy)

            return pathCpy
        }
    }
}

function modifyTree(line, tree, path, newChildObj) {
    let terminalLine = line
    let modifiedTree = tree
    let pathCpy = path

    return modifiedTree
}

let path = []
let mainDirTree = {
    name: 'root',
    type: 'dir',
    size: 0,
    children: []
};

for (let i = 0; i < lines.length; i++) {
    if (terminalLinesObj[i].name == 'cd') {
        path = navigateUpdatePath(terminalLinesObj[i], path, mainDirTree).slice()
        console.log(i, 'navigated', path)
    }
}

// TODO: remaining to implement getting the info and building 
// the tree object with sizes etc.

function addChild(node, childObj, path) {
    if (path.length === 0) {
        node.children.push(childObj);
    } else {
        for (let child of node.children) {
            console.log('child:', child)
            if (child.name === path[0]) {
                console.log('inside path')
                addChild(child, childObj, path.slice(1));
            }
        }
    }
}

function getItem(node, path) {
    if (path.length === 0) {
        return node;
    } else {
        for (let child of node.children) {
            if (child.name === path[0]) {
                return getItem(child, path.slice(1));
            }
        }
    }
}



let newChild = {
    type: '',
    name: '',
    size: 0,
    children: []
}

console.log(JSON.stringify(mainDirTree, null, 3));



// addChild(tree, { name: 'a', type: 'dir', children: [] }, '')
// console.log(JSON.stringify(tree, null, 3));
// addChild(tree, { name: 'b', type: 'dir', children: [] }, 'a')
// console.log(JSON.stringify(terminalLinesObj, null, 3));

// then let's get data or add data

// now let's integrate terminal lines and navigation



// this is to keep an organized console 
// (I am using nodemon)
console.log('--------- end ---------')