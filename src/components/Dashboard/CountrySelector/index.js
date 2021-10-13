import React from 'react';
import { FormControl, Select,FormHelperText,makeStyles, MenuItem,OutlinedInput } from '@material-ui/core';
import "@fontsource/roboto";

const  CountrySelector = ({ value,handleOnChange,countries,theme }) => {
    const ITEM_HEIGHT = 50;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };
    const useStyle = makeStyles({
        wrapper: (props) => ({
            backgroundColor: props.theme.item.backgroundColor,
            borderRadius: '10px',
            padding: '15px 15px 0 15px',
            width: '300px',
            boxShadow: '0 0 30px 0 rgb(82 63 105 / 5%)',
            fontWeight: 'bold',
        }),
        select: (props) => ({
            borderRadius: '5px',
            color: props.theme.item.textColor,
            border: `1px solid ${props.theme.item.iconColor}`,
            "& svg": {
                color: props.theme.item.textColor,
            }
        }),
        text: (props) => ({
            color: props.theme.item.iconColor,
        })
    })
    const classes = useStyle({ theme })
    countries.sort(function(a,b){
        return a.country.localeCompare(b.country);
    })
    return (
        <FormControl className={classes.wrapper}>
            <Select
                variant='filled'
                value={value}
                onChange={handleOnChange}
                inputProps={{
                    name: 'country',
                    id: 'country-selector'
                }}
                input={<OutlinedInput label="Name" />}
                className={classes.select}
                MenuProps={MenuProps}
            >
                {
                    countries.map((country) => {
                        return <MenuItem 
                                key={country.country} 
                                value={country.countryInfo.iso2}
                            >
                                {country.country}
                            </MenuItem>
                    })
                }
            </Select>
            <FormHelperText className={classes.text}>Select a country</FormHelperText>
        </FormControl>
    )
}

export default CountrySelector