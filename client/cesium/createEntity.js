import {pointConfig} from './cesiumConfig';
export default class CreateEntity {
    constructor (viewer, source) {
        this.viewer = viewer;
        this.source = source;
    }
    createPoint (id, position, type, options) {
        let source = this.source.createSource(type, 'entity');
        return source.entities.add({
            id,
            position,
            point: {
                ...pointConfig,
                ...options
            },
            remove: this.removeEntity,
            source
        });
    }
    removeEntity () {
        this.source.entities.remove(this);
    }
    getEntity (id, sourceName) {
        let source = this.source.getSource(sourceName, 'entity');
        return source.entities.getById(id);
    }
}
