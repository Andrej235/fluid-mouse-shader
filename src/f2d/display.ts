import * as THREE from "three";

export default class Display {
  vertexShader: string;
  fragmentShader: string;
  bias: THREE.Vector3;
  scale: THREE.Vector3;
  uniforms: any; // TODO: type this
  material: THREE.ShaderMaterial;
  camera: THREE.OrthographicCamera;
  scene: THREE.Scene;

  constructor(
    vertexShader: string,
    fragmentShader: string,
    bias?: THREE.Vector3,
    scale?: THREE.Vector3
  ) {
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    this.bias = bias === undefined ? new THREE.Vector3(0, 0, 0) : bias;
    this.scale = scale === undefined ? new THREE.Vector3(1, 1, 1) : scale;

    this.uniforms = {
      read: {
        type: "t",
      },
      bias: {
        type: "v3",
      },
      scale: {
        type: "v3",
      },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NoBlending,
    });

    var quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new THREE.Scene();
    this.scene.add(quad);
  }

  // set bias and scale for including range of negative values
  scaleNegative() {
    var v = 0.5;
    this.bias.set(v, v, v);
    this.scale.set(v, v, v);
  }

  //TODO: Type this
  render(renderer: THREE.WebGLRenderer, read: any) {
    this.uniforms.read.value = read;
    this.uniforms.bias.value = this.bias;
    this.uniforms.scale.value = this.scale;
    renderer.render(this.scene, this.camera);
  }
}
