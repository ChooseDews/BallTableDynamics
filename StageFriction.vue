

<template>
  <div>
    <div class="stage"></div>

    <div class="controls">
      <i class="material-icons" @click="dt = dt / 2">fast_rewind</i>
      <i class="material-icons" @click="paused = true">pause</i>
      <i class="material-icons" @click="paused = false">play_arrow</i>
      <i class="material-icons" @click="dt = dt * 2">fast_forward</i>
      <i class="material-icons" @click="reloadBoard()">restore</i>

      <div style="float: right">
        <input v-model="iv[0]" type="text" />
        <input v-model="iv[1]" type="number" />
        <input v-model="iv[2]" type="number" />
        <input v-model="iv[3]" type="number" />

        <input placeholder="m_1" v-model="iv[4]" type="number" />
        <input placeholder="m_1"  v-model="iv[5]" type="number" />

        <i class="material-icons" @click="applyIV()">save</i>
      </div>
    </div>
  </div>
</template>

<script>
const THREE = require("three");
import Vue from "vue";
const {
  OrbitControls,
  MapControls,
} = require("./node_modules/three/examples/jsm/controls/OrbitControls.js");

const OrientationGizmo = require("three-orientation-gizmo");

const SimpleDynamics = require("./solutions/simpleFriction");

const {
  OBJLoader,
} = require("./node_modules/three/examples/jsm/loaders/OBJLoader.js");
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import tableGeo from "./table.glb";

export default Vue.extend({
  data() {
    return {
      paused: false,
      dt: 0.01,
      iv: [4, 0, 0, 1, 1, 1],
    };
  },
  methods: {
    reloadBoard() {
      SimpleDynamics.reload();
    },
    applyIV() {
      SimpleDynamics.reset(this.iv.map(Number));
    },
  },
  mounted() {
    let width = 800;
    let height = 500;

    let self = this;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialiasing: true,
      alpha: true,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default

    camera.up.set(0, 0, 1);

    renderer.setSize(width, height);
    const controls = new OrbitControls(camera, renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);

    var orientationGizmo = new OrientationGizmo(camera, {
      size: 100,
      padding: 20,
      bubbleSizeSeconday: 0.001,
    });
    this.$el.childNodes[0].appendChild(orientationGizmo);
    this.$el.childNodes[0].appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 32, 32);

    let material = new THREE.MeshStandardMaterial({
      color: 0xff0000,

      roughness: 0,
      metalness: 0.2,
    });

    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.z = 0.5;
    sphere.position.x = 1;
    scene.add(sphere);

    const Tablegeometry = new THREE.PlaneGeometry(70, 70);
    const Tablematerial = new THREE.MeshStandardMaterial({
      color: 0x808080,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(Tablegeometry, Tablematerial);
    plane.position.z = -0.1;
    plane.receiveShadow = true;
    scene.add(plane);

    //weight
    const weightGeometry = new THREE.CylinderGeometry(2, 2, 5, 32);
    const weightMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    const weight = new THREE.Mesh(weightGeometry, material);
    weight.up.set(0, 0, 1);
    weight.rotateX(Math.PI / 2);
    scene.add(weight);

    const loader = new GLTFLoader();

    loader.load(
      tableGeo,
      function (gltf) {
        let scale = 50;
        gltf.scene.rotateX(Math.PI / 2);
        gltf.scene.position.z = -40.469;
        gltf.scene.scale.set(scale, scale, scale * 2);
        gltf.scene.receiveShadow = true;
        gltf.scene.traverse(function (node) {
          if (node.isMesh) {
            node.castShadow = true;
          }
        });
        gltf.scene.castShadow = true;
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    const light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(light);

    const pointLight = new THREE.PointLight(0xffffff, 0.5, 1000);
    pointLight.position.set(0, 0, 50);
    scene.add(pointLight);
    pointLight.castShadow = true; // default false
    pointLight.rotation.x = Math.PI / 2;
    pointLight.up.set(0, 0, 1);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0000ff,
    });

    const points = [];
    points.push(new THREE.Vector3(0, 0, 0.5));
    points.push(sphere.position);

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

    const dir = new THREE.Vector3(1, 2, 0);
    dir.normalize();
    const origin = new THREE.Vector3(0, 0, 0);
    const length = 1;
    const hex = 0xffff00;
    const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
    scene.add(arrowHelper);

    camera.position.z = 40;
    controls.update();

    let t = 0;

    let initialValue = [12, 0, 0, 0.288];
    SimpleDynamics.reset(initialValue);
    updateGraphics(initialValue);

    function animate() {
      requestAnimationFrame(() => {
        animate();
        orientationGizmo.update();
      });
      t = t + 10;

      if (self.paused == false) {
        let step = SimpleDynamics.step(self.dt);
        updateGraphics(step.y);
      }

      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();
      renderer.render(scene, camera);
    }
    function updateGraphics(sol) {
      let x = sol[0] * Math.cos(sol[2]);
      let y = sol[0] * Math.sin(sol[2]);
      let length = 80;

      let spherePosition = [x, y, 1];
      let vx = sol[1] * Math.cos(sol[2]) - sol[3] * sol[0] * Math.sin(sol[2]);
      let vy = sol[1] * Math.sin(sol[2]) + sol[3] * sol[0] * Math.cos(sol[2]);
      let dir = new THREE.Vector3(vx, vy, 0);
      weight.position.z = -(length - sol[0]);
      let pos = new THREE.Vector3(...spherePosition);
      sphere.position.set(...spherePosition);
      arrowHelper.position.set(...spherePosition);
      arrowHelper.setDirection(dir.normalize());
      arrowHelper.setLength(Math.sqrt(vx * vx + vy * vy) * 2);
      line.geometry.setFromPoints([
        new THREE.Vector3(0, 0, -(length - sol[0])),
        new THREE.Vector3(0, 0, 0.5),
        pos,
      ]);
    }

    animate();
  },
});
</script>

<style lang="scss">
.stage {
  canvas {
    margin: auto;
    border: 1px solid black;
  }
}
.controls {
  max-width: 800px;
  margin: auto;
  padding-left: 20px;
  input {
    max-width: 50px;
    line-height: 15px;
    padding: 1px;
  }
}
orientation-gizmo {
  position: absolute;
  right: calc(50vw - 400px);
  canvas {
    border: none !important;
  }
}
</style>