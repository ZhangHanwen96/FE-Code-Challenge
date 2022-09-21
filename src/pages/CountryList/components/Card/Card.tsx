import React, { FC } from "react";
import {
    Card as MCard,
    CardContent,
    Typography,
    CardMedia,
    useTheme,
} from "@mui/material";
import { useHistory } from "react-router-dom";

interface ICard {
    src: string;
    name: string;
    population: number;
    region: string;
    capital: string;
}

const Card: FC<ICard> = ({ src, name, population, region, capital }) => {
    const history = useHistory();
    const {
        palette: { text },
    } = useTheme();

    return (
        <MCard
            style={{
                paddingBottom: "20px",
            }}
        >
            <CardMedia
                component="img"
                height="160"
                image={src}
                alt="green iguana"
                onClick={() => {
                    history.push(`/country-detail/${name}`, {});
                }}
            />
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="left"
                    fontWeight={(t) => t.typography.fontWeightBold}
                >
                    {name}
                </Typography>
                <Typography variant="body1" align="left" color="text.default">
                    Population: {population}
                </Typography>
                <Typography variant="body1" color="text.default">
                    region: {region}
                </Typography>
                <Typography variant="body1" color="text.default">
                    capital: {capital}
                </Typography>
            </CardContent>
        </MCard>
    );
};

export default Card;
