import { Grid } from "../../types/Grid";
import { Uniforms } from "../../types/Uniforms";
import Slab from "../slab";
import SlabopBase from "./slabopbase";

class Vorticity extends SlabopBase {
  grid: Grid;
  uniforms: Uniforms;

  constructor(fragmentShader: string, grid: Grid) {
    const uniforms = {
      velocity: { type: "t" },
      gridSize: { type: "v2" },
      gridScale: { type: "f" },
    };

    super(fragmentShader, uniforms, grid);

    this.grid = grid;
    this.uniforms = uniforms;
  }

  compute(renderer: THREE.WebGLRenderer, velocity: Slab, output: Slab) {
    this.uniforms.velocity.value = velocity.read;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.gridScale.value = this.grid.scale;

    renderer.setRenderTarget(output.write);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
    output.swap();
  }
}

export default Vorticity;
