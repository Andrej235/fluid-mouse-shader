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
      read: { type: "t" },
      gridSize: { type: "v2" },
      color: { type: "v3" },
      point: { type: "v2" },
      radius: { type: "f" },
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
