import { Vector2, WebGLRenderer } from "three";
import { Grid, Uniforms } from "../F2D";
import Slab from "../slab";
import { Boundary } from "./boundary";
import SlabopBase from "./slabopbase";
import renderScene from "../RenderFunctions";

export default class Jacobi extends SlabopBase {
  grid: Grid;
  uniforms: Uniforms;
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
      x: { value: null },
      b: { value: null },
      gridSize: { value: new Vector2() },
      alpha: { value: 1.0 },
      beta: { value: 1.0 },
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
      boundary.compute(renderer, output, scale, output);
    }
  }

  step(renderer: WebGLRenderer, x: Slab, b: Slab, output: Slab) {
    this.uniforms.x.value = x.read;
    this.uniforms.b.value = b.read;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.alpha.value = this.alpha;
    this.uniforms.beta.value = this.beta;

    renderScene(renderer, this.scene, this.camera, output.write);
    output.swap();
  }
}
