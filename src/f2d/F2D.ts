import { IUniform, Vector2 } from "three";
import Advect from "./slabop/advect";
import Jacobi from "./slabop/jacobi";
import Divergence from "./slabop/divergence";
import Gradient from "./slabop/gradient";
import Splat from "./slabop/splat";
import Vorticity from "./slabop/vorticity";
import VorticityConfinement from "./slabop/vorticityconfinement";
import { Boundary } from "./slabop/boundary";
import Slab from "./slab";

export type Uniforms = {
  [uniform: string]: IUniform<any>;
};

export type Grid = {
  size: Vector2;
  scale: number;
  applyBoundaries: boolean;
};

export type Time = {
  step: number;
};

export type Slabs = {
  velocity: Slab;
  density: Slab;
  velocityDivergence: Slab;
  velocityVorticity: Slab;
  pressure: Slab;
};

export type Slabop = {
  advect: Advect;
  diffuse: Jacobi;
  divergence: Divergence;
  poissonPressureEq: Jacobi;
  gradient: Gradient;
  splat: Splat;
  vorticity: Vorticity;
  vorticityConfinement: VorticityConfinement;
  boundary: Boundary;
};
