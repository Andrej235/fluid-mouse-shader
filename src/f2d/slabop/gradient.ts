import { Vector2 } from "three";
import { Grid } from "../../types/Grid";
import { Uniforms } from "../../types/Uniforms";
import Slab from "../slab";
import SlabopBase from "./slabopbase";

class Gradient extends SlabopBase {
  grid: Grid;
  uniforms: Uniforms;

  constructor(fragmentShader: string, grid: Grid) {
    const uniforms = {
      p: { value: null },
      w: { value: null },
      gridSize: { value: new Vector2() },
      gridScale: { value: 1.0 },
    };

    super(fragmentShader, uniforms, grid);

    this.grid = grid;
    this.uniforms = uniforms;
  }

  compute(renderer: THREE.WebGLRenderer, p: Slab, w: Slab, output: Slab) {
    this.uniforms.p.value = p.read;
    this.uniforms.w.value = w.read;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.gridScale.value = this.grid.scale;

    renderer.setRenderTarget(output.write);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
    output.swap();
  }
}

export default Gradient;
