/**
 * Pure JavaScript 4-corner Projective Homography Solver
 * Solves the 8-unknown system mapping a source rectangle to an arbitrary 4-point quadrilateral.
 */

export type Point = [number, number]; // [x, y] in percentage or pixels

export type QuadCorners = [Point, Point, Point, Point]; // [TL, TR, BR, BL]

/**
 * Solves an 8x8 linear system A * x = b using Gaussian elimination with partial pivoting.
 */
function solve8x8(A: number[][], b: number[]): number[] {
  const n = 8;
  const M: number[][] = A.map((row) => [...row]);
  const v: number[] = [...b];

  for (let i = 0; i < n; i++) {
    // Partial pivoting
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) {
        maxRow = k;
      }
    }
    const tempRow = M[i];
    M[i] = M[maxRow];
    M[maxRow] = tempRow;

    const tempV = v[i];
    v[i] = v[maxRow];
    v[maxRow] = tempV;

    if (Math.abs(M[i][i]) < 1e-12) {
      continue;
    }

    for (let k = i + 1; k < n; k++) {
      const c = -M[k][i] / M[i][i];
      for (let j = i; j < n; j++) {
        if (i === j) {
          M[k][j] = 0;
        } else {
          M[k][j] += c * M[i][j];
        }
      }
      v[k] += c * v[i];
    }
  }

  // Back substitution
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) {
      sum += M[i][j] * x[j];
    }
    x[i] = (v[i] - sum) / (M[i][i] || 1);
  }

  return x;
}

/**
 * Computes 3x3 Projective Homography matrix mapping source quad to destination quad.
 */
export function computeHomography(src: QuadCorners, dst: QuadCorners): number[][] {
  const A: number[][] = [];
  const b: number[] = [];

  for (let i = 0; i < 4; i++) {
    const [u, v] = src[i];
    const [x, y] = dst[i];
    A.push([u, v, 1, 0, 0, 0, -u * x, -v * x]);
    b.push(x);
    A.push([0, 0, 0, u, v, 1, -u * y, -v * y]);
    b.push(y);
  }

  const h = solve8x8(A, b);

  return [
    [h[0], h[1], h[2]],
    [h[3], h[4], h[5]],
    [h[6], h[7], 1],
  ];
}

/**
 * Converts a 3x3 Homography matrix mapping unit square [0,1]x[0,1] into a CSS matrix3d() string.
 * Matrix is formatted in column-major order for CSS 3D transforms.
 */
export function homographyToCssMatrix3d(H: number[][]): string {
  // CSS matrix3d(a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, a4, b4, c4, d4)
  // Column 1: H[0][0], H[1][0], 0, H[2][0]
  // Column 2: H[0][1], H[1][1], 0, H[2][1]
  // Column 3: 0,       0,       1, 0
  // Column 4: H[0][2], H[1][2], 0, H[2][2]
  const vals = [
    H[0][0], H[1][0], 0, H[2][0],
    H[0][1], H[1][1], 0, H[2][1],
    0,       0,       1, 0,
    H[0][2], H[1][2], 0, H[2][2],
  ];

  return `matrix3d(${vals.map((v) => v.toFixed(7)).join(", ")})`;
}

/**
 * Convenience helper to compute CSS matrix3d directly from 4 corners (given as % 0..100)
 * mapping from an element's source dimensions [sourceWidth, sourceHeight]
 * to the container's target quadrilateral [containerWidth, containerHeight].
 */
export function getMatrix3dForCorners(
  corners: QuadCorners,
  containerWidth = 100,
  containerHeight = 100,
  sourceWidth: number = containerWidth,
  sourceHeight: number = containerHeight
): string {
  // Source is element local bounds [0..sourceWidth, 0..sourceHeight]
  const src: QuadCorners = [
    [0, 0],
    [sourceWidth, 0],
    [sourceWidth, sourceHeight],
    [0, sourceHeight],
  ];

  // Destination in the container coordinate space (scaled by container dimensions)
  const dst: QuadCorners = corners.map(([px, py]) => [
    (px / 100) * containerWidth,
    (py / 100) * containerHeight,
  ]) as QuadCorners;

  const H = computeHomography(src, dst);
  return homographyToCssMatrix3d(H);
}

/**
 * Returns CSS clip-path polygon using the 4 destination corners.
 */
export function getClipPathPolygon(corners: QuadCorners): string {
  const [tl, tr, br, bl] = corners;
  return `polygon(${tl[0].toFixed(2)}% ${tl[1].toFixed(2)}%, ${tr[0].toFixed(2)}% ${tr[1].toFixed(2)}%, ${br[0].toFixed(2)}% ${br[1].toFixed(2)}%, ${bl[0].toFixed(2)}% ${bl[1].toFixed(2)}%)`;
}
