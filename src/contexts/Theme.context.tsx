import "../theme/global.css";
import { PropsWithChildren, createContext, useState } from "react";
import palette from "../theme/palette";

interface ThemeState {
  background: string;
  paper: string;
  text: string;
  outline: string;
  primary: {
    main: string;
    contrastText: string;
  };
  secondary: {
    main: string;
    contrastText: string;
  };
}

interface ThemeMethod {
  onChangeTheme: () => void;
}

const initialState: ThemeState & ThemeMethod = {
  ...palette.light,
  onChangeTheme: () => {},
};

const ThemeContext = createContext(initialState);

const ThemeProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [theme, setTheme] = useState<ThemeState>(palette.light);

  const onChangeTheme = () => {};
  return (
    <ThemeContext.Provider
      value={{
        ...theme,
        onChangeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
