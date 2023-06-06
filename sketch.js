
// class Node 
// {
//     id;
//     data;
//     links;
//     static count = 0;
//     constructor()
//     {
//         this.id = count++;
//         this.links = [];
//     }
//     link(node)
//     {
//         if(node !== this)
//         {
//             links.push(node);
//             return node;
//         }
//         return this;
//     }
//     draw()
//     {

//     }
// }

// class Tree
// {
//     head;
//     current;
//     constructor()
//     {
//         this.head = new Node();
//         this.current = this.head;
//     }
//     push(node)
//     {
//         current = current.link(node);
//         return current;
//     }
//     insert(id, node)    // add child to parent node, return id  
//     {

//     }
//     next()
//     {

//     }
//     traverse()
//     {

//     }
// }

// let tree = new Tree();
// tree.push(new Node());  // 0
// tree.push(new Node());  // 1
// tree.push(new Node());  // 2
// tree.push(new Node());  // 3
// let originId = 1;
// let destinationId = 3;
// tree.link(originId, destinationId);
// tree.next();




class Node 
{
    #id;
    #data;
    #links;
    static #count = 0;
    constructor()
    {
        this.id = Node.#count++;
        this.#links = [];
    }
    addLink(id)
    {
        if(id !== this.#id){
            this.#links.push(id);
        }
    }
}


let node = new Node();
node.addLink(1);
node.addLink(2);
node.addLink(3);
let links = node.getLinks()
console.log(links);
links[1] = 33;
console.log(links);

