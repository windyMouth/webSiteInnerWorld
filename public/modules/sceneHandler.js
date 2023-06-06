class SceneHandler
{
    width;
    height;

    constructor(width, height)
    {
        this.width = width;
        this.height = height;
    }

    addRootScene(scene)
    {
        tree.addNode(new Node());
        scenes.set(tree.activeNodeId, scene);
    }

    addScene(scene)
    {
        
    }
}