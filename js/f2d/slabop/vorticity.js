var F2D = F2D === undefined ? {} : F2D;

F2D.Vorticity = class {
  constructor(fs, grid) {
    this.grid = grid;

    this.uniforms = {
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

    F2D.SlabopBase.call(this, fs, this.uniforms, grid);
  }
  compute(renderer, velocity, output) {
    this.uniforms.velocity.value = velocity.read;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.gridScale.value = this.grid.scale;

    renderer.render(this.scene, this.camera, output.write, false);
    output.swap();
  }
};

F2D.Vorticity.prototype = Object.create(F2D.SlabopBase.prototype);
