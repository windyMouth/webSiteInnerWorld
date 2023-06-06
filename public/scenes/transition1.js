const transition1 = (sketch) => {
    
    let scale;
    let time;

    sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        scale = Math.min(sketch.width, sketch.height);
        time = 0;
        setTimeout(() => {
            let el = document.getElementById("sketchManager");
            el.setAttribute("nextSketch", "option1");
        }, 2000);
    }

    sketch.draw = () => {
        sketch.background(0);
        sketch.noStroke();
        sketch.fill(255);
        sketch.circle(sketch.width/2, sketch.height/2, 0.3*scale*(1 + 20*Math.sin(0.01*time)));
        ++time;
    }
}