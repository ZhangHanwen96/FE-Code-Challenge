import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Grid,
    Input,
    Select,
    MenuItem,
    FormControl,
    SelectChangeEvent,
    CircularProgress,
    Stack,
    useTheme,
} from "@mui/material";
import { useDebounce, useUpdateEffect } from "react-use";
import CardItem from "./components/Card";
import SearchBar from "./components/SearchBar";

const baseUrl = "https://restcountries.com/v3.1";

const allEndpoint = `${baseUrl}/all?fields=name,population,region,capital,borders,lanuages,flags`;
const regionEndpoint = (region: string) =>
    `${baseUrl}/region/${region.toLowerCase()}`;

const regions = ["Africa", "America", "Oceania", "Asia", "Europe"];

const CountryList = () => {
    const [region, setRegion] = useState("default");
    const [input, setInput] = useState("");
    const [debouncedInput, setDeboucedInput] = useState(input);
    const [list, setList] = useState<any>([]);
    const [filteredList, setFilteredList] = useState<any>();
    const [loading, setLoading] = useState(true);

    useDebounce(
        () => {
            setDeboucedInput(input);
        },
        200,
        [input]
    );

    useUpdateEffect(() => {
        if (!debouncedInput) {
            return setFilteredList(list);
        }

        const filtedList = list.filter((item: any) => {
            return item.name.common
                .toLowerCase()
                .includes(debouncedInput.toLowerCase());
        });

        setFilteredList(filtedList);
    }, [debouncedInput, list]);

    const handleChange = (e: SelectChangeEvent) => {
        const value = e.target.value;
        setRegion(value);
    };

    useEffect(() => {
        let abortController = new AbortController();

        const fetchData = async () => {
            console.log("all");
            try {
                setLoading(true);
                const res = await fetch(allEndpoint, {
                    signal: abortController.signal,
                });

                if (!abortController.signal.aborted) {
                    const data = await res.json();
                    setList(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchRegion = async () => {
            console.log("region");
            try {
                setLoading(true);
                const res = await fetch(regionEndpoint(region), {
                    signal: abortController.signal,
                });

                if (!abortController.signal.aborted) {
                    const data = await res.json();
                    setList(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        if (region === "default") {
            fetchData();
        } else {
            fetchRegion();
        }

        return () => {
            abortController.abort();
        };
    }, [region]);

    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Stack
                marginBottom={3}
                direction={"row"}
                justifyContent="space-between"
                sx={{
                    [theme.breakpoints.down("sm")]: {
                        flexDirection: "column",
                        rowGap: "20px",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <SearchBar
                        value={input}
                        placeholder="search for a country..."
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                        sx={{
                            // @ts-ignore
                            color: (theme) => theme.palette.text.input,
                        }}
                    />
                </Box>
                <FormControl sx={{ m: 1, minWidth: 160 }}>
                    <Select
                        value={region}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "Without label" }}
                    >
                        <MenuItem value="default" disabled>
                            Filter by region
                        </MenuItem>
                        {regions.map((r) => (
                            <MenuItem value={r}>{r}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        height: 300,
                        alignItems: "center",
                    }}
                >
                    <CircularProgress size="3rem" />
                </Box>
            ) : (
                <Grid
                    container
                    spacing={{ xs: 4, sm: 4, lg: 5, md: 4 }}
                    columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                >
                    {filteredList && (
                        <>
                            {filteredList.map(
                                ({
                                    name,
                                    population,
                                    region,
                                    capital,
                                    flags,
                                }: any) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        key={name.common}
                                    >
                                        <CardItem
                                            src={flags.png}
                                            capital={capital?.[0] ?? ""}
                                            name={name.common}
                                            population={population}
                                            region={region}
                                        />
                                    </Grid>
                                )
                            )}
                            {filteredList.length === 0 && (
                                <Box
                                    component="div"
                                    sx={{
                                        display: "flex",
                                        width: "100%",
                                        justifyContent: "center",
                                        height: 300,
                                        alignItems: "center",
                                        fontSize: 100,
                                    }}
                                >
                                    No Result
                                </Box>
                            )}
                        </>
                    )}
                </Grid>
            )}
        </Box>
    );
};

export default CountryList;
