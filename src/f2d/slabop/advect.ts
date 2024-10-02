import { Grid, Time } from "../F2D";
import Slab from "../slab";
import SlabopBase from "./slabopbase";
import * as THREE from "three";

export default class Advect extends SlabopBase {
  grid: Grid;
  time: Time;
  dissipation: number;
  uniforms: any;

  constructor(
    fragmentShader: string,
    grid: Grid,
    time: Time,
    dissipation?: number
  ) {
    const uniforms = {
      velocity: {
        type: "t",
      },
      advected: {
        type: "t",
      },
      gridSize: {
        type: "v2",
      },
      gridScale: {
        type: "f",
      },
      timestep: {
        type: "f",
      },
      dissipation: {
        type: "f",
      },
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

    renderer.render(this.scene, this.camera /* output.write, false */);
    output.swap();
  }
}
