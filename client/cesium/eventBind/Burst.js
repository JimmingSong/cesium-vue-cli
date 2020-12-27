export default class Burst {
    constructor (viewer) {
        this.scene = viewer.scene;
        this.camera = this.scene.camera;
        this.enabled = false;
        this.pickedEntities = undefined;
        this.billboardEyeOffsets = undefined;
        this.labelEyeOffsets = undefined;
        this.linePrimitive = undefined;
        this.radius = undefined;
        this.center = undefined;
        this.pixelPadding = 10.0;
        this.angleStart = 0.0;
        this.angleEnd = Cesium.Math.PI;
        this.maxDimension = undefined;
        this.currentObject = null;
    }
    starBurst(mousePosition) {
        if (Cesium.defined(this.pickedEntities)) return;

        let pickedObjects = this.scene.drillPick(mousePosition);
        if (!Cesium.defined(pickedObjects) || pickedObjects.length < 2) return;

        let billboardEntities = [];
        let length = pickedObjects.length;
        let i = 0;
        for (i = 0; i < length; ++i) {
            let pickedObject = pickedObjects[i];
            if (pickedObject.primitive instanceof Cesium.Billboard) {
                billboardEntities.push(pickedObject);
            }
        }

        if (billboardEntities.length === 0) return;

        let pickedEntities = (this.pickedEntities = []);
        let billboardEyeOffsets = (this.billboardEyeOffsets = []);
        let labelEyeOffsets = (this.labelEyeOffsets = []);
        let lines = [];
        this.maxDimension = Number.NEGATIVE_INFINITY;

        let angleStart = this.angleStart;
        let angleEnd = this.angleEnd;

        let angle = angleStart;
        let angleIncrease;
        let magnitude;
        let magIncrease;
        let maxDimension;

        length = billboardEntities.length;
        i = 0;
        while (i < length) {
            let object = billboardEntities[i];
            if (pickedEntities.length === 0) {
                this.center = Cesium.Cartesian3.clone(
                    object.primitive.position
                );
            }

            if (!Cesium.defined(angleIncrease)) {
                let width = object.primitive.width;
                let height = object.primitive.height;
                maxDimension =
                    Math.max(width, height) * object.primitive.scale +
                    this.pixelPadding;
                magnitude = maxDimension + maxDimension * 0.5;
                magIncrease = magnitude;
                angleIncrease = maxDimension / magnitude;
            }

            this.offsetBillboard(object.id, object.primitive.position, angle, magnitude, lines, billboardEyeOffsets, labelEyeOffsets);
            pickedEntities.push(object);

            let reflectedAngle = angleEnd - angle;
            if (
                i + 1 < length &&
                reflectedAngle - angleIncrease * 0.5 > angle + angleIncrease * 0.5
            ) {
                object = billboardEntities[++i];
                this.offsetBillboard(object.id, object.primitive.position, reflectedAngle, magnitude, lines, billboardEyeOffsets, labelEyeOffsets);
                pickedEntities.push(object);
            }

            angle += angleIncrease;
            if (reflectedAngle - angleIncrease * 0.5 < angle + angleIncrease * 0.5) {
                magnitude += magIncrease;
                angle = angleStart;
                angleIncrease = maxDimension / magnitude;
            }
            ++i;
        }

        // Add lines from the pick center out to the translated billboard.
        let instances = [];
        length = lines.length;
        for (i = 0; i < length; ++i) {
            let pickedEntity = pickedEntities[i];
            this.maxDimension = Math.max(pickedEntity.primitive.width, pickedEntity.primitive.height, this.maxDimension);
            instances.push(
                new Cesium.GeometryInstance({
                    geometry: new Cesium.SimplePolylineGeometry({
                        positions: [this.center, lines[i]],
                        arcType: Cesium.ArcType.NONE,
                        granularity: Cesium.Math.PI_OVER_FOUR,
                    }),
                    attributes: {
                        color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.WHITE),
                    },
                })
            );
        }

        this.linePrimitive = this.scene.primitives.add(
            new Cesium.Primitive({
                geometryInstances: instances,
                appearance: new Cesium.PerInstanceColorAppearance({
                    flat: true,
                    translucent: false,
                }),
                asynchronous: false,
            })
        );

        viewer.selectedEntity = undefined;
        this.radius = magnitude + magIncrease;
    }
    updateStarBurst(mousePosition) {
        if (!Cesium.defined(this.pickedEntities)) {
            return;
        }

        if (!this.enabled) {
            this.enabled = true;
            return;
        }

        let screenPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.scene, this.center);
        let fromCenter = Cesium.Cartesian2.subtract(
            mousePosition,
            screenPosition,
            new Cesium.Cartesian2()
        );
        let radius = this.radius;

        if (Cesium.Cartesian2.magnitudeSquared(fromCenter) > radius * radius || fromCenter.y > 3.0 * (this.maxDimension + this.pixelPadding)
        ) {
            this.undoStarBurst();
        } else {
            this.showLabels(mousePosition);
        }
    }
    undoStarBurst() {
        let pickedEntities = this.pickedEntities;
        if (!Cesium.defined(pickedEntities)) {
            return;
        }

        let billboardEyeOffsets = this.billboardEyeOffsets;
        let labelEyeOffsets = this.labelEyeOffsets;

        for (let i = 0; i < pickedEntities.length; ++i) {
            let entity = pickedEntities[i].id;
            entity.billboard.eyeOffset = billboardEyeOffsets[i];
            if (Cesium.defined(entity.label)) {
                entity.label.eyeOffset = labelEyeOffsets[i];
                entity.label.show = false;
            }
        }

        // Remove lines from the scene.
        // Free resources and reset state.
        this.scene.primitives.remove(this.linePrimitive);
        this.linePrimitive = undefined;
        this.pickedEntities = undefined;
        this.billboardEyeOffsets = undefined;
        this.labelEyeOffsets = undefined;
        this.radius = undefined;
        this.enabled = false;
    }
    showLabels(mousePosition) {
        let pickedObjects = this.scene.drillPick(mousePosition);
        let pickedObject;

        if (Cesium.defined(pickedObjects)) {
            let length = pickedObjects.length;
            for (let i = 0; i < length; ++i) {
                if (pickedObjects[i].primitive instanceof Cesium.Billboard) {
                    pickedObject = pickedObjects[i];
                    break;
                }
            }
        }

        if (pickedObject !== this.currentObject) {
            if (
                Cesium.defined(pickedObject) &&
                Cesium.defined(pickedObject.id.label)
            ) {
                if (Cesium.defined(this.currentObject)) {
                    this.currentObject.id.label.show = false;
                }

                this.currentObject = pickedObject;
                pickedObject.id.label.show = true;
            } else if (Cesium.defined(this.currentObject)) {
                this.currentObject.id.label.show = false;
                this.currentObject = undefined;
            }
        }
    }

    offsetBillboard (entity, entityPosition, angle, magnitude, lines, billboardEyeOffsets, labelEyeOffsets) {
        let x = magnitude * Math.cos(angle);
        let y = magnitude * Math.sin(angle);

        let offset = new Cesium.Cartesian2(x, y);

        let drawingBufferWidth = this.scene.drawingBufferWidth;
        let drawingBufferHeight = this.scene.drawingBufferHeight;
        let pixelRatio = this.scene.pixelRatio;

        let diff = Cesium.Cartesian3.subtract(
            entityPosition,
            this.camera.positionWC,
            new Cesium.Cartesian3()
        );
        let distance = Cesium.Cartesian3.dot(this.camera.directionWC, diff);

        let dimensions = this.camera.frustum.getPixelDimensions(
            drawingBufferWidth,
            drawingBufferHeight,
            distance,
            pixelRatio,
            new Cesium.Cartesian2()
        );
        Cesium.Cartesian2.multiplyByScalar(
            offset,
            Cesium.Cartesian2.maximumComponent(dimensions),
            offset
        );

        let labelOffset;
        let billboardOffset = entity.billboard.eyeOffset;

        let eyeOffset = new Cesium.Cartesian3(offset.x, offset.y, 0.0);
        entity.billboard.eyeOffset = eyeOffset;
        if (Cesium.defined(entity.label)) {
            labelOffset = entity.label.eyeOffset;
            entity.label.eyeOffset = new Cesium.Cartesian3(
                offset.x,
                offset.y,
                -10.0
            );
        }

        let endPoint = Cesium.Matrix4.multiplyByPoint(
            this.camera.viewMatrix,
            entityPosition,
            new Cesium.Cartesian3()
        );
        Cesium.Cartesian3.add(eyeOffset, endPoint, endPoint);
        Cesium.Matrix4.multiplyByPoint(
            this.camera.inverseViewMatrix,
            endPoint,
            endPoint
        );
        lines.push(endPoint);

        billboardEyeOffsets.push(billboardOffset);
        labelEyeOffsets.push(labelOffset);
    }
}
