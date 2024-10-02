import * as THREE from "three";
import { Grid } from "./F2D";

export default class Mouse {
  grid: Grid;
  left: boolean;
  right: boolean;
  position: THREE.Vector2;
  motions: {
    left: boolean;
    right: boolean;
    drag: {
      x: number;
      y: number;
    };
    position: {
      x: number;
      y: number;
    };
  }[];

  constructor(grid: Grid) {
    this.grid = grid;

    this.left = false;
    this.right = false;
    this.position = new THREE.Vector2();
    this.motions = [];

    document.addEventListener(
      "mousedown",
      (event) => {
        this.position.set(event.clientX, event.clientY);
        this.left = event.button === 0 ? true : this.left;
        this.right = event.button === 2 ? true : this.right;
      },
      false
    );

    document.addEventListener(
      "mouseup",
      (event) => {
        event.preventDefault();
        this.left = event.button === 0 ? false : this.left;
        this.right = event.button === 2 ? false : this.right;
      },
      false
    );

    document.addEventListener(
      "mousemove",
      (event) => {
        event.preventDefault();
        var r = this.grid.scale;

        var x = event.clientX;
        var y = event.clientY;

        if (this.left || this.right) {
          var dx = x - this.position.x;
          var dy = y - this.position.y;

          var drag = {
            x: Math.min(Math.max(dx, -r), r),
            y: Math.min(Math.max(dy, -r), r),
          };

          var position = {
            x: x,
            y: y,
          };

          this.motions.push({
            left: this.left,
            right: this.right,
            drag: drag,
            position: position,
          });
        }
      },
      false
    );

    document.addEventListener(
      "contextmenu",
      (event) => void event.preventDefault(),
      false
    );
  }
}
