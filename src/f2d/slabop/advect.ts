import { Grid, Time, Uniforms } from "../F2D";
import renderScene from "../RenderFunctions";
import Slab from "../slab";
import SlabopBase from "./slabopbase";
import * as THREE from "three";

export default class Advect extends SlabopBase {
  grid: Grid;
  time: Time;
  dissipation: number;
  uniforms: Uniforms;

  constructor(
    fragmentShader: string,
    grid: Grid,
    time: Time,
    dissipation?: number
  ) {
    const uniforms = {
      velocity: { value: null },
      advected: { value: null },
      gridSize: { value: new THREE.Vector2() },
      gridScale: { value: 1.0 },
      timestep: { value: 1.0 },
      dissipation: { value: 1.0 },
    };

    super(fragmentShader, uniforms, grid);

    this.grid = grid;
    this.time = time;
    this.dissipation = dissipation === undefined ? 0.998 : dissipation;
    this.uniforms = uniforms;
  }

  compute(
    renderer: THREE.WebGLRenderer,
    velocity: Slab,
    advected: Slab,
    output: Slab
  ) {
    this.uniforms.velocity.value = velocity.read;
    this.uniforms.advected.value = advected.read;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.gridScale.value = this.grid.scale;
    this.uniforms.timestep.value = this.time.step;
    this.uniforms.dissipation.value = this.dissipation;

    renderScene(renderer, this.scene, this.camera, output.write);
    output.swap();
  }
}
