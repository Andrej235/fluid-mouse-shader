var F2D = F2D === undefined ? {} : F2D;

class Jacobi extends F2D.SlabopBase {
  constructor(fs, grid, iterations = 50, alpha = -1, beta = 4) {
    const uniforms = {
      x: { type: "t" },
      b: { type: "t" },
      gridSize: { type: "v2" },
      alpha: { type: "f" },
      beta: { type: "f" },
    };

    super(fs, uniforms, grid);

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

F2D.Jacobi = Jacobi;
