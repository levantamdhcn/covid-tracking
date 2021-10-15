import React from 'react'
import { Typography,Box,Link,makeStyles,Grid } from '@material-ui/core'
import { ThemeContext } from '../contexts/ThemeContext'

const useStyle = makeStyles((theme) => ({
    wrapper: (props) => ({
        padding: '20px 15px 20px 15px',
        display:'flex',
        justifyContent: 'space-between',
        backgroundColor: props.theme.container.backgroundColor,
        color: props.theme.item.iconColor,
    }),
    icon: (props) => ({
        marginLeft: '30px',
        fontSize: '28px',
        color: props.theme.item.iconColor
    }),
    youtube: {
        '&:hover': {
            color: 'red !important'
        },
    },
    facebook: {
        '&:hover': {
            color: '#1877f2 !important'
        },
    },
    twitter: {
        '&:hover': {
            color: '#1d9bf0 !important'
        },
    },
    copyright: (props) => ({
        fontSize: '14px',
        fontWeight: '600',
        color: props.theme.item.iconColor,
        [theme.breakpoints.up('xs')]: {
            textAlign: 'center',
            marginBottom: '10px'
            },
            [theme.breakpoints.up('md')]: {
                textAlign: 'left'
            },
    }),
    socials: {
        [theme.breakpoints.up('xs')]: {
        textAlign: 'center'
        },
        [theme.breakpoints.up('md')]: {
            textAlign: 'right'
        },
    }
}))

export const Footer = () => {
    const {theme} = React.useContext(ThemeContext)

    const classes = useStyle({ theme })
    const links = [
        {
            link:'https://www.youtube.com/channel/UChN1goECpg64jlUxSzySiNg?view_as=subscriber',
            icon: 'fab fa-youtube',
            name: 'youtube'
        },
        {
            link: 'https://twitter.com/quixlab',
            icon: 'fab fa-twitter',
            name: 'twitter'
        },
        {
            link: 'https://www.facebook.com/qxlab',
            icon: "fab fa-facebook",
            name: 'facebook'
        },
    ]
    return (
        <Grid container className={classes.wrapper}>
                <Grid item xs={12} md={6}>
                    <Typography component="p" className={classes.copyright}>
                        Copyright © 2020 Quixlab. All Rights Reserved.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box className={classes.socials}>
                        {
                            links.map((el) => {
                                return (
                                    <Link
                                    key={el.name}
                                        href={el.link}
                                        className={`${classes.icon} ${classes[el.name]}`}
                                    >
                                        <i className={el.icon}/>
                                    </Link>
                                )
                            })
                        }
                    </Box>
                </Grid>
        </Grid>
    )
}
