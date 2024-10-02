import SlabopBase from "./slabopbase";

class Advect extends SlabopBase {
  constructor(fs, grid, time, dissipation = 0.998) {
    const uniforms = {
      velocity: { type: "t" },
      advected: { type: "t" },
      gridSize: { type: "v2" },
      gridScale: { type: "f" },
      timestep: { type: "f" },
      dissipation: { type: "f" },
    };

    super(fs, uniforms, grid);

    this.grid = grid;
    this.time = time;
    this.dissipation = dissipation;
    this.uniforms = uniforms;
  }

  compute(renderer, velocity, advected, output) {
    this.uniforms.velocity.value = velocity.read;
    this.uniforms.advected.value = advected.read;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.gridScale.value = this.grid.scale;
    this.uniforms.timestep.value = this.time.step;
    this.uniforms.dissipation.value = this.dissipation;

    renderer.render(this.scene, this.camera, output.write, false);
    output.swap();
  }
}

export default Advect;
