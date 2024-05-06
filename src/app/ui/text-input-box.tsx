"use client";

import {
    useEffect,
    useState
} from 'react'

export default function TextInputBox({
    title,
    value,
    callback,
    height
} : {
    title     : any,
    value     : any,
    callback  : any,
    height   ?: any
}) {
    const [display_value, setDisplayValue] = useState(value);

    return (
        <div style={{
            width         : `75%`,
            height        : `10%`,
            borderRadius  : `1rem`,
            border        : `0.2rem solid hsla(250deg, 30%, 95%, 20%)`,
            borderWidth   : `0rem 0.2rem 0rem 0.2rem`,
            margin        : `0.25rem`,
            padding       : `0rem 0.5rem 0rem 0.5rem`,
            display       : `flex`,
            flexDirection : `column`,
            alignItems    : `center`,
            justifyContent: `space-between`,
            fontFamily    : `sans-serif`,
            color         : `hsla(250deg, 60%, 95%, 50%)`
        }}>
            <div
                style={{
                    width          : `100%`,
                    display        : `flex`,
                    alignItems     : `center`,
                    justifyContent : `center`,
                }}
            >
                {title}
            </div>
            <input 
                type="text"
                style={{
                    width           : `100%`,
                    height          : `40%`,
                    borderRadius    : `1rem`,
                    border          : `0.15rem solid hsla(250deg, 30%, 95%, 20%)`,
                    margin          : `0.25rem`,
                    padding         : `0rem 0.5rem 0rem 0.5rem`,
                    display         : `flex`,
                    flexDirection   : `column`,
                    alignItems      : `center`,
                    backgroundColor : `hsla(250deg, 60%, 95%, 0%)`,
                    color           : `white`,
                }}
                value={display_value}
                onChange={ Event => setDisplayValue(Event.target.value) }
                onBlur={ Event => callback(display_value) }
                onKeyUp={ Event => {
                    if (Event.key === "Enter" ) {
                        callback(display_value)
                    }
                }}
            />
        </div>
    )
}