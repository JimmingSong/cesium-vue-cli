<style scoped lang='less'>
@import "./home";
</style>

<template>
    <div class="self-menu">
        222
    </div>
</template>

<script>
import cesium from '@cesium';
// import OrbitLine from '@worker/orbit.worker.js';
export default {
    name: "home",
    mounted() {
        cesium.init('cesium-box');
        // let worker = new OrbitLine();
        // worker.postMessage(cesium);
        // worker.onmessage = function (e) {
        //     console.log(2, e);
        // }
        // worker.close();
        let option = {
            id: '123',
            position: cesium.Cartesian3.fromDegrees(120, 30, 1000),
            point: {
                pixelSize: 6
            }
        };
        let entity = cesium.sensor.addSensor(option);
        console.log(entity);
        cesium.viewer.selectedEntity = entity;
    }
};
</script>
