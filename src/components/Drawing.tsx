import React from 'react'
import "./Drawing.css"

type DrawingProps = {
    numberOfGuesses: number
}

function Drawing({ numberOfGuesses }: DrawingProps) {
    const HEAD = (
        <div className='head' />
    )
    const BODY = (
        <div className='body' />
    )

    const RIGHT_ARM = (
        <div className='right-arm' />
    )
    const LEFT_ARM = (
        <div className='left-arm' />
    )
    const RIGHT_LEG = (
        <div className='right-leg' />
    )
    const LEFT_LEG = (
        <div className='left-leg' />
    )

    const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]
    return (
        <div className='drawing-container'>
            {BODY_PARTS.slice(0, numberOfGuesses)}
            <div className='hang-bar' />
            <div className='top-bar' />
            <div className='upRight-bar' />
            <div className='bottom-bar' />
        </div>

    )
}

export default Drawing
