import React from 'react'
import { Card,CardContent,Typography,makeStyles,Box } from '@material-ui/core'
import CountUp from 'react-countup'

const useStyles = makeStyles({
    wrapper: (props) => {
        if (props.type === 'confirmed') {
            return {
                borderLeft: '5px solid #c9302c',
                boxShadow: '0 0 30px 0 rgb(82 63 105 / 5%);',
                backgroundColor: props.theme.item.backgroundColor,
                color: props.theme.item.textColor           
            }
        }
        if (props.type === 'recovered') {
            return {
                borderLeft: '5px solid #28a745',
                boxShadow: '0 0 30px 0 rgb(82 63 105 / 5%);',
                backgroundColor: props.theme.item.backgroundColor,
                color: props.theme.item.textColor 
            }
        }
        if (props.type === 'active') {
            return {
                borderLeft: '5px solid #ffc107',
                boxShadow: '0 0 30px 0 rgb(82 63 105 / 5%);',
                backgroundColor: props.theme.item.backgroundColor,
                color: props.theme.item.textColor 
            }
        } else {
                return {
                    borderLeft: '5px solid gray',
                    boxShadow: '0 0 30px 0 rgb(82 63 105 / 5%);' ,
                    backgroundColor: props.theme.item.backgroundColor,
                    color: props.theme.item.textColor 
                }
            }
    },
    title: {
        fontSize: '18px',
        marginBottom: '5px',
        color: '#AEAED5',
    },
    count: {
        fontWeight: 'bold',
        fontSize: '18px'
    },
    icon: (props) => {
        if (props.type === 'confirmed') {
            return {
                display: 'inline-flex',
                flex: '0 0 auto',
                marginRight: '15px',
                marginLeft: '15px',
                padding: '7px',
                textAlign: 'center',
                width: '30px',
                height: '30px',
                fontSize: '20px',
                color: 'white',
                background: `linear-gradient(to right, #3398fb 0%, #8553ee 100%)`,
                borderRadius: '50%',
                alignItems: 'center',     
                justifyContent: 'center',     
            }
        }
        if (props.type === 'recovered') {
            return {
                display: 'inline-flex',
                flex: '0 0 auto',
                marginRight: '15px',
                marginLeft: '15px',
                padding: '7px',
                textAlign: 'center',
                width: '30px',
                height: '30px',
                fontSize: '20px',
                color: 'white',
                background: `linear-gradient(135deg, #23bdb8 0%, #43e794 100%)`,
                borderRadius: '50%',   
                alignItems: 'center',     
                justifyContent: 'center',         
            }
        }
        if (props.type === 'active') {
            return {
                display: 'inline-flex',
                flex: '0 0 auto',
                marginRight: '15px',
                marginLeft: '15px',
                padding: '7px',
                textAlign: 'center',
                width: '30px',
                height: '30px',
                fontSize: '20px',
                color: 'white',
                background: 'linear-gradient(to right, #ffbf31 0%, #ff890e 100%)',
                borderRadius: '50%',   
                alignItems: 'center',     
                justifyContent: 'center',          
            }
        }
        if (props.type === 'todayCases') {
            return {
                display: 'inline-flex',
                flex: '0 0 auto',
                marginRight: '15px',
                marginLeft: '15px',
                padding: '7px',
                textAlign: 'center',
                width: '30px',
                height: '30px',
                fontSize: '20px',
                color: 'white',
                background: `linear-gradient(to right, #0f3043 0%, #8553ee 100%)`,
                borderRadius: '50%',   
                alignItems: 'center',     
                justifyContent: 'center',          
            }
        }
        if (props.type === 'todayDeaths') {
            return {
                display: 'inline-flex',
                flex: '0 0 auto',
                marginRight: '15px',
                marginLeft: '15px',
                padding: '7px',
                textAlign: 'center',
                width: '30px',
                height: '30px',
                fontSize: '20px',
                color: 'white',
                background: 'linear-gradient(87deg, #942c14 0, #e60c0c 100%)',
                borderRadius: '50%',   
                alignItems: 'center',     
                justifyContent: 'center',          
            }
        }
        else {
            return {
                display: 'inline-flex',
                flex: '0 0 auto',
                marginRight: '15px',
                marginLeft: '15px',
                padding: '7px',
                textAlign: 'center',
                width: '30px',
                height: '30px',
                fontSize: '20px',
                color: 'white',
                background: `linear-gradient(87deg, #f5365c 0, #f56036 100%)`,
                borderRadius: '50%',   
                alignItems: 'center',     
                justifyContent: 'center',         
            }
            }
    },
})

export default function HighlighCard({ title,count,type,icon,theme }) {
    const styles = useStyles({ type,theme })
    return (
        <Card className={styles.wrapper}>
            <Box sx={{ display: 'flex',alignItems: 'center', justifyContent: 'left'}}>
                <div className={styles.icon}>
                    <i className={icon}></i>
                </div>
                <CardContent>
                    <Typography component="p" varient="body2" className={styles.title}>{title}</Typography>
                    <Typography component="span" varient="body2" className={styles.count}>
                        <CountUp end={parseFloat(count)} duration={3} separator={","}/>
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    )
}
