const option2 = (sketch) => {
    
    let scale;
    let time;

    sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        scale = Math.min(sketch.width, sketch.height);
        this.time = 0;
    }

    sketch.draw = () =>{
        sketch.background(0);
        sketch.noStroke();
        sketch.fill(255);
        sketch.circle((1 + 0.8*Math.sin(0.01*this.time))*sketch.width/2, sketch.height/2, 0.2*sketch.width);
        ++this.time;
    }

    sketch.mouseClicked = () => {
        console.log("clickOption1");
        let el = document.getElementById("sketchManager");
        el.setAttribute("nextSketch", "intro");
    }

    sketch.mouseMoved = () => {

    }
}