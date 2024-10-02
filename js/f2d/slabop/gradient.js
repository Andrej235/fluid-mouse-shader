var F2D = F2D === undefined ? {} : F2D;

class Gradient extends F2D.SlabopBase {
  constructor(fs, grid) {
    const uniforms = {
      p: { type: "t" },
      w: { type: "t" },
      gridSize: { type: "v2" },
      gridScale: { type: "f" },
    };

    super(fs, uniforms, grid);

    this.grid = grid;
    this.uniforms = uniforms;
  }

  compute(renderer, p, w, output) {
    this.uniforms.p.value = p.read;
    this.uniforms.w.value = w.read;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.gridScale.value = this.grid.scale;

    renderer.render(this.scene, this.camera, output.write, false);
    output.swap();
  }
}

F2D.Gradient = Gradient;
