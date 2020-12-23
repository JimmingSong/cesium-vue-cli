let {CustomDataSource} = Cesium;
class WeaponSource {
    constructor(viewer) {
        let source = new CustomDataSource('weaponRange');
        viewer.dataSources.add(source);
        this.entities = source.entities;
    }
}
