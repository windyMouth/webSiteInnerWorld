class Node 
{
    data;
    links;

    constructor(data)
    {
        this.data = data;
        this.links = [];
    }

    addLink(id)
    {
        this.links.push(id);
    }
}

class Tree
{
    activeNodeId;
    rootNodeId;
    activeLink;
    nodes;
    id;

    constructor(){
        this.nodes = new Map();
        this.id = 0;
        this.activeNodeId = this.id;
        this.rootNodeId = this.id;
        this.activeLink = 0;
    }

    addNode(newNode)
    {
        const attachmentNode = this.nodes.get(this.activeNodeId);
        if(attachmentNode){
            attachmentNode.addLink(this.id);
            newNode.addLink(this.activeNodeId);
        }else{

            this.activeNodeId = this.id;
            this.rootNodeId = this.id;
        }
        this.nodes.set(this.id, newNode);
        this.id++;
    }

    insertNode(attachmentNodeId, newNode)
    {
        const attachmentNode = this.nodes.get(attachmentNodeId);
        if(attachmentNode){
            attachmentNode.addLink(this.id);
            newNode.addLink(attachmentNodeId);
            this.nodes.set(this.id, newNode);
            this.id++;
            return true;
        }else{
            return false;
        }
    }

    insertNodeAlt(newNode, attachmentNodeId)
    {
        const attachmentNode = this.nodes.get(attachmentNodeId);
        if(attachmentNode){
            attachmentNode.addLink(this.id);
            newNode.addLink(attachmentNodeId);
            this.nodes.set(this.id, newNode);
            this.id++;
            return true;
        }else{
            return false;
        }
    }

    removeNode(nodeId)
    {
        const node = this.nodes.get(nodeId);
        if(node){
            for(let i = 0; i < node.links.length; ++i){
                let neighbourNode = this.nodes.get(node.links[i]);
                for(let j = 0; j < node.links.length; ++j){
                    if(i != j){
                        neighbourNode.links.push(node.links[j]);
                    }
                }
            }
            if(this.nodes.size == 1){
                this.id = 0;
                this.activeNodeId = this.id;
                this.rootNodeId = this.id;
                this.activeLink = 0;
            }else{
                if(this.activeNodeId == nodeId){
                    this.activeNodeId = node.links[0];
                    this.activeLink = 0;
                }
                if(this.rootNodeId == nodeId){
                    this.rootNodeId = node.links[0];
                }
            }
            this.nodes.delete(nodeId);
            return true;
        }else{
            return false;
        }
    }

    addLink(firstNodeId, secondNodeId)
    {
        const firstNode = this.nodes.get(firstNodeId);
        const secondNode = this.nodes.get(secondNodeId);
        if(firstNode && secondNode){
            firstNode.links.push(secondNodeId);
            secondNode.links.push(firstNodeId);
            return true;
        }else{
            return false;
        }
    }

    removeLink(firstNodeId, secondNodeId)
    {
        const firstNode = this.nodes.get(firstNodeId);
        const secondNode = this.nodes.get(secondNodeId);
        if(firstNode.links.length > 1 && secondNode.links.length >= 1){
            const idx1 = firstNode.links.findIndex(secondNodeId);
            firstNode.links.splice(idx1, 1);
            const idx2 = secondNode.links.findIndex(firstNodeId);
            secondNode.links.splice(idx2, 1);
            return true;
        }else{
            return false;
        }
    }

    selectPreviousLink()
    {
        const activeNode = this.nodes.get(this.activeNodeId);
        const qtyLinks = activeNode.links.length;
        this.activeLink = (--this.activeLink >= 0) ? this.activeLink : qtyLinks - 1;
        console.log(`[Tree]: active node id=${this.activeNodeId}; link=${this.activeLink}`);
    }

    selectNextLink()
    {
        const activeNode = this.nodes.get(this.activeNodeId);
        const qtyLinks = activeNode.links.length;
        this.activeLink = ++this.activeLink % qtyLinks;
        console.log(`[Tree]: active node id=${this.activeNodeId}; link=${this.activeLink}`);
    }

    followLink()
    {
        if(this.nodes.size > 1){
            const oldActiveNode = this.nodes.get(this.activeNodeId);
            this.activeNodeId = oldActiveNode.links[this.activeLink];
            this.activeLink = 0;
            console.log(`[Tree]: active node id=${this.activeNodeId}; link=${this.activeLink}`);
        }
    }

    root()
    {
        this.activeNodeId = this.rootNodeId;
        this.activeLink = 0;
        console.log(`[Tree]: active node id=${this.activeNodeId}; link=${this.activeLink}`);
    }
}