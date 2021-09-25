import React from 'react'
import { Card,CardContent,Typography,makeStyles,Grid } from '@material-ui/core'

const useStyles = makeStyles({
    wrapper: (props) => {
        if (props.type === 'confirmed') {
            return {
                borderLeft: '5px solid #c9302c',
            }
        }
        if (props.type === 'recovered') {
            return {
                borderLeft: '5px solid #28a745',
            }
        } else {
                return {
                    borderLeft: '5px solid gray',
                }
            }
    },
    title: {
        fontSize: '18px',
        marginBottom: '5px'
    },
    count: {
        fontWeight: 'bold',
        fontSize: '18px'
    }
})

export default function HighlighCard({ title,count,type }) {
    const styles = useStyles({ type })
    return (
        <Grid item sm={4} xs={12}>
            <Card className={styles.wrapper}>
                <CardContent>
                    <Typography component="p" varient="body2" className={styles.title}>{title}</Typography>
                    <Typography component="span" varient="body2" className={styles.count}>{count}</Typography>
                </CardContent>
            </Card>
        </Grid> 
    )
}
