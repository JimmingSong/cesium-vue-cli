export default class Original {
    constructor(viewer) {
        this.viewer = viewer;
    }
    selectedEntity (entity) {
        this.viewer.selectedEntity = entity;
    }

}
