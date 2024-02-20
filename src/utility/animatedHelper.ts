import Animated, {
  interpolate,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export const clamp = (value: number, min: number, max: number) => {
  'worklets';
  return Math.max(Math.min(value, max), min);
};

export const toDeg = (rad: number) => {
  'worklet';
  return rad * (180 / Math.PI);
};
export const toRad = (deg: number) => {
  'worklet';
  return deg * (Math.PI / 180);
};
export const translateZ = () => {};
// export const translateZ = (perspective: Val, x: Val) => divide(perspective, sub(perspective, x));

export const rNo = (no: number) => {
  'worklet';
  return no - no * 2;
};

export const rNoSharedValue = (no: Animated.SharedValue<number>) => {
  'worklet';
  return no.value - no.value * 2;
};

export const loopAnimated = (
  value: Animated.SharedValue<number>,
  toValue?: number,
  duration?: number,
  noOfLoop?: number,
  reverse?: boolean,
) => {
  'worklet';
  value.value = withRepeat(
    withTiming(toValue as number, {duration}),
    noOfLoop,
    reverse,
  );
};

// mix is used for constant interpolate
export const mix = (
  value: Animated.SharedValue<number>,
  from: number,
  to: number,
) => {
  'worklet';
  return interpolate(value.value, [0, 1], [from, to]);
};

export const snapPoint = (
  value: number,
  velocity: number,
  points: number[],
) => {
  'worklet';
  const point = value + 0.2 * velocity;
  const deltas = points.map(p => Math.abs(point - p));
  const minDelta = Math.min.apply(null, deltas);
  return points.filter(p => Math.abs(point - p) === minDelta)[0];
};

interface Vector {
  x: number;
  y: number;
}

interface PolarPoint {
  theta: number;
  radius: number;
}

/**
 * @worklet
 */
export const canvas2Cartesian = (v: Vector, center: Vector) => {
  'worklet';
  return {
    x: v.x - center.x,
    y: -1 * (v.y - center.y),
  };
};

/**
 * @worklet
 */
export const cartesian2Canvas = (v: Vector, center: Vector) => {
  'worklet';

  return {
    x: v.x + center.x,
    y: -1 * v.y + center.y,
  };
};

/**
 * @worklet
 */
export const cartesian2Polar = (v: Vector) => {
  'worklet';

  return {
    theta: Math.atan2(v.y, v.x),
    radius: Math.sqrt(v.x ** 2 + v.y ** 2),
  };
};

/**
 * @worklet
 */
export const polar2Cartesian = (p: PolarPoint) => {
  'worklet';

  return {
    x: p.radius * Math.cos(p.theta),
    y: p.radius * Math.sin(p.theta),
  };
};

/**
 * @worklet
 */
export const polar2Canvas = (p: PolarPoint, center: Vector) => {
  'worklet';

  return cartesian2Canvas(polar2Cartesian(p), center);
};

/**
 * @worklet
 */
export const canvas2Polar = (v: Vector, center: Vector) => {
  'worklet';
  return cartesian2Polar(canvas2Cartesian(v, center));
};
