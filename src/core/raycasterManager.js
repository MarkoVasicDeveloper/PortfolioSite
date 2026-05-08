import * as THREE from "three";
import gsap from "gsap";
import { ValidationError } from "./errors/error";

/**
 * Handles mouse/pointer intersection with 3D objects (Raycasting).
 * Responsible for hover effects and click actions.
 */
export class RaycasterManager {
  /**
   * @param {THREE.Camera} camera - The camera used for ray projection.
   * @param {THREE.Scene} scene - The scene containing interactive objects.
   * @param {Object} soundManager - The audio service used to play interaction sounds.
   */
  constructor(camera, scene, soundManager) {
    if (!camera || !scene || !soundManager) {
      throw new ValidationError(
        "RaycasterManager",
        "Missing essential dependencies (camera, scene, or soundManager).",
      );
    }

    /** @type {THREE.Camera} */
    this.camera = camera;
    /** @type {THREE.Scene} */
    this.scene = scene;
    /** @type {Object} */
    this.soundManager = soundManager;

    /** @type {THREE.Raycaster} */
    this.raycaster = new THREE.Raycaster();
    /** @type {THREE.Vector2} */
    this.pointer = new THREE.Vector2();
    /** @type {THREE.Object3D|null} */
    this.hoveredObject = null;

    this._onPointerMove = this._onPointerMove.bind(this);
    this._onClick = this._onClick.bind(this);

    this._init();
  }

  /**
   * Initializes global event listeners.
   * @private
   */
  _init() {
    window.addEventListener("pointermove", this._onPointerMove);
    window.addEventListener("click", this._onClick);
  }

  /**
   * Updates pointer coordinates and performs raycasting to detect intersections.
   * @param {PointerEvent} event - The native pointer event.
   * @private
   */
  _onPointerMove(event) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (!this.camera) {
      throw new ValidationError(
        "RaycasterManager",
        "Camera reference lost during pointer move.",
      );
    }

    this.raycaster.setFromCamera(this.pointer, this.camera);

    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true,
    );

    if (intersects.length > 0) {
      const firstObject = intersects[0].object;

      if (this._isInteractive(firstObject)) {
        if (this.hoveredObject !== firstObject) {
          this._setHoverState(firstObject, true);
          this.hoveredObject = firstObject;
        }
        return;
      }
    }

    if (this.hoveredObject) {
      this._setHoverState(this.hoveredObject, false);
      this.hoveredObject = null;
    }
  }

  /**
   * Checks if an object has interactive properties (link or hover uniforms).
   * @param {THREE.Object3D} obj - The object to check.
   * @returns {boolean}
   * @private
   */
  _isInteractive(obj) {
    return (
      obj.userData.link ||
      (obj.material && obj.material.uniforms && obj.material.uniforms.hover)
    );
  }

  /**
   * Toggles the hover state of an object, updating the cursor and triggering animations.
   * @param {THREE.Object3D} obj - The target 3D object.
   * @param {boolean} isHovered - The target hover state.
   * @private
   */
  _setHoverState(obj, isHovered) {
    document.body.style.cursor = isHovered ? "pointer" : "default";

    if (obj.material?.uniforms?.hover) {
      gsap.to(obj.material.uniforms.hover, {
        value: isHovered ? 1.0 : 0,
        duration: 1,
        overwrite: "auto",
      });
    }
  }

  /**
   * Handles click interaction, playing sound and opening links if applicable.
   * @private
   */
  _onClick() {
    if (this.hoveredObject && this.hoveredObject.userData.link) {
      this.soundManager.play("click");
      window.open(this.hoveredObject.userData.link, "_blank");
    }
  }

  /**
   * Removes event listeners and clears references to prevent memory leaks.
   */
  dispose() {
    window.removeEventListener("pointermove", this._onPointerMove);
    window.removeEventListener("click", this._onClick);
  }
}
