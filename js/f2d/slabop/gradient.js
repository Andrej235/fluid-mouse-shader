var F2D = F2D === undefined ? {} : F2D;

F2D.Gradient = class {
  constructor(fs, grid) {
    this.grid = grid;

    this.uniforms = {
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

    F2D.SlabopBase.call(this, fs, this.uniforms, grid);
  }
  compute(renderer, p, w, output) {
    this.uniforms.p.value = p.read;
    this.uniforms.w.value = w.read;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.gridScale.value = this.grid.scale;

    renderer.render(this.scene, this.camera, output.write, false);
    output.swap();
  }
};

F2D.Gradient.prototype = Object.create(F2D.SlabopBase.prototype);
