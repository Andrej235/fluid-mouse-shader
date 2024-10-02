import { Camera, Scene, WebGLRenderer, WebGLRenderTarget } from "three";

export default function renderScene(
  renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera,
  target: WebGLRenderTarget
) {
  renderer.setRenderTarget(target);
  renderer.render(scene, camera);
  renderer.setRenderTarget(null); // Reset to default render target
}
