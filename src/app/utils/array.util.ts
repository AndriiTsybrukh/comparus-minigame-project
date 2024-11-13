export namespace ArrayUtil {
  export const generateNumberArray: (count: number) => number[] = (
    count: number,
  ) => Array.from(Array(count).keys());

  export const getRandomValueFromArray: <T>(array: T[]) => T = <T>(
    array: T[],
  ) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };
}
