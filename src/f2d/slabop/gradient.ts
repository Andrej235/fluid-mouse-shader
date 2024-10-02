import { Vector2, WebGLRenderer } from "three";
import { Grid, Uniforms } from "../F2D";
import SlabopBase from "./slabopbase";
import Slab from "../slab";
import renderScene from "../RenderFunctions";

export default class Gradient extends SlabopBase {
  grid: Grid;
  uniforms: Uniforms;

  constructor(fragmentShader: string, grid: Grid) {
    const uniforms = {
      p: { value: null },
      w: { value: null },
      gridSize: { value: new Vector2() },
      gridScale: { value: 1.0 },
    };

    super(fragmentShader, uniforms, grid);
    this.uniforms = uniforms;
    this.grid = grid;
  }

  compute(renderer: WebGLRenderer, p: Slab, w: Slab, output: Slab) {
    this.uniforms.p.value = p.read;
    this.uniforms.w.value = w.read;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.gridScale.value = this.grid.scale;

    renderScene(renderer, this.scene, this.camera, output.write);
    output.swap();
  }
}
