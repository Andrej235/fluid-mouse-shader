import * as THREE from "three";
import { Grid, Uniforms } from "../F2D";

export default class SlabopBase {
  camera: THREE.OrthographicCamera;
  scene: THREE.Scene;

  constructor(fragmentShader: string, uniforms: Uniforms, grid: Grid) {
    var geometry = new THREE.PlaneGeometry(
      (2 * (grid.size.x - 2)) / grid.size.x,
      (2 * (grid.size.y - 2)) / grid.size.y
    );
    var material = new THREE.ShaderMaterial({
      uniforms,
      fragmentShader: fragmentShader,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NoBlending,
    });

    var quad = new THREE.Mesh(geometry, material);

    this.camera = new THREE.OrthographicCamera();
    this.scene = new THREE.Scene();
    this.scene.add(quad);
  }
}
