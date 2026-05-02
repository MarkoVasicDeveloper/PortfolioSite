import * as THREE from "three";

/**
 * Orchestrates the 3D scene, camera, and renderer.
 * Acts as the bridge between the core logic and the Three.js rendering engine.
 */
export class SceneManager {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    /** @type {HTMLCanvasElement} */
    this.canvas = canvas;

    /** @type {THREE.Scene} */
    this.scene = new THREE.Scene();

    /** @type {THREE.Scene} */
    this.bgScene = new THREE.Scene();

    /** @type {THREE.Camera} */
    this.bgCamera = new THREE.Camera();

    this._setupRenderer();
    this._setupCamera();
    this._setupEvents();
  }

  /**
   * Configures the WebGL renderer with professional defaults.
   * @private
   */
  _setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.renderer.autoClear = false;
    this.renderer.setClearColor(new THREE.Color("#111111"));
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  }

  /**
   * Initializes the perspective camera.
   * @private
   */
  _setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      30,
    );
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.camera.position.set(0, 3, 0);
  }

  /**
   * Handles window resize events to keep the aspect ratio consistent.
   * @private
   */
  _setupEvents() {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  /**
   * Adds objects to the scene.
   * @param {THREE.Object3D} object
   */
  add(object) {
    this.scene.add(object);
  }

  /**
   * Removes objects from the scene.
   * @param {THREE.Object3D} object
   */
  remove(object) {
    this.scene.remove(object);
  }

  /**
   * Adds objects to the background scene.
   * @param {THREE.Object3D} object
   */
  addBackground(object) {
    this.bgScene.add(object);
  }

  /**
   * Removes objects from the background scene.
   * @param {THREE.Object3D} object
   */
  removeBackground(object) {
    this.bgScene.remove(object);
  }

  /**
   * The main animation loop.
   * @param {Function} updateCallback - Function to execute every frame before rendering.
   */
  render(updateCallback) {
    const tick = (time) => {
      const elapsedTime = time * 0.001;

      if (updateCallback) updateCallback(elapsedTime);

      this.renderer.clear();
      this.renderer.render(this.bgScene, this.bgCamera);

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(tick);
    };

    tick();
  }
}
