export const setTheme = jest.fn();
export const useTheme = jest.fn(() => ({
  resolvedTheme: "light",
  setTheme,
}));

