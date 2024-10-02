import * as THREE from "three";
import { Grid, Uniforms } from "../F2D";
import Slab from "../slab";
import renderScene from "../RenderFunctions";

export class Boundary {
  grid: Grid;
  uniforms: Uniforms;
  lineL: THREE.Line<
    THREE.BufferGeometry<THREE.NormalBufferAttributes>,
    THREE.ShaderMaterial,
    THREE.Object3DEventMap
  >;
  lineR: THREE.Line<
    THREE.BufferGeometry<THREE.NormalBufferAttributes>,
    THREE.ShaderMaterial,
    THREE.Object3DEventMap
  >;
  lineB: THREE.Line<
    THREE.BufferGeometry<THREE.NormalBufferAttributes>,
    THREE.ShaderMaterial,
    THREE.Object3DEventMap
  >;
  lineT: THREE.Line<
    THREE.BufferGeometry<THREE.NormalBufferAttributes>,
    THREE.ShaderMaterial,
    THREE.Object3DEventMap
  >;
  camera: THREE.OrthographicCamera;
  scene: THREE.Scene;
  gridOffset: THREE.Vector3;
  material: THREE.ShaderMaterial;

  constructor(fragmentShader: string, grid: Grid) {
    this.grid = grid;

    this.uniforms = {
      read: { value: null },
      gridSize: { value: new THREE.Vector2() },
      gridOffset: { value: new THREE.Vector2() },
      scale: { value: 1.0 },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      fragmentShader,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NoBlending,
    });

    var ax = (this.grid.size.x - 2) / this.grid.size.x;
    var ay = (this.grid.size.y - 2) / this.grid.size.y;
    var bx = (this.grid.size.x - 1) / this.grid.size.x;
    var by = (this.grid.size.y - 1) / this.grid.size.y;

    this.lineL = this.createLine([
      [-ax, -ay, 0],
      [-bx, by, 0],
    ]);
    this.lineR = this.createLine([
      [ax, -ay, 0],
      [bx, by, 0],
    ]);
    this.lineB = this.createLine([
      [-ax, -ay, 0],
      [bx, -by, 0],
    ]);
    this.lineT = this.createLine([
      [-ax, ay, 0],
      [bx, by, 0],
    ]);

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new THREE.Scene();

    this.gridOffset = new THREE.Vector3();
  }

  createLine(positions: [x: number, y: number, z: number][]) {
    var vertices = new Float32Array(positions.length * 3);

    for (var i = 0; i < positions.length; i++) {
      vertices[i * 3] = positions[i][0];
      vertices[i * 3 + 1] = positions[i][1];
      vertices[i * 3 + 2] = positions[i][2];
    }

    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    return new THREE.Line(geometry, this.material);
  }

  renderLine(
    renderer: THREE.WebGLRenderer,
    line: THREE.Line,
    offset: [number, number],
    output: Slab
  ) {
    this.scene.add(line);
    this.gridOffset.set(offset[0], offset[1], 0);
    this.uniforms.gridOffset.value = this.gridOffset;
    renderScene(renderer, this.scene, this.camera, output.write);
    this.scene.remove(line);
    // we do not swap output, the next slab operation will fill in the
    // iterior and swap it
  }

  compute(
    renderer: THREE.WebGLRenderer,
    input: Slab,
    scale: number,
    output: Slab
  ) {
    if (!this.grid.applyBoundaries) return;

    this.uniforms.read.value = input.read;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.scale.value = scale;

    this.renderLine(renderer, this.lineL, [1, 0], output);
    this.renderLine(renderer, this.lineR, [-1, 0], output);
    this.renderLine(renderer, this.lineB, [0, 1], output);
    this.renderLine(renderer, this.lineT, [0, -1], output);
  }
}
