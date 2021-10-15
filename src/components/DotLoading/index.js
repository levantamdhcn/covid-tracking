import React from 'react'
import { Loading } from 'react-loading-dot'
import { makeStyles } from '@material-ui/core'

const useStyle = makeStyles({
	dot: {
		width: '100%', 
		height: '100vh'
	}
})

export const DotLoading = () => {
	const classes = useStyle()
	return (
		<div className={classes.dot}>
			<Loading background={'#7B6FFF'} size={'1.5rem'}/>
		</div>
	)
}
