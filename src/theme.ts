import { ThemeOptions } from "@mui/material";

export const getDesignTokens = (mode: "light" | "dark") => {
    return {
        palette: {
            mode,
            ...(mode === "light"
                ? {
                      text: {
                          default: "hsl(200, 15%, 8%)",
                          input: "hsl(209, 23%, 22%)",
                      },
                      background: {
                          default: "hsl(0, 0%, 98%)",
                          paper: "hsl(0, 0%, 98%)",
                      },
                  }
                : {
                      text: {
                          default: "hsl(0, 0%, 100%)",
                          input: "hsl(0, 0%, 98%)",
                      },
                      background: {
                          default: "hsl(207, 26%, 17%)",
                          paper: "hsl(207, 26%, 17%)",
                      },
                  }),
        },
        typography: {
            fontWeightRegular: 300,
            fontWeightMedium: 600,
            fontWeightBold: 800,

            fontFamily: [
                "Nunito Sans",
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(","),
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 375,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
        },
    } as ThemeOptions;
};
