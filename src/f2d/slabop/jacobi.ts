import { Grid } from "../../types/grid";
import SlabopBase from "./slabopbase";

class Jacobi extends SlabopBase {
  grid: Grid;
  iterations: number;
  alpha: number;
  beta: number;
  uniforms: any;

  constructor(
    fragmentShader: string,
    grid: Grid,
    iterations: number = 50,
    alpha: number = -1,
    beta: number = 4
  ) {
    const uniforms = {
      x: { type: "t" },
      b: { type: "t" },
      gridSize: { type: "v2" },
      alpha: { type: "f" },
      beta: { type: "f" },
    };

    super(fragmentShader, uniforms, grid);

    this.grid = grid;
    this.iterations = iterations;
    this.alpha = alpha;
    this.beta = beta;
    this.uniforms = uniforms;
  }

  compute(renderer, x, b, output, boundary, scale) {
    for (let i = 0; i < this.iterations; i++) {
      this.step(renderer, x, b, output);
      boundary.compute(renderer, output, scale, output);
    }
  }

  step(renderer, x, b, output) {
    this.uniforms.x.value = x.read;
    this.uniforms.b.value = b.read;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.alpha.value = this.alpha;
    this.uniforms.beta.value = this.beta;

    renderer.render(this.scene, this.camera, output.write, false);
    output.swap();
  }
}

export default Jacobi;
