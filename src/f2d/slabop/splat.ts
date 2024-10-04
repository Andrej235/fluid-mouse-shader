import { Vector2, Vector3 } from "three";
import { Grid } from "../../types/Grid";
import { Uniforms } from "../../types/Uniforms";
import Slab from "../slab";
import SlabopBase from "./slabopbase";

class Splat extends SlabopBase {
  grid: Grid;
  radius: number;
  uniforms: Uniforms;

  constructor(fragmentShader: string, grid: Grid, radius: number = 0.01) {
    const uniforms = {
      read: { value: null },
      gridSize: { value: new Vector2() },
      color: { value: new Vector3() },
      point: { value: new Vector2() },
      radius: { value: 1.0 },
    };

    super(fragmentShader, uniforms, grid);

    this.grid = grid;
    this.radius = radius;
    this.uniforms = uniforms;
  }

  compute(
    renderer: THREE.WebGLRenderer,
    input: Slab,
    color: THREE.Vector3,
    point: THREE.Vector2,
    output: Slab
  ) {
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.read.value = input.read;
    this.uniforms.color.value = color;
    this.uniforms.point.value = point;
    this.uniforms.radius.value = this.radius;

    renderer.setRenderTarget(output.write);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
    output.swap();
  }
}

export default Splat;
