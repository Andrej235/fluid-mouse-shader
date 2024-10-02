var F2D = F2D === undefined ? {} : F2D;

F2D.Slab = class {
  constructor(width, height, options) {
    this.read = new THREE.WebGLRenderTarget(width, height, options);
    this.write = this.read.clone();
  }
  swap() {
    var tmp = this.read;
    this.read = this.write;
    this.write = tmp;
  }
  static make(width, height) {
    return new F2D.Slab(width, height, options);
  }
};

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
