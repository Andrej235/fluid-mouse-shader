import * as THREE from "three";
import SlabopBase from "./slabopbase";
import { Grid } from "../../types/Grid";
import { Time } from "../../types/Time";
import { Uniforms } from "../../types/Uniforms";
import Slab from "../slab";

class VorticityConfinement extends SlabopBase {
  grid: Grid;
  time: Time;
  epsilon: number;
  curl: number;
  uniforms: Uniforms;

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

  compute(
    renderer: THREE.WebGLRenderer,
    velocity: Slab,
    vorticity: Slab,
    output: Slab
  ) {
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

    renderer.setRenderTarget(output.write);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
    output.swap();
  }
}

export default VorticityConfinement;
