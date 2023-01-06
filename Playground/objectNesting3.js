/*
a function that navigates a tree object and adds a single value to 
a specific point, you can use a recursive function that takes a node, 
a value to be added, and a path as arguments. The path is an array of 
strings that specifies the location of the node in the tree.

Kind thanks to ChatGPT.
*/

function addChild(node, value, path) {
    if (path.length === 0) {
        node.children.push(value);
    } else {
        for (let child of node.children) {
            if (child.name === path[0]) {
                addChild(child, value, path.slice(1));
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

let tree = {
    name: 'root',
    children: [
        {
            name: 'sub1',
            children: []
        },
        {
            name: 'sub2',
            children: [
                {
                    name: 'subsub1',
                    children: []
                }
            ]
        }
    ]
};

let newChild = {
    name: 'subsubsub1',
    children: []
}

addChild(tree, newChild, ['sub2', 'subsub1'])

console.dir(JSON.stringify(tree, null, 2));

let item = getItem(tree, ['sub2', 'subsub1']);
console.log(item);