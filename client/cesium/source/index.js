import ca from "element-ui/src/locale/lang/ca";

export default class SourceCollection {
    constructor (viewer) {
        this.viewer = viewer;
        this.entitySourceCache = {};
        this.primitiveSourceCache = {};
        this.czmlSourceCache = {};
    }
    defineType (type) {
        return type ? type : 'default';
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
     * @returns {module:cesium.CustomDataSource}
     */
    createSource (sourceName, type) {
        type = this.defineType(type);
        return this[`${type}Source`](sourceName);
    }
    removeSource (sourceName, type) {

    }
    getSource (sourceName, type) {
        return this[`${this.defineType(type)}SourceCache`][sourceName];
    }
}
