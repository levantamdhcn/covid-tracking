import React from 'react'
import '@fontsource/roboto'
import logo from '../assets/images/logo.png'
import { Grid }  from '@material-ui/core'
import { ThemeContext } from '../contexts/ThemeContext'
import { 
    Typography,
    makeStyles,
    Avatar,
    Box
} from '@material-ui/core'
import {
  NavLink
} from "react-router-dom";



export const Header = () => {
    const {theme} = React.useContext(ThemeContext)
    const useStyle = makeStyles({
        wrapper: (props) => ({
            backgroundColor: props.theme.item.backgroundColor,
            display: 'flex',
            justifyContent: 'space-between',
            color: 'white',
            width: '100%',
        }),
        heading: (props) => ({
            fontSize: '22px',
            color: props.theme.item.textColor,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center'
        }),
        time: {
            fontSize: '14px',
            color: '#BABDBD'
        },
        nav: {
            display: 'flex',
        },
        active: {
            "& i": {
                color: '#7B6FFF !important',
            },
            "& h2": {
                color: '#7B6FFF !important',
            }
        },
        navItem: (props) => {
            return {
                display: 'flex',
                alignItems: 'center',
                marginLeft: '20px',
                textDecoration: 'none',
                "& h2": {
                    fontWeight: '600',
                    fontSize: '14px',
                    fontFamily: 'Roboto',
                    marginLeft: '10px',
                    color: props.theme.item.textColor,
                },
                "& i": (props) => ({
                    color: props.theme.item.iconColor,
                    fontSize: '14px',
                }),
                "&:hover": {
                    "& h2": {
                        color: '#7B6FFF !important',
                    },
                    "& i": {
                        color: '#7B6FFF !important',
                    },
                },
                animation: 'transition ease-in 1s'
        }},
    })
    const classes = useStyle({ theme })
    const [currentTab,setcurrentTab] = React.useState('dashboard')

    return (
            <Grid item xs={12} className={classes.wrapper}>
                <Typography variant="h6" component="h3" className={classes.heading}>
                    <Avatar variant={"rounded"} alt="logo" src={logo} style={{
                        width: 35,
                        height: 35,
                        marginRight: 15,
                    }}/>
                    Covtrack
                </Typography>
                <Box className={classes.nav}>
                    <NavLink to={`/`} 
                        className={`${classes.navItem} ${currentTab ==="dashboard" ? classes.active : ""} `} 
                        onClick={() => {
                        setcurrentTab('dashboard')
                    }}>
                        <div>
                            <i class="fas fa-tachometer-alt"></i>
                        </div>
                        <Typography component="h2">
                            Dashboard
                        </Typography>
                    </NavLink>
                    <NavLink to={`/chart`} 
                        className={`${classes.navItem} ${currentTab ==="charts" ? classes.active : ""} `}
                        onClick={() => {
                        setcurrentTab('charts')
                    }}>
                        <i class="fas fa-chart-area"></i>
                        <Typography component="h2">
                            Charts
                        </Typography>
                    </NavLink>
                </Box>
            </Grid>
    )
}
