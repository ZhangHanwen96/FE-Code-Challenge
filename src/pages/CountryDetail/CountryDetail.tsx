import React, { FC, useEffect, useMemo, useState } from "react";
import {
    useParams,
    useLocation,
    useHistory,
    generatePath,
} from "react-router-dom";
import {
    Box,
    Stack,
    Chip,
    Button,
    Typography,
    useTheme,
    CircularProgress,
    makeStyles,
    useMediaQuery,
    styled,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const fetchCountry = (code: string) => {
    const url = `https://restcountries.com/v3.1/name/${code}?fields=tld,currencies,population,languages,name,cca3,flags,borders,region,subregion,capital`;
    return fetch(url).then((res) => res.json());
};

const fetchCountryByCode = (code: string[]) => {
    const url = `https://restcountries.com/v3.1/alpha?codes=${code.join(",")}`;
    return fetch(url).then((res) => res.json());
};

interface ISingleRecord {
    title: string;
    data: string | number;
}

const SingleRecord: FC<ISingleRecord> = ({ data, title }) => {
    return (
        <Typography
            variant="body1"
            color="text.default"
            fontWeight={(t) => t.typography.fontWeightMedium}
        >
            {title}:{" "}
            <Box
                component="span"
                color="text.default"
                fontWeight={(t) => t.typography.fontWeightLight}
            >
                {data}
            </Box>
        </Typography>
    );
};

const ResponsiveBox = styled("div")(({ theme }) => ({
    width: "50%",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));

const CountryDetail = () => {
    const { code } = useParams<{ code: string }>();
    const { state } = useLocation<{ from: any }>();
    const theme = useTheme();
    const history = useHistory();

    const [data, setData] = useState<any>();
    const [borders, setBorders] = useState<string[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data) {
            const { borders } = data;
            if (!borders || borders.length === 0) {
                return;
            }
            fetchCountryByCode(borders).then((data) => {
                console.log(data, "bbbb");
                const names = data.map((item: any) => item.name.common);
                setBorders(names);
            });
        }
    }, [data]);

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        setLoading(true);

        fetchCountry(code)
            .then((res) => {
                setData(res[0]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [code]);

    const goBackBtn = useMemo(
        () => (
            <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                    if (Array.isArray(state?.from)) {
                        if (state.from.length === 0) {
                            return history.push("/");
                        }
                        const name = state.from.pop();
                        return history.push(name, {
                            from: [...state.from],
                        });
                    }
                    history.push("/");
                }}
            >
                <ArrowBack
                    sx={{
                        // @ts-ignore
                        color: theme.palette.text.default,
                        marginRight: 1,
                    }}
                />
                <Typography variant="body1" color="text.default">
                    Back
                </Typography>
            </Button>
        ),
        [theme, state?.from]
    );

    return (
        <div>
            <Box
                sx={{
                    marginBottom: 10,
                }}
            >
                {goBackBtn}
            </Box>

            <Stack
                direction={isMobile ? "column" : "row"}
                spacing={1}
                sx={{
                    width: "100%",
                    gap: "120px",
                }}
            >
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
                    <>
                        {data?.flags?.png && (
                            <Box
                                component="img"
                                src={data.flags.png}
                                sx={{
                                    width: "50%",
                                    display: "block",
                                    height: "auto",
                                    objectFit: "contain",
                                    [theme.breakpoints.down("sm")]: {
                                        width: "100%",
                                    },
                                }}
                            />
                        )}
                        {data && (
                            <Box
                                component="div"
                                sx={{
                                    width: "50%",
                                    [theme.breakpoints.down("sm")]: {
                                        width: "100%",
                                    },
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    color="text.default"
                                    sx={{
                                        marginBottom: 5,
                                    }}
                                    fontWeight={(t) =>
                                        t.typography.fontWeightMedium
                                    }
                                >
                                    {data.name.common}
                                </Typography>
                                <Stack
                                    direction={isMobile ? "column" : "row"}
                                    sx={{
                                        marginBottom: 6,
                                    }}
                                >
                                    <ResponsiveBox>
                                        <SingleRecord
                                            title="Native Name"
                                            data={
                                                data.name.nativeName[
                                                    Object.keys(
                                                        data.name.nativeName
                                                    )[0]
                                                ].common
                                            }
                                        />
                                        <SingleRecord
                                            title="Population"
                                            data={data.population}
                                        />
                                        <SingleRecord
                                            title="Region"
                                            data={data.region}
                                        />
                                        <SingleRecord
                                            title="Sub Region"
                                            data={data.subregion}
                                        />
                                        <SingleRecord
                                            title="Capital"
                                            data={data.capital[0]}
                                        />
                                    </ResponsiveBox>
                                    <ResponsiveBox>
                                        <SingleRecord
                                            title="Tol Level Domain"
                                            data={data.tld[0]}
                                        />

                                        <SingleRecord
                                            title="Currencies"
                                            data={Object.keys(data.currencies)
                                                .map((c: string) => c)
                                                .join(", ")}
                                        />

                                        <SingleRecord
                                            title="Languages"
                                            data={Object.entries(data.languages)
                                                .map(([_, value]) => value)
                                                .join(",")}
                                        />
                                    </ResponsiveBox>
                                </Stack>

                                <Stack
                                    direction="row"
                                    alignItems={"center"}
                                    spacing={1}
                                    rowGap={1}
                                    flexWrap="wrap"
                                >
                                    <Typography
                                        variant="body1"
                                        fontWeight={(t) =>
                                            t.typography.fontWeightMedium
                                        }
                                        component="span"
                                        color="inherit"
                                        sx={{
                                            marginRight: 1,
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        Border countries:{" "}
                                    </Typography>

                                    {borders &&
                                        borders.map((border: string) => (
                                            <Chip
                                                label={border}
                                                onClick={() => {
                                                    history.push(
                                                        `/country-detail/${border}`,
                                                        //@ts-ignore
                                                        {
                                                            from: state?.from
                                                                ? [
                                                                      ...state.from,
                                                                      code,
                                                                  ]
                                                                : [code],
                                                        }
                                                    );
                                                }}
                                            />
                                        ))}
                                </Stack>
                            </Box>
                        )}
                    </>
                )}
            </Stack>
        </div>
    );
};

export default CountryDetail;
