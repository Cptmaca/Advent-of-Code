let tree = {
    name: 'root',
    children: [
        {
            name: 'sub1',
            children: []
        },
        {
            name: 'sub2',
            children: []
        }
    ]
};

function appendChild(node, value, level) {
    if (level === 0) {
        node.children.push({ name: value, children: [] });
    } else {
        for (let child of node.children) {
            appendChild(child, value, level - 1);
        }
    }
}

appendChild(tree, 'subsub1', 1);
appendChild(tree, 'subsubsub1', 2);

console.dir(JSON.stringify(tree, null, 2));