// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotNumber = (argument: any): boolean => isNaN(Number(argument));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isArrayOfNumbers(value: any) {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "number")
  );
}
