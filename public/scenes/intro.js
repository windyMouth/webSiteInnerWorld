const intro = (sketch) => {
    
    let scale;
    let diamMin;
    let diamMax;
    let diamLeft;
    let diamRight;
    let montserrat;

    sketch.preload = () => {
        montserrat = sketch.loadFont('./assets/Montserrat-VariableFont_wght.ttf');
    }
        
    sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        scale = Math.min(sketch.width, sketch.height);
        diamMin = 0.3 * scale;
        diamMax = 0.32 * scale;
        diamLeft = diamMax;
        diamRight = diamMin;
        sketch.textFont(montserrat);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
    }

    sketch.draw = () => {
        sketch.noStroke();
        
        sketch.fill(255);
        sketch.rect(0, 0, sketch.width/2, sketch.height);
        
        sketch.fill(0);
        sketch.rect(sketch.width/2, 0, sketch.width, sketch.height);
        
        sketch.fill(0);
        sketch.textSize(0.03*scale);
        sketch.text("without darkness", 0.25*sketch.width, 0.2*sketch.height);

        sketch.fill(255);
        sketch.textSize(0.03*scale);
        sketch.text("there is no light", 0.75*sketch.width, 0.2*sketch.height);
        
        sketch.fill(255);
        sketch.arc(sketch.width/2, sketch.height/2, diamRight, diamRight, -sketch.PI/2, sketch.PI/2);
        
        sketch.fill(0);
        sketch.arc(sketch.width/2, sketch.height/2, diamLeft, diamLeft, sketch.PI/2, -sketch.PI/2);
    }

    sketch.mouseClicked = () => {
        
        if(mouseWithinLeftHalfCircle(sketch.mouseX, sketch.mouseY)){
            let el = document.getElementById("sketchManager");
            el.setAttribute("nextSketch", "transition1");
        }
        else if(mouseWithinRightHalfCircle(sketch.mouseX, sketch.mouseY)){
            let el = document.getElementById("sketchManager");
            el.setAttribute("nextSketch", "option2");
        }
    }

    sketch.mouseMoved = () => {
        
        if(mouseWithinLeftHalfCircle(sketch.mouseX, sketch.mouseY)){
            diamLeft = Math.min(diamMax, diamLeft + 1);
            diamRight = Math.max(diamMin, diamRight - 1);
        }else if(mouseWithinRightHalfCircle(sketch.mouseX, sketch.mouseY)){
            diamRight = Math.min(diamMax, diamRight + 1);
            diamLeft = Math.max(diamMin, diamLeft - 1);
        }else{
            diamLeft = Math.max(diamMin, diamLeft - 1);
            diamRight = Math.max(diamMin, diamRight - 1);
        }
    }

    function mouseWithinLeftHalfCircle(posX, posY){
        return (Math.pow((posX - sketch.width/2), 2) + Math.pow((posY - sketch.height/2), 2)) < Math.pow(0.5*diamLeft, 2)
            && posX < 0.5*sketch.width;
    }

    function mouseWithinRightHalfCircle(posX, posY){
        return (Math.pow((posX - sketch.width/2), 2) + Math.pow((posY - sketch.height/2), 2)) < Math.pow(0.5*diamRight, 2)
            && posX > 0.5*sketch.width;
    }
}