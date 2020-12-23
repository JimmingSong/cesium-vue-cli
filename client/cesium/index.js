import SensorSource from './source/SensorSource';
import CreateEntity from './createEntity';
const {Color, Cartesian3} = Cesium;
class CesiumClass extends CreateEntity {
    constructor() {
        super();
        this.Color = Color;
        this.Cartesian3 = Cartesian3;
    }
    init (box) {
        if (window.viewer) return;
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MWY1YWUwZi1kYzM2LTQ4OTAtYjVlNC1jOTdlYzU4MzI4YTAiLCJpZCI6MTc2MjAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzI0ODk5OTF9.nbVuTfapqu2h2qrhmnVy8BNrulpb2nOneRPr7u3M0Js';
        let viewer = new Cesium.Viewer(box);
        this.sensor = new SensorSource(viewer);
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
