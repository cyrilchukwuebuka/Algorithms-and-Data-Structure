export enum Direction {
  East = "EAST",
  West = "WEST",
}

export function sunsetViews(buildings: number[], direction: Direction) {
  // Write your code here.
  const stackBuildings: number[] = [];

  const startIdx = direction === Direction.East ? 0 : buildings.length - 1;
  const step = direction === Direction.East ? 1 : -1;

  let idx = startIdx;
  while (idx >= 0 && idx < buildings.length) {
    const buildingHeight = buildings[idx];

    while (
      stackBuildings.length > 0 &&
      buildings[stackBuildings[stackBuildings.length - 1]] <= buildingHeight
    ) {
      stackBuildings.pop();
    }
    stackBuildings.push(idx);

    idx += step;
  }

  if (Direction.West === direction) stackBuildings.reverse();

  return stackBuildings;
}
