import React,{ useContext } from 'react'
import { 
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    makeStyles 
} from '@material-ui/core'
import { ThemeContext } from '../../../contexts/ThemeContext'

const TopTenList = ({ data,type }) => {
    const { theme } = useContext(ThemeContext)
    const useStyle = makeStyles({
        title: (props) => ({
            textAlign: 'left',
            fontSize: '20px',
            fontWeight: 'bold',
            fontFamily: 'Roboto,san-serif',
            marginBottom: '10px',
            color: props.theme.item.textColor
        }),
        number: (props) => ({
            textAlign: 'right',
            color: props.theme.item.iconColor,
            '& span': {
                fontSize: '14px',
            }
        }),
        itemWrapper: (props) => ({
            backgroundColor: props.theme.item.backgroundColor,
            marginBottom: '10px',
            borderRadius: '0px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }),
        fixFlag: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'initial',
        },
        text: (props) => ({
            marginTop: '5px',
            '& span': {
                color: props.theme.item.iconColor,
                fontSize: '14px',
              },
        }),
        flag: {
            borderRadius: '0px',
        },
        flagWrapper: {
            minWidth: '40px',
        }
    })
    const classes = useStyle({ theme })
    const sortedDataByCases = data.sort((a,b) =>( b[type] - a[type] ))
    const createData = ( name,type,flag ) => {
        return { name, type, flag };
    }
    const list = []
    if (sortedDataByCases.length > 0) {
      for (var i=0;i<10;i++) {
        list.push(createData(
                sortedDataByCases[i].country, 
                sortedDataByCases[i][type], 
                sortedDataByCases[i].countryInfo.flag,
            ))
      }
    }
    let title = ''
    switch(type){
        case 'cases': 
            title = 'Top Cases'
            break;
        case 'todayCases':
            title = 'Today Cases'
            break;
        case 'deaths': 
            title = 'Top Deaths'
            break;
        case 'todayDeaths': 
            title = 'Today Deaths'
            break;
        case 'active': 
            title = 'Top Active'
            break;
        case 'recovered': 
            title = 'Top Recovered'
            break;
        default: 
            title = ''
    }
    return (
        <Grid item xs={12} sm={4} md={2}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <Typography component="p" className={classes.title}>{title}</Typography>
                {
                        list.map((item,index) => {
                            return (
                                <ListItem className={classes.itemWrapper} key={index}>
                                    <div className={classes.fixFlag}>
                                        <ListItemAvatar className={classes.flagWrapper}>
                                        <Avatar variant={"rounded"} alt="logo" src={item.flag} style={{
                                            width: 30,
                                            height: 20,
                                        }}
                                        className={classes.flag} 
                                        />
                                        </ListItemAvatar>
                                        <ListItemText primary={item.name} className={classes.text}/>
                                    </div>
                                    <ListItemText primary={item.type} className={classes.number}/>
                                </ListItem>
                            )     
                        })
                }
            </List>
        </Grid>

    )
}

export default React.memo(TopTenList)


