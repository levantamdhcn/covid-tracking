import React from 'react'
import { Grid,Button,Typography,Card,CardContent,CardMedia,CardActions,Link,makeStyles } from '@material-ui/core'
import news from '../../../assets/images/whonews.jpg'
import { ThemeContext } from '../../../contexts/ThemeContext'

export const News = () => {
    const { theme } = React.useContext(ThemeContext)
    const useStyle = makeStyles({
        wrapper: (props) => ({
            backgroundColor: props.theme.item.backgroundColor
        }),
        header: (props) => ({
            fontSize: '18px',
            fontWeight: '600',
            padding: '20px',
            borderRadius: '4px',
            color: props.theme.item.textColor,
            backgroundColor: props.theme.item.backgroundColor,
            borderBottom: `2px solid ${props.theme.container.backgroundColor}`
        }),
        time: {
            color: '#6a6a6a',
            fontSize: '12px',
        },
        title: (props) => ({
            color: props.theme.item.textColor,
        }),
        content: (props) => ({
            color: props.theme.item.iconColor,
        }),
        link: (props) => ({
            color: props.theme.item.iconColor,
            fontWeight: '700'
        }),
        situation: (props) => ({
            backgroundColor: props.theme.item.backgroundColor,
        })
    })
    const classes = useStyle({ theme })
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography component="p" className={classes.header}>
                        WHO Latest News
                    </Typography>
                    <Card className={classes.wrapper}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={news}
                        alt="green iguana"
                    />
                     <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className={classes.title}>
                        Recovered COVID-19 health care workers share their
                        </Typography>
                        <Typography variant="body2" className={classes.content}>
                        Since the start of the pandemic, health workers 
                        have been working on the frontline saving lives daily. 
                        The work they do often exposes them to health
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">
                            <Link 
                                className={classes.link}
                                underlineNone='none'
                                href="https://www.who.int/laos/news/feature-stories/detail/recovered-covid-19-health-care-workers-share-their-stories"
                            >
                                Read More
                            </Link>
                        </Button>
                    </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="p" className={classes.header}>
                            WHO Latest Situations
                    </Typography>
                    <Card>
                        <CardContent className={classes.situation}>
                            <Link
                                className={classes.link}
                                href="https://www.who.int/publications/m/item/weekly-epidemiological-update-on-covid-19---5-october-2021"
                            >
                                <Typography component="p" className={classes.time}>
                                    5 October 2021
                                </Typography>
                                Weekly epidemiological update on COVID-19 - 5 October 2021
                            </Link>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
