const PRIMARY = {
  main: "#42A5F5",
  contrastText: "#040409",
};

const SECONDARY = {
  main: "#DA4336",
  contrastText: "#FDF8F7",
};

const COMMON = {
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
};

const palette = {
  light: {
    background: "#111010",
    paper: "#2F2F2F",
    text: "#DDDDDD",
    outline: "#8B8B8B",
    ...COMMON,
  },
};

export default palette;
