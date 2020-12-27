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
            cesium.entity.removeAll();
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

        let numBillboards = 10;
        let id = 1;
        let id1 = 2;
        for (let i = 0; i < numBillboards; ++i) {
            let pos = cesium.Cartesian3.fromDegrees(120, 38, 1000);
            let pos1 = cesium.Cartesian3.fromDegrees(116, 30, 1000);
            cesium.entity.createPoint(`${id}-${i}`, pos, {label: {text: 'Label' + i, show: true}});
            cesium.entity.createPoint(`${id1}-${i}`, pos1, {label: {text: 'Label' + i, show: true}});
        }
        cesium.event.burstClick();
    }
};
</script>
