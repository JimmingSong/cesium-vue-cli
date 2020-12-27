import Original from "./OriginalEvent";
import Burst from './Burst';
export default class EventBind extends Original{
    constructor(viewer) {
        let scene = viewer.scene;
        let camera = scene.camera;
        let handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        super(handler);
        this.camera= camera;
        this.viewer = viewer;
    }
    burstClick () {
        let burstObj = new Burst(this.viewer);
        this.leftClick((movement) => {
            burstObj.starBurst(movement.position);
        });
        this.mouseMove((movement) => {
            burstObj.updateStarBurst(movement.endPosition);
        });
        this.camera.moveStart.addEventListener(function () {
            // Reset the star burst on camera move because the lines from the center
            // because the line end points rely on the screen space positions of the billboards.
            burstObj.undoStarBurst();
        });
    }
}
