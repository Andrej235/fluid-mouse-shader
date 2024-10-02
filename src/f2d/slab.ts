import * as THREE from "three";

export default class Slab {
  read: THREE.WebGLRenderTarget<THREE.Texture>;
  write: THREE.WebGLRenderTarget<THREE.Texture>;

  constructor(
    width: number,
    height: number,
    options: THREE.RenderTargetOptions
  ) {
    this.read = new THREE.WebGLRenderTarget(width, height, options);
    this.write = this.read.clone();
  }

  swap() {
    var tmp = this.read;
    this.read = this.write;
    this.write = tmp;
  }

  static make(width: number, height: number) {
    var options = {
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      magFilter: THREE.NearestFilter,
      minFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      depthBuffer: false,
      stencilBuffer: false,
      generateMipmaps: false,
      shareDepthFrom: null,
    };

    return new Slab(width, height, options);
  }
}
