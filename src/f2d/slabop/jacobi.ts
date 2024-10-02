import { WebGLRenderer } from "three";
import { Grid } from "../F2D";
import Slab from "../slab";
import { Boundary } from "./boundary";
import SlabopBase from "./slabopbase";

export default class Jacobi extends SlabopBase {
  grid: Grid;
  uniforms: any;
  iterations: number;
  alpha: number;
  beta: number;

  constructor(
    fragmentShader: string,
    grid: Grid,
    iterations?: number,
    alpha?: number,
    beta?: number
  ) {
    const uniforms = {
      x: {
        type: "t",
      },
      b: {
        type: "t",
      },
      gridSize: {
        type: "v2",
      },
      alpha: {
        type: "f",
      },
      beta: {
        type: "f",
      },
    };

    super(fragmentShader, uniforms, grid);

    this.grid = grid;
    this.iterations = iterations === undefined ? 50 : iterations;
    this.alpha = alpha === undefined ? -1 : alpha;
    this.beta = beta === undefined ? 4 : beta;
    this.uniforms = uniforms;
  }

  compute(
    renderer: WebGLRenderer,
    x: Slab,
    b: Slab,
    output: Slab,
    boundary: Boundary,
    scale: number
  ) {
    for (var i = 0; i < this.iterations; i++) {
      this.step(renderer, x, b, output);
      boundary.compute(renderer, output, scale);
    }
  }

  step(renderer: WebGLRenderer, x: Slab, b: Slab, output: Slab) {
    this.uniforms.x.value = x.read;
    this.uniforms.b.value = b.read;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.alpha.value = this.alpha;
    this.uniforms.beta.value = this.beta;

    renderer.render(this.scene, this.camera);
    output.swap();
  }
}
