export function stringToHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export function hashToColor(hash: number): {
  color: string;
  backgroundColor: string;
} {
  const hue = Math.abs(hash % 360);
  const color = `hsl(${hue}, 70%, 30%)`;
  const backgroundColor = `hsl(${hue}, 70%, 90%)`;
  return { color, backgroundColor };
}
