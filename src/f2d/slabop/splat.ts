import { Grid, Uniforms } from "../F2D";
import renderScene from "../RenderFunctions";
import Slab from "../slab";
import SlabopBase from "./slabopbase";
import * as THREE from "three";

export default class Splat extends SlabopBase {
  uniforms: Uniforms;
  grid: Grid;
  radius: number;

  constructor(fs: string, grid: Grid, radius?: number) {
    const uniforms = {
      read: { value: null },
      gridSize: { value: new THREE.Vector2() },
      color: { value: new THREE.Vector3() },
      point: { value: new THREE.Vector2() },
      radius: { value: 1.0 },
    };

    super(fs, uniforms, grid);
    this.grid = grid;
    this.radius = radius === undefined ? 0.01 : radius;
    this.uniforms = uniforms;
  }

  compute(
    renderer: THREE.WebGLRenderer,
    input: Slab,
    color: THREE.Vector3,
    point: THREE.Vector2,
    output: Slab
  ) {
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.read.value = input.read;
    this.uniforms.color.value = color;
    this.uniforms.point.value = point;
    this.uniforms.radius.value = this.radius;

    renderer.setRenderTarget(output.write);
    renderScene(renderer, this.scene, this.camera, output.write);
    output.swap();
  }
}
