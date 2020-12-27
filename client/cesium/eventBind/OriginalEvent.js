let {ScreenSpaceEventType: {LEFT_CLICK, LEFT_DOUBLE_CLICK, LEFT_DOWN, LEFT_UP, RIGHT_DOWN, RIGHT_UP, RIGHT_CLICK, MOUSE_MOVE}} = Cesium;
export default class OriginalEvent {
    constructor(handler) {
        this.handler = handler;
    }
    leftClick (callback = () => {}) {
        this.handler.setInputAction(function (movement) {
            callback(movement);
        }, LEFT_CLICK);
    }
    leftDoubleClick (callback = () => {}) {
        this.handler.setInputAction(function (movement) {
            callback(movement);
        }, LEFT_DOUBLE_CLICK);
    }
    leftDown (callback = () => {}) {
        this.handler.setInputAction(function (movement) {
            callback(movement);
        }, LEFT_DOWN);
    }
    leftUp (callback = () => {}) {
        this.handler.setInputAction(function (movement) {
            callback(movement);
        }, LEFT_UP);
    }
    rightDown (callback = () => {}) {
        this.handler.setInputAction(function (movement) {
            callback(movement);
        }, RIGHT_DOWN);
    }
    rightUp (callback = () => {}) {
        this.handler.setInputAction(function (movement) {
            callback(movement);
        }, RIGHT_UP);
    }
    mouseMove (callback = () => {}) {
        this.handler.setInputAction(function (movement) {
            callback(movement);
        }, MOUSE_MOVE);
    }
}
