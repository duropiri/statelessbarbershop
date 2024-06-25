import React from 'react'
import { motion } from 'framer-motion';

export default function Layout({children, backgroundColor}) {

    const anim = (variants, custom=null) => {
        return {
            initial: "initial",
            animate: "enter",
            exit: "exit",
            custom,
            variants
        }
    }

     const expand = {
        initial: {
            top: 0
        },
        enter: (i) => ({    
            top: "100vh",
            transition: {
                duration: 0.4,
                delay: 0.05 * i,
                ease: [0.215, 0.61, 0.355, 1],
            },
            transitionEnd: { height: "0", top: "0" }
        }),
        exit: (i) => ({
            height: "100vh",
            transition: {
                duration: 0.4,
                delay: 0.05 * i,
                ease: [0.215, 0.61, 0.355, 1]
            }
        })
    }
     const opacity = {
        initial: {
            opacity: 0.5
        },
        enter: {
            opacity: 0
        },
        exit: {
            opacity: 0.5,
            
        }
    }

    const nbOfColumns = 5
    return (
        <div className='page stairs' style={{backgroundColor}}>
            <motion.div {...anim(opacity)} className='transition-background'/>
            <div className='transition-container'>
                {
                    [...Array(nbOfColumns)].map( (_, i) => {
                        return (
                            <motion.div key={i} {...anim(expand, nbOfColumns - i)}/>
                        ) 
                    })
                }
            </div>
            {
                children
            }
        </div>
    )
}