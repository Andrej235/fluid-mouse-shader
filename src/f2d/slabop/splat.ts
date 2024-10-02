import { Grid } from "../F2D";
import Slab from "../slab";
import SlabopBase from "./slabopbase";
import * as THREE from "three";

// TODO: type this
export default class Splat extends SlabopBase {
  uniforms: any;
  grid: Grid;
  radius: number;

  constructor(fs: string, grid: Grid, radius?: number) {
    const uniforms = {
      read: {
        type: "t",
      },
      gridSize: {
        type: "v2",
      },
      color: {
        type: "v3",
      },
      point: {
        type: "v2",
      },
      radius: {
        type: "f",
      },
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

    renderer.render(this.scene, this.camera /* , output.write, false */);
    output.swap();
  }
}
