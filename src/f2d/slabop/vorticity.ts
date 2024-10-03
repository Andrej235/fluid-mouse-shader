import { Grid } from "../../types/grid";
import SlabopBase from "./slabopbase";

class Vorticity extends SlabopBase {
  grid: Grid;
  uniforms: any;

  constructor(fragmentShader: string, grid: Grid) {
    const uniforms = {
      velocity: { type: "t" },
      gridSize: { type: "v2" },
      gridScale: { type: "f" },
    };

    super(fragmentShader, uniforms, grid);

    this.grid = grid;
    this.uniforms = uniforms;
  }

  compute(renderer, velocity, output) {
    this.uniforms.velocity.value = velocity.read;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.gridScale.value = this.grid.scale;

    renderer.render(this.scene, this.camera, output.write, false);
    output.swap();
  }
}

export default Vorticity;
