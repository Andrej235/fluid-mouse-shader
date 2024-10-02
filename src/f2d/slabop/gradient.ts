import { Grid } from "../F2D";
import SlabopBase from "./slabopbase";

// TODO: type this
export default class Gradient extends SlabopBase {
  grid: Grid;
  uniforms: any;

  constructor(fragmentShader: string, grid: Grid) {
    const uniforms = {
      p: {
        type: "t",
      },
      w: {
        type: "t",
      },
      gridSize: {
        type: "v2",
      },
      gridScale: {
        type: "f",
      },
    };

    super(fragmentShader, uniforms, grid);
    this.uniforms = uniforms;
    this.grid = grid;
  }

  compute(renderer: any, p: any, w: any, output: any) {
    this.uniforms.p.value = p.read;
    this.uniforms.w.value = w.read;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.gridScale.value = this.grid.scale;

    renderer.render(this.scene, this.camera, output.write, false);
    output.swap();
  }
}
