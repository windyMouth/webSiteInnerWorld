export default class SketchManager
{
    elements;
    htmlElement;
    p5Instance;
    observer;
    constructor()
    {
        this.elements = new Map();
        this.htmlElement = document.createElement("div");
        this.htmlElement.setAttribute("id", "sketchManager");
        this.htmlElement.setAttribute("nextSketch", "none");
        document.body.appendChild(this.htmlElement);
        this.subscribeAttributeChange();
    }

    add(name, sketch)
    {
        this.elements.set(name, sketch);
    }

    switchSketch(name)
    {
        if(this.p5Instance){
            this.p5Instance.remove();
        }
        const sketch = this.elements.get(name);
        this.p5Instance = new p5(sketch, this.htmlElement);
    }

    subscribeAttributeChange()
    {
        const callback = (mutationList, observer) => {
            for (const mutation of mutationList){
                if(mutation.type === "attributes"){
                    console.log("attr chng");
                    const attr = this.htmlElement.getAttribute("nextSketch");
                    if(attr){
                        this.switchSketch(attr);
                    }
                }
            }
        }

        this.observer = new MutationObserver(callback);
        this.observer.observe(this.htmlElement, { attributes: true });
    }
}