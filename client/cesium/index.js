import {token, viewerConfig} from './cesiumConfig';
import CreateEntity from "./createEntity";
import SourceManager from './source';
import EventBind from './eventBind';
const {Viewer, Color, Cartesian3, Camera} = Cesium;
class CesiumClass {
    constructor() {
        Cesium.Ion.defaultAccessToken = token;
        Camera.DEFAULT_VIEW_RECTANGLE = new Cesium.Rectangle.fromDegrees(89.5, 20.4, 110.4, 61.2); // 修改默认相机视角
        this.Color = Color;
        this.Cartesian3 = Cartesian3;
    }
    init (box, config = viewerConfig) {
        if (window.viewer) return;
        let viewer = new Viewer(box, config);
        this.source = new SourceManager(viewer);
        this.entity = new CreateEntity(viewer, this.source);
        this.event = new EventBind(viewer);
        this.viewer = viewer;
        window.viewer = viewer;
    }

    /**
     * 绿色框 锁定entity
     * @param entity
     */
    selectedEntity (entity) {
        this.viewer.selectedEntity = entity;
    }

    /**
     * 锁定视角
     * @param entity
     */
    trackedEntity (entity) {
        this.viewer.trackedEntity = entity;
    }
    flyTo (target, options) {
        this.viewer.flyTo(target, options);
    }
}
let cesium = new CesiumClass();
export default cesium;
