export default class EntityOptions {
    constructor (id, position, source, options = {}) {
        let {point, billboard, label} = options;
        this.id = id;
        this.position = position;
        this.point = point;
        this.source = source;
        this.billboard = billboard;
        this.label = label;
        this.remove = function () {
            this.source.entities.remove(this);
        };
    }
    setPoint (val) {
        this.point = val;
        return this;
    }
    setBillBoard (val) {
        this.billboard = val;
        return this;
    }
    setSource (source) {
        this.source = source;
        return this;
    }
}
