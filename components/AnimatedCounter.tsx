"use client"

import CountUp from 'react-countup';

export const AnimatedCounter = ({value}:{value:number}) => {
    return (
    
            <CountUp 
                end={value}
                decimal='.'
                prefix='$'
                duration={2.75}
                decimals={2}
                />
    )
}

export default AnimatedCounter