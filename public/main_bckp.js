let tree = new Tree();
let scenes = new Map();
let sceneHandler;
let renderer;
let montserrat;

function preload() {
    montserrat = loadFont('./assets/Montserrat-VariableFont_wght.ttf');
}

function setup()
{
    createCanvas(windowWidth, windowHeight);
    textFont(montserrat);
    textAlign(CENTER,CENTER);

    // sceneHandler = new SceneHandler(width, height);
    // sceneHandler.addRootScene(new Intro());
    
    tree.addNode(new Node());
    scenes.set(tree.activeNodeId, new Intro());
    
    tree.insertNode(0, new Node());
    scenes.set(1, new Option1());
    
    tree.insertNode(0, new Node());
    scenes.set(2, new Option2());

    // tree.insertNode(2, new Node("e"));
    // tree.insertNode(3, new Node("f"));
    // tree.addLink(3, 1);
    
    // tree.insertNodeAlt("intro");
    // tree.insertNodeAlt("option1", "intro");
    // tree.insertNodeAlt("option1", "intro");
    // tree.linkNodesAlt("option1", "option2");

    


    renderer = new Renderer(0.2*width, 0.2*height);
    renderer.addTree(tree);
    
    // noLoop();
}

function draw()
{
    background(0);
    // renderer.showBlocked();
    scenes.get(tree.activeNodeId).draw();
    
    tree.drawAlt();

    renderer.renderTree(tree);
}

function mouseClicked()
{
    scenes.get(tree.activeNodeId).mouseClicked();

    tree.mouseClickedAlt()
}

function mouseMoved()
{
    scenes.get(tree.activeNodeId).mouseMoved();
    tree.mouseMovedAlt();
}

function keyPressed()
{
    console.log(`[keyPressed]: ${keyCode}`);
    switch (keyCode) {
        case 65:
            console.log(`[keyPressed]: a`);
            tree.selectPreviousLink();
            break;
        case 68:
            console.log(`[keyPressed]: d`);
            tree.selectNextLink();
            break;
        case 83:
            console.log(`[keyPressed]: s`);
            tree.followLink();
            break;
        case 87:
            console.log(`[keyPressed]: w`);
            tree.root();
            break;
        default:
            break;
    }
}