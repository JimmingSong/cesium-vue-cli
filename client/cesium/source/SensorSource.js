let {CustomDataSource} = Cesium;
export default class SensorSource {
    constructor(viewer) {
        let source = new CustomDataSource('sensorRange');
        viewer.dataSources.add(source);
        this.entities = source.entities;
    }
    getSensor (id) {
        return this.entities.getById(id);
    }
    addSensor (options) {
        return this.entities.add(options);
    }
    updateSensorById (id, options) {
        let entity = this.getEntity(id);
        if (!entity) return false;
    }
}
