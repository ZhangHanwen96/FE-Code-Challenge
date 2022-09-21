import React, { FC } from "react";
import { styled, alpha, Theme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
        theme.palette.mode === "dark"
            ? alpha(theme.palette.common.black, 0.15)
            : theme.palette.common.white,

    marginLeft: 0,
    width: "100%",
    boxShadow:
        theme.palette.mode === "dark"
            ? "3px 9px 24px -4px rgba(209,209,209, 0.51)"
            : "3px 9px 24px -4px rgba(0,0,0,0.51)",
    [theme.breakpoints.up("sm")]: {
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        height: "38px",

        [theme.breakpoints.up("sm")]: {
            width: "20ch",
            "&:focus": {
                width: "28ch",
            },
        },
    },
}));

const SearhBar: FC<InputBaseProps> = (props) => {
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase {...props} />
        </Search>
    );
};

export default SearhBar;
