import React,{ createContext,useState } from 'react'

export const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {
    const [theme,setTheme] = useState({
                container: {
                    backgroundColor: '#f7f8fc',
                },
                item: {
                    backgroundColor: '#fff',
                    textColor: '#222',
                    iconColor: 'rgba(0,0,0,0.65) !important',
                }
            },)
    const themes = [
        {
            container: {
                backgroundColor: '#f7f8fc',
            },
            item: {
                backgroundColor: '#fff',
                textColor: '#222',
                iconColor: 'rgba(0, 0, 0, 0.65) !important'
            }
        },
        {
            container: {
                backgroundColor: '#292d3e',
            },
            item: {
                backgroundColor: '#2f3447',
                textColor: 'white',
                iconColor: 'rgba(255, 255, 255, 0.65) !important'
            }
        },
        {
            container: {
                backgroundColor: '#2d2b55',
            },
            item: {
                backgroundColor: '#32305f',
                textColor: 'white',
                iconColor: 'rgba(255, 255, 255, 0.65) !important'
            }
        },
        {
            container: {
                backgroundColor: '#30243d',
            },
            item: {
                backgroundColor: '#382a47',
                textColor: 'white',
                iconColor: 'rgba(255, 255, 255, 0.65) !important'
            }
        },
        {
            container: {
                backgroundColor: '#193549',
            },
            item: {
                backgroundColor: '#1d3d54',
                textColor: 'white',
                iconColor: 'rgba(255, 255, 255, 0.65) !important'
            }
        },
        {
            container: {
                backgroundColor: '#3a3361',
            },
            item: {
                backgroundColor: '#40386b',
                textColor: 'white',
                iconColor: 'rgba(255, 255, 255, 0.65) !important'
            }
        },
    ]
    
    const handleSelectColor = (color,event) => {
        console.log(event)
        switch(color){
            case 'first': 
                setTheme(themes[0])
                console.log(color)
                break;
            case 'second': 
                setTheme(themes[1])
                console.log(color)
                break;
            case 'third': 
                setTheme(themes[2])
                break;
            case 'fourth': 
                setTheme(themes[3])
                break;
            case 'fifth': 
                setTheme(themes[4])
                break;
            case 'sixth': 
                setTheme(themes[5])
                break;
            default: 
                setTheme(themes[0])
                break;
        }
    }

    const ThemeContextData = {
        theme,
        handleSelectColor
    }

    return (
        <ThemeContext.Provider value={ThemeContextData}>
            { children }
        </ThemeContext.Provider>
    )
}

export default React.memo(ThemeContextProvider)
