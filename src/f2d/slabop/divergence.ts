import { Grid } from "../F2D";
import SlabopBase from "./slabopbase";

// TODO: type this
export default class Divergence extends SlabopBase {
  grid: Grid;
  uniforms: any;

  constructor(fragmentShader: string, grid: Grid) {
    const uniforms = {
      velocity: {
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

  //TODO: type this
  compute(renderer: any, velocity: any, divergence: any) {
    this.uniforms.velocity.value = velocity.read;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.gridScale.value = this.grid.scale;

    renderer.render(this.scene, this.camera, divergence.write, false);
    divergence.swap();
  }
}
