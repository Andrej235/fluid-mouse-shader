var F2D = F2D === undefined ? {} : F2D;

class SlabopBase {
  constructor(fs, uniforms, grid) {
    const geometry = new THREE.PlaneBufferGeometry(
      (2 * (grid.size.x - 2)) / grid.size.x,
      (2 * (grid.size.y - 2)) / grid.size.y
    );
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: fs,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NoBlending,
    });
    const quad = new THREE.Mesh(geometry, material);

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new THREE.Scene();
    this.scene.add(quad);
  }
}

F2D.SlabopBase = SlabopBase;
