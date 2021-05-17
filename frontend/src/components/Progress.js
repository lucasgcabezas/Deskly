import { useEffect, useState } from 'react'

const Progress = ({done}) => {
	const [style, setStyle] = useState({});
	
	// useEffect(() => {
    //     const reloadTaskPlanner = setInterval(() => {
    //         const newStyle = {
    //             opacity: 1,
    //             width: `${done}%`
    //         }
            
    //         setStyle(newStyle);
    //     }, 5000)
    //     return () => { clearInterval(reloadTaskPlanner) }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
    
	return (
		<div className="progress">
			<div className="progress-done" style={style}>
				{done}%
			</div>
		</div>
	)
}

export default Progress