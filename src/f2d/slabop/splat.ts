import { Grid } from "../../types/grid";
import SlabopBase from "./slabopbase";

class Splat extends SlabopBase {
  grid: Grid;
  radius: number;
  uniforms: any;

  constructor(fragmentShader: string, grid: Grid, radius: number = 0.01) {
    const uniforms = {
      read: { type: "t" },
      gridSize: { type: "v2" },
      color: { type: "v3" },
      point: { type: "v2" },
      radius: { type: "f" },
    };

    super(fragmentShader, uniforms, grid);

    this.grid = grid;
    this.radius = radius;
    this.uniforms = uniforms;
  }

  compute(renderer, input, color, point, output) {
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.read.value = input.read;
    this.uniforms.color.value = color;
    this.uniforms.point.value = point;
    this.uniforms.radius.value = this.radius;

    renderer.render(this.scene, this.camera, output.write, false);
    output.swap();
  }
}

export default Splat;
