import React from 'react'
import '@fontsource/roboto'
import logo from '../assets/images/logo.png'
import { Grid }  from '@material-ui/core'
import { ThemeContext } from '../contexts/ThemeContext'
import { 
    Typography,
    makeStyles,
    Avatar,
    Box,
} from '@material-ui/core'
import {
  NavLink
} from "react-router-dom";

const useStyle = makeStyles((theme) => ({
    wrapper: (props) => ({
        backgroundColor: props.theme.item.backgroundColor,
        display: 'flex',
        justifyContent: 'space-between',
        color: 'white',
        position: 'fixed',
        left: '0',
        right: '0',
        top: '0',
        zIndex: '999',
        borderColor: props.theme.item.backgroundColor,
        height: '70px'
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
    nav: (props) => ({
        [theme.breakpoints.up('xs')]: {
            display: props.isActive ? 'block' : 'none',
            position: 'fixed',
            top: '64px',
            left: '0',
            right: '0',
            backgroundColor: props.theme.item.backgroundColor,
            flexWrap: 'wrap',
            zIndex: '10',
            padding: '20px 20px 20px 0px',
            borderBottom: '1px solid #f2f2f2',
        },
        [theme.breakpoints.up('md')]: {
            flexWrap: 'no-wrap',
            width: 'unset',
            display: 'flex',
            position: 'unset',
            zIndex: 'unset',
            padding: '0',
            border: 'none',
        },
    }),
    active: {
        "& div": {
            "& i": {
                color: '#7B6FFF !important',
            } 
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
            animation: 'transition ease-in 1s',
            [theme.breakpoints.up('xs')]: {
                width: '100%',
                borderBottom: '1px solid #f2f2f2',
                padding: '10px 20px 10px 0'
            },
            [theme.breakpoints.up('sm')]: {
                width: 'unset',
                border: 'none',
                padding: '0'
            },
    }},
    navBtn: {
        color: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid',
        cursor: 'pointer',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        fontSize: '24px',
        borderRadius: '4px',
        backgroundColor: 'transparent',
        padding: '5px 15px',
        [theme.breakpoints.up('xs')]: {
            display: 'block',
        },
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
    }
}))

export const Header = () => {
    const {theme} = React.useContext(ThemeContext)
    const [isActive,setIsActive] = React.useState(false)
    const classes = useStyle({ theme,isActive })
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
                    <button className={classes.navBtn} onClick={() => setIsActive(!isActive)}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <Box className={classes.nav}>
                        <NavLink to={`/`} 
                            className={`${classes.navItem} ${currentTab ==="dashboard" ? classes.active : ""} `} 
                            onClick={() => {
                            setcurrentTab('dashboard')
                        }}>
                            <div>
                                <i className="fas fa-tachometer-alt"></i>
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
                        <i className="fas fa-chart-area"></i>
                        <Typography component="h2">
                            Charts
                        </Typography>
                    </NavLink>
                    </Box>
            </Grid>
    )
}
