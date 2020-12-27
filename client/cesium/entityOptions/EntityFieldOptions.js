export class BillBoard {
    constructor() {
        this.show = true;
        this.image = '';
        this.scale = 1.0;
    }
    setShow (val) {
        this.show = val;
        return this;
    }
    setImage (val) {
        this.image = val;
        return this;
    }
    setScale (val) {
        this.scale = val;
        return this;
    }
}
export class Point {
    constructor() {
        this.show = undefined;
        this.pixelSize = 1;
    }
    setShow (val) {
        this.show = val;
        return this;
    }
    setPixelSize (val) {
        this.pixelSize = val;
        return this;
    }
}
