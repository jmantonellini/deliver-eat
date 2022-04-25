export const distanceInMeters = (pointA, pointB) => {
  console.log("A", pointA);
  console.log("B", pointB);
  return window.google.maps.geometry.spherical.computeDistanceBetween(
    pointA,
    pointB
  );
};
