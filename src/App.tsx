import { useState, useMemo, createContext, useContext } from "react";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    CssBaseline,
} from "@mui/material";
import { Brightness7, Brightness4 } from "@mui/icons-material";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import CountryList from "./pages/CountryList";
import CountryDetail from "./pages/CountryDetail";

import NoMatch from "./components/NoMatch";

import "./App.css";
import { getDesignTokens } from "./theme";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const MyApp = () => {
    const colorMode = useContext(ColorModeContext);
    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" color="inherit">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Where in the world?
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            // bgcolor: "background.default",
                            color: "text.primary",
                            borderRadius: 1,
                            p: 1,
                        }}
                    >
                        <IconButton
                            sx={{ ml: 1 }}
                            onClick={colorMode.toggleColorMode}
                            color="inherit"
                        >
                            {theme.palette.mode === "dark" ? (
                                <Brightness7 />
                            ) : (
                                <Brightness4 />
                            )}
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                    padding: "30px 120px 0",
                    [theme.breakpoints.down("sm")]: {
                        padding: "30px 30px 0",
                    },
                }}
            >
                <Router>
                    <Switch>
                        <Route exact component={CountryList} path="/" />
                        <Route
                            exact
                            component={CountryDetail}
                            path="/country-detail/:code"
                        />
                        <Route path="*" component={NoMatch} />
                    </Switch>
                </Router>
            </Box>
        </Box>
    );
};

function App() {
    const [mode, setMode] = useState<"light" | "dark">("light");
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
        }),
        []
    );

    const theme = useMemo(
        () =>
            // @ts-ignore
            createTheme(getDesignTokens(mode)),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <MyApp />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
