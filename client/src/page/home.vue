<style scoped lang='less'>
@import "./home";
</style>

<template>
    <div class="self-menu">
        <button @click="removeEntity">click me</button>
    </div>
</template>

<script>
import cesium from '@cesium';
// import OrbitLine from '@worker/orbit.worker.js';
export default {
    name: "home",
    methods: {
        removeEntity () {
            let entity = cesium.entity.getEntity(11, 'satellite');
            entity.remove();
        }
    },
    mounted() {
        cesium.init('cesium-box');
        // let worker = new OrbitLine();
        // worker.postMessage(cesium);
        // worker.onmessage = function (e) {
        //     console.log(2, e);
        // }
        // // worker.close();
        // let option = {
        //     id: '123',
        //     position: cesium.Cartesian3.fromDegrees(120, 30, 1000),
        //     point: {
        //         pixelSize: 6
        //     }
        // };
        // let entity = cesium.sensor.addSensor(option);
        // console.log(entity);
        // cesium.viewer.selectedEntity = entity;
        let pos = cesium.Cartesian3.fromDegrees(-82, 38, 1000);
        cesium.entity.createPoint(11, pos, 'satellite');
    }
};
</script>
