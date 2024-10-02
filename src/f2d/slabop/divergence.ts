import { Vector2, WebGLRenderer } from "three";
import { Grid, Uniforms } from "../F2D";
import SlabopBase from "./slabopbase";
import Slab from "../slab";
import renderScene from "../RenderFunctions";

export default class Divergence extends SlabopBase {
  grid: Grid;
  uniforms: Uniforms;

  constructor(fragmentShader: string, grid: Grid) {
    const uniforms = {
      velocity: { value: null },
      gridSize: { value: new Vector2() },
      gridScale: { value: 1.0 },
    };

    super(fragmentShader, uniforms, grid);
    this.uniforms = uniforms;
    this.grid = grid;
  }

  compute(renderer: WebGLRenderer, velocity: Slab, divergence: Slab) {
    this.uniforms.velocity.value = velocity.read;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.gridScale.value = this.grid.scale;

    renderScene(renderer, this.scene, this.camera, divergence.write);
    divergence.swap();
  }
}
