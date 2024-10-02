var F2D = F2D === undefined ? {} : F2D;

F2D.Splat = class {
  constructor(fs, grid, radius) {
    this.grid = grid;
    this.radius = radius === undefined ? 0.01 : radius;

    this.uniforms = {
      read: {
        type: "t",
      },
      gridSize: {
        type: "v2",
      },
      color: {
        type: "v3",
      },
      point: {
        type: "v2",
      },
      radius: {
        type: "f",
      },
    };

    F2D.SlabopBase.call(this, fs, this.uniforms, grid);
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
};

F2D.Splat.prototype = Object.create(F2D.SlabopBase.prototype);
