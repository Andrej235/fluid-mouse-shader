var F2D = F2D === undefined ? {} : F2D;

F2D.Divergence = class extends F2D.SlabopBase {
  constructor(fs, grid) {
    var uniforms = {
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

    super(fs, uniforms, grid);

    this.grid = grid;
    this.uniforms = uniforms;
  }
  compute(renderer, velocity, divergence) {
    this.uniforms.velocity.value = velocity.read;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.gridScale.value = this.grid.scale;

    renderer.render(this.scene, this.camera, divergence.write, false);
    divergence.swap();
  }
};

F2D.Divergence.prototype = Object.create(F2D.SlabopBase.prototype);
