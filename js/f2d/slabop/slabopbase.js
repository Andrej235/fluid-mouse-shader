var F2D = F2D === undefined ? {} : F2D;

F2D.SlabopBase = class {
  constructor(fs, uniforms, grid) {
    var geometry = new THREE.PlaneBufferGeometry(
      (2 * (grid.size.x - 2)) / grid.size.x,
      (2 * (grid.size.y - 2)) / grid.size.y
    );
    var material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: fs,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NoBlending,
    });
    var quad = new THREE.Mesh(geometry, material);

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new THREE.Scene();
    this.scene.add(quad);
  }
};
