import {BillBoard, Point} from './entityOptions/EntityFieldOptions';
import EntityOptions from "./entityOptions/EntityOptions";
export default class CreateEntity {
    constructor (viewer, source) {
        this.viewer = viewer;
        this.source = source;
    }
    createPoint (id, position, type, options) {
        let source = this.source.createSource(type);
        let billboard = new BillBoard().setImage('http://localhost:3001/facility.gif');
        let point = new Point().setPixelSize(3);
        let EntityOption = new EntityOptions(id, position, source, {billboard, point, ...options});
        return source.entities.add(EntityOption);
    }
    removeEntity () {
        this.source.entities.remove(this);
    }
    removeAll () {
        this.source.removeAllEntity();
    }
    getEntity (id, sourceName) {
        if (!sourceName) {
            return this.viewer.entities.getById(id);
        }
        let source = this.source.getSource(sourceName, 'entity');
        return source.entities.getById(id);
    }
}
