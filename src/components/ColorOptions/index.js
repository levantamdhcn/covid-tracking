import React,{ useContext } from 'react'
import { makeStyles } from '@material-ui/core'
import { ThemeContext } from '../contexts/ThemeContext'


const useStyle = makeStyles((theme) => {
    return {
        '@keyframes translateIn': {
            from: { transform: 'translateX(240px)' },
            to: { transform: 'translateX(0)' },
        },
        '@keyframes translateOut': {
            from: { transform: 'translateX(0)' },
            to: { transform: 'translateX(240px)' },
        },
        wrapper: {
            transform: 'translateX(240px) !important',
            position: 'fixed',
            right: '0',
            top: '25%',
            transition: 'all 1s ease'
        },
        wrapperActive: {
            transform: 'translateX(0)',
            position: 'fixed',
            right: '0',
            top: '25%',
            animation: '$translateIn ease-in 1s'
        },
        colorWrapper: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        toggleBtn: {
            position: 'fixed',
            top: '30px',
            right: '240px',
            cursor: 'pointer',
            padding: '6px 8px 5px 8px',
            backgroundColor: '#7b6fff',
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px',
            color: 'white',
            "& i": {
                animation: 'fa-spin 2s infinite',
            }
        },
        colorPanel: {
            position: 'fixed',
            right: '0',
            top: '0',
            backgroundColor: '#000',
            color: '#fff',
            width: '200px',
            zIndex: '999',
            borderRadius: '5px',
            padding: '20px',
            "& h3": {
                marginTop: 0,
                fontSize: '16px',
                fontWeight: 'normal',
                fontFamily: 'Roboto'
            }
        },
        colorSpan: {
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            cursor: 'pointer',
        },
        colorActiveSpan: {
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            cursor: 'pointer',
            boxShadow: '0px 0px 0px 3px gray inset'
        },
        
    }
})

const colors = [
    {
        color: '#fff',
        class: 'firstColor',
        select: 'first'
    },
    {
        color: '#292d3e',
        class: 'secondColor',
        select: 'second'
    },
    {
        color: '#2d2b55',
        class: 'thirdColor',
        select: 'third'
    },
    {
        color: '#30243d',
        class: 'fourthColor',
        select: 'fourth'
    },
    {
        color: '#193549',
        class: 'fifthColor',
        select: 'fifth'
    },
    {
        color: '#3a3361',
        class: 'sixthColor',
        select: 'sixth'
    },
]

export const ColorOptions = () => {
    const { theme, handleSelectColor } = useContext(ThemeContext)
    const [selectedBackground, setSelectedBackground] = React.useState('first')
    const [exit, setExit] = React.useState(true);

    const handleChangeBackground = (select) => (event) => {
        handleSelectColor(select)
        setSelectedBackground(select)
        console.log(select)
    }
    const classes = useStyle({ theme })
    return (
        <div className={`${exit === true ? classes.wrapper :  classes.wrapperActive}`}>
            <div className={`${classes.toggleBtn}`} onClick={() => setExit(() => setExit(!exit))}>
                <i class="fas fa-cog"></i>
            </div>
            <div className={classes.colorPanel}>
                <h3>Background Color</h3>
                <div className={classes.colorWrapper}>
                    {
                        colors.map((el) => {
                            return (
                                <span 
                                    className={`${ selectedBackground === el.select ? classes.colorActiveSpan : classes.colorSpan}
                                     ${classes[el.class]}`}
                                    onClick={handleChangeBackground(el.select)}
                                    style={{backgroundColor: el.color}}
                                >
                                </span>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
