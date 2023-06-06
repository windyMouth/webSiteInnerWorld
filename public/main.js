import SketchManager from "./modules/sketchManager.js"

let sketchManager = new SketchManager();
sketchManager.add("intro", intro);
sketchManager.add("transition1", transition1);
sketchManager.add("option1", option1);
sketchManager.add("option2", option2);

sketchManager.switchSketch("intro");