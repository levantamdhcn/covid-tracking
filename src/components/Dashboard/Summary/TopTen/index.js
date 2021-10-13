import React from 'react'
import TopTenList from './generateTopTen'
import {ThemeContext} from '../../../contexts/ThemeContext'

import { Grid } from '@material-ui/core'

export const TopTen = ({ data }) => {
  const types = ['cases','todayCases','deaths','todayDeaths','active','recovered']
  const { theme } = React.useContext(ThemeContext)
    return (
        <Grid container spacing={3}>
          {
            types.map((item) => {
              return (
                <TopTenList data={data} type={item} theme={theme}/>
              )
            })
          }
        </Grid>
    )
}
