export default class SourceCollection {
    constructor (viewer) {
        this.viewer = viewer;
        this.entitySourceCache = {};
        this.primitiveSourceCache = {};
        this.czmlSourceCache = {};
    }

    entitySource (sourceName) {
        let source = new Cesium.CustomDataSource(sourceName);
        this.viewer.dataSources.add(source);
        this.entitySourceCache[sourceName] = source;
        return source;
    }
    primitiveSource (sourceName) {}
    czmlSource () {
        let source = new Cesium.CzmlDataSource(sourceName);
        this.viewer.dataSources.add(source);
        this.czmlSourceCache[sourceName] = source;
    }
    /**
     *
     * @param sourceName
     * @param type {String} entity|primitive|czml
     */
    createSource (sourceName, type) {
        if (!type) {
            return this.viewer;
        }
        return this[`${type}Source`](sourceName);
    }
    removeEntitySourceEntity () {
        Object.keys(this.entitySourceCache).forEach(item => {
            this.entitySourceCache[item].entities.removeAll();
        });
    }
    removeCzmlSourceEntity () {
        Object.keys(this.czmlSourceCache).forEach(item => {
            this.czmlSourceCache[item].entities.removeAll();
        });
    }
    removePrimitiveSourceEntity () {
        Object.keys(this.primitiveSourceCache).forEach(item => {
            this.primitiveSourceCache[item].entities.removeAll();
        });
    }
    removeAllEntity () {
        this.removeEntitySourceEntity();
        this.removeCzmlSourceEntity();
        this.removePrimitiveSourceEntity();
        this.viewer.entities.removeAll();
    }
    removeSource (sourceName, type) {

    }
    clearSource () {}
    getSource (sourceName, type) {
        if (!type) {
            return this.viewer;
        }
        return this[`${type}SourceCache`][sourceName];
    }
}
