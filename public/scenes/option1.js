const option1 = (sketch) => {
    
    let scale;
    let time;
    let particles;

    sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        scale = Math.min(sketch.width, sketch.height);
        time = 0;
        const particlesQty = 7;
        particles = new Particles(particlesQty, { "x": 0.5*sketch.width, "y": 0.5*sketch.height}, 0.2*scale);
    }

    sketch.draw = () => {
        sketch.background(255);
        particles.update();
    }

    sketch.mouseClicked = () => {
        console.log("clickOption1");
        // let el = document.getElementById("sketchManager");
        // el.setAttribute("nextSketch", "intro");
    }

    sketch.mouseMoved = () => {
        
    }
    class Particles
    {
        position;
        acceleration;
        time;
        size;
        featured;
    
        constructor(qty, pos, size)
        {
            this.featured = Math.floor(Math.random() * qty);
            this.position = [];
            this.acceleration = [];
            for(let i = 0; i < qty; ++i){
                this.position.push(this.getFreePosition());
                this.acceleration.push(sketch.createVector(0, 0));
            }
            this.time = 0;
            this.size = size;
        }

        isOverlap(pos)
        {
            for(let i = 0; i < this.position.length; ++i){ 
                if(sketch.dist(this.position[i].x, this.position[i].y, pos.x, pos.x) < this.size){
                    return true;
                }
            }
            return false;
        }

        getFreePosition()
        {
            let pos = sketch.createVector();
            let maxCount = 1000;
            while(--maxCount > 0){
                pos.x = Math.random()*sketch.width;
                pos.y = Math.random()*sketch.height;
                
                if(!this.isOverlap(pos)){
                    return pos;
                }
            }
        }
    
        update()
        {
            const accelerationMax = 0.01;
            for(let i = 0; i < this.position.length; ++i){
                this.acceleration[i].x += 0.65*(1-2*sketch.noise((i*i+5)*this.time,this.time)) - 0.1*this.acceleration[i].x;
                this.acceleration[i].y += 0.65*(1-2*sketch.noise((i*i+5)*this.time)) - 0.1*this.acceleration[i].y;
                
                this.repell();
                this.applyBorder();
                this.position[i].x += this.acceleration[i].x;
                this.position[i].y += this.acceleration[i].y;
                
                if(this.featured == i){
                    sketch.fill(255);
                }else{
                    sketch.fill(0);
                }
                sketch.circle(this.position[i].x, this.position[i].y, this.size);
                this.time += 0.0001;
            }
        }

        repell()
        {
            for(let i = 0; i < this.position.length; ++i){
                for(let j = 0; j < this.position.length; ++j){
                    let offset = sketch.dist(this.position[i].x, this.position[i].y, this.position[j].x, this.position[j].y);
                    if(i != j && offset < 1.5*this.size){
                        // let offsetX = this.position[i].x - this.position[j].x;
                        // let offsetY = this.position[i].y - this.position[j].y;

                        // this.acceleration[i].x += 0.5*offsetX/sketch.width;
                        // this.acceleration[j].x += 0.5*offsetX/sketch.width;
                        // this.acceleration[i].y -= 0.5*offsetY/sketch.width;
                        // this.acceleration[j].y += 0.5*offsetY/sketch.width;
                        // this.acceleration[i].y = -this.acceleration[i].y;
                        // this.acceleration[j].x = -this.acceleration[j].x;
                        // this.acceleration[j].y = -this.acceleration[j].y;
                    }
                }
            }
        }

        applyBorder()
        {
            let margin = 0.05;
            const accelerationMax = 0.001;
            // sketch.push()
            // sketch.fill(255);
            // sketch.rect(margin*sketch.width, margin*sketch.height, (1-2*margin)*sketch.width, (1-2*margin)*sketch.height);
            // sketch.pop();
            for(let i = 0; i < this.position.length; ++i){

                if(Math.abs(this.position[i].x - 0.5*sketch.width) > margin*sketch.width){
                    let offsetX = this.position[i].x - 0.5*sketch.width;
                    this.acceleration[i].x -= 0.5*offsetX/sketch.width;
                }
                if(Math.abs(this.position[i].y - 0.5*sketch.height) > margin*sketch.height){
                    let offsetY = this.position[i].y - 0.5*sketch.height;
                    this.acceleration[i].y -= 0.5*offsetY/sketch.height;
                }
            }
        }
    }
}