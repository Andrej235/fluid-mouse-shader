import * as THREE from "three";
import SlabopBase from "./slabopbase";
import { Grid } from "../../types/grid";
import { Time } from "../../types/Time";

class VorticityConfinement extends SlabopBase {
  grid: Grid;
  time: Time;
  epsilon: number;
  curl: number;
  uniforms: any;

  constructor(
    fragmentShader: string,
    grid: Grid,
    time: Time,
    epsilon?: number,
    curl?: number
  ) {
    const uniforms = {
      velocity: { type: "t" },
      vorticity: { type: "t" },
      gridSize: { type: "v2" },
      gridScale: { type: "f" },
      timestep: { type: "f" },
      epsilon: { type: "f" },
      curl: { type: "v2", value: new THREE.Vector2() },
    };

    super(fragmentShader, uniforms, grid);

    this.grid = grid;
    this.time = time;
    this.epsilon = epsilon === undefined ? 2.4414e-4 : epsilon;
    this.curl = curl === undefined ? 0.3 : curl;
    this.uniforms = uniforms;
  }

  compute(renderer, velocity, vorticity, output) {
    this.uniforms.velocity.value = velocity.read;
    this.uniforms.vorticity.value = vorticity.read;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.gridScale.value = this.grid.scale;
    this.uniforms.timestep.value = this.time.step;
    this.uniforms.epsilon.value = this.epsilon;
    this.uniforms.curl.value.set(
      this.curl * this.grid.scale,
      this.curl * this.grid.scale
    );

    renderer.render(this.scene, this.camera, output.write, false);
    output.swap();
  }
}

export default VorticityConfinement;
