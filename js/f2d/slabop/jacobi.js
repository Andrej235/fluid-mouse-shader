var F2D = F2D === undefined ? {} : F2D;

F2D.Jacobi = class extends F2D.SlabopBase {
  constructor(fs, grid, iterations, alpha, beta) {
    var uniforms = {
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

    super(fs, uniforms, grid);
    this.grid = grid;
    this.iterations = iterations === undefined ? 50 : iterations;
    this.alpha = alpha === undefined ? -1 : alpha;
    this.beta = beta === undefined ? 4 : beta;

    this.uniforms = uniforms;
  }
  compute(renderer, x, b, output, boundary, scale) {
    for (var i = 0; i < this.iterations; i++) {
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
};

F2D.Jacobi.prototype = Object.create(F2D.SlabopBase.prototype);
