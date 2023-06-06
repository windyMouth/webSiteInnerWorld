class Renderer
{
    width;
    height
    nodes;
    nodesMap;
    diam;
    blockedPixels;
    pixelDensity;

    constructor(width, height)
    {
        this.width = width;
        this.height = height;
        this.pixelDensity = pixelDensity();
        this.blockedPixels = new Array(this.width*this.height*this.pixelDensity);
        this.blockedPixels.fill(false);
        this.nodes = [];
        this.nodesMap = new Map();
        this.diam = Math.floor(0.02*width);
        this.blockPixels((x, y) => {
            return x < this.diam || x > this.width - this.diam || y < this.diam || y > this.height - this.diam
        });
    }

    positionNode()
    {
        const pos = this.getFreePosition();
        if(pos.valid){
            const circleFunc = this.getCircleFunc(pos.x, pos.y, this.diam);
            this.blockPixels(circleFunc);
            for(let i = 0; i < this.nodes.length; ++i){
                const func = this.getTwoCirclesShadingFunc(pos.x, pos.y, this.nodes[i].x, this.nodes[i].y, this.diam/2);
                this.blockPixels(func);
            }
            this.nodes.push(pos);
            return true;
        }else{
            return false;
        }
    }

    positionNode(id)
    {
        const pos = this.getFreePosition();
        if(pos.valid){
            let circleFunc = this.getCircleFunc(pos.x, pos.y, this.diam);
            this.blockPixels(circleFunc);
            for(const [key, value] of this.nodesMap){
                let func = this.getTwoCirclesShadingFunc(pos.x, pos.y, value.x, value.y, this.diam/2);
                this.blockPixels(func);
            }
            this.nodesMap.set(id, pos);
            return true;
        }else{
            return false;
        }
    }

    addTree(tree)
    {
        for(const [key, value] of tree.nodes){
            if(!this.positionNode(key)){
                return false;
            }
        }
    }

    getFreePosition()
    {
        let x = 0;
        let y = 0;
        let count = 0;
        const maxCount = 10000;
        do{
            x = Math.floor(Math.random()*this.width);
            y = Math.floor(Math.random()*this.height);
            count++;
        }while(!this.isPixelFree(x, y) && count <= maxCount)
        return {'x': x, 'y': y, 'valid': (count <= maxCount)};
    }

    isPixelFree(x, y)
    {
        return !this.blockedPixels[(x + y*this.width)];
    }

    getCircleFunc(x, y, r)
    {
        return function (argX, argY) { return (argX - x)*(argX - x) + (argY - y)*(argY - y) - r*r < 0; };
    }

    getTwoCirclesShadingFunc(x1, y1, x2, y2, r)
    {
        const denom = x2 - x1;
        const denomOpt = Math.sign(denom)*Math.max(Math.abs(denom),26);
        const k = (y2 - y1) / denomOpt;
        const c = r / Math.cos(Math.atan(k));
        const alpha = Math.atan(k);
        const gamma = Math.asin(2 * r / Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2)));
        const k1 = Math.tan(alpha + gamma);
        const k2 = Math.tan(alpha - gamma);
        return function (argX, argY) {
            const axis = argY + k * (x1 - argX) - y1;
            return (((axis + c > 0) && (axis - c < 0))
                || ((argY - k1 * (argX - x1) - y1 > 0) && (argY - k2 * (argX - x1) - y1 < 0))
                || ((argY - k1 * (argX - x2) - y2 < 0) && (argY - k2 * (argX - x2) - y2 > 0)));
        };
    }

    blockPixels(fun)
    {
        for(let i = 0; i < this.blockedPixels.length; ++i){
            this.blockedPixels[i] = fun(i%this.width, Math.floor(i/this.width)) ? true : this.blockedPixels[i];
        }
    }

    showBlocked()
    {
        const transparrent = color(0,0,0,0);
        const grey = color(125, 125, 125, 255);
        let arrSize = 4 * width * this.pixelDensity * height * this.pixelDensity;
        loadPixels();
        for(let i = 0; i < arrSize; i+=4){
            pixels[i] = red(this.blockedPixels[i/4] ? grey : transparrent);
            pixels[i+1] = green(this.blockedPixels[i/4] ? grey : transparrent);
            pixels[i+2] = blue(this.blockedPixels[i/4] ? grey : transparrent);
            pixels[i+3] = alpha(this.blockedPixels[i/4] ? grey : transparrent);
        }
        updatePixels();
    }

    render()
    {
        for(let i = 0; i < this.nodes.length; ++i){
            noFill();
            stroke(255,255,255);
            textSize(0.5*this.diam);
            text(i, this.nodes[i].x, this.nodes[i].y);
            stroke(255,0,0);
            circle(this.nodes[i].x, this.nodes[i].y, this.diam);
        }
    }

    renderTree(tree)
    {
        push();
            fill(0);
            noStroke();
            rect(0, 0, this.width, this.height);
            for(const [key, value] of this.nodesMap){
                push();
                    noFill();
                    stroke(255,255,255);
                    textSize(0.5*this.diam);
                    text(key, value.x, value.y);
                    if(tree.activeNodeId == key){
                        stroke(255,255,0);
                    }else{
                        stroke(255,0,0);
                    }
                    circle(value.x, value.y, this.diam);
                    const node = tree.nodes.get(key);
                    const links = node.links;
                    for(let i = 0; i < links.length; ++i){
                            const neighbour = this.nodesMap.get(links[i]);
                            if(key == tree.activeNodeId && i == tree.activeLink){
                                stroke(0,255,0,255);
                            }else{
                                stroke(0,255,0,75);
                            }
                            const dx = value.x - neighbour.x;
                            const dy = value.y - neighbour.y;
                            const angle = Math.atan(dy/dx) + (dx > 0 ? 0 : PI);
                            arc(neighbour.x, neighbour.y, 1.2*this.diam, 1.2*this.diam, angle - PI/8, angle + PI/8);
                            arc(value.x, value.y, 1.2*this.diam, 1.2*this.diam, angle - 9*PI/8, angle - 7*PI/8);
                            line(neighbour.x + 0.6*this.diam * Math.cos(angle), neighbour.y + 0.6*this.diam * Math.sin(angle),
                            value.x - 0.6*this.diam * Math.cos(angle), value.y - 0.6*this.diam * Math.sin(angle));
                    }
                pop();
            }
        pop();
    }
}