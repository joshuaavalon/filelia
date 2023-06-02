export default function arraysNotEmpty(...arrays: string[][]): boolean {
  return arrays.some(arr => arr.length > 0);
}
