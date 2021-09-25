import React from 'react';
import { FormControl, InputLabel, NativeSelect,FormHelperText } from '@material-ui/core';

const  CountrySelector = ({ value,handleOnChange,countries }) => {
    return (
        <FormControl>
            <InputLabel htmlFor="" shrink>Quốc gia</InputLabel>
            <NativeSelect
                value={value}
                onChange={handleOnChange}
                inputProps={{
                    name: 'country',
                    id: 'country-selector'
                }}
            >
                {
                    countries.map((country) => {
                        return <option value={country.ISO2.toLowerCase()}>{country.Country}</option>
                    })
                }
            </NativeSelect>
            <FormHelperText>Select a country</FormHelperText>
        </FormControl>
    )
}

export default CountrySelector