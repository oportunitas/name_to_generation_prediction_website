"use client"
import TextInputBox from '@/app/ui/text-input-box'

import {
    useCallback,
    useState
} from 'react'

export default function Page() {
    const [input_name, setInputName] = useState("haji nawi")
    const callbackInputName          = useCallback((stream: any) => {
        setInputName(stream)
        console.log(`submitted ${stream} into server`)
    }, [input_name])

    const [server_response, setServerResponse] = useState("tet");

    return (
        <div style={{
            height          : `100vh`,
            width           : `100vw`,
            inset           : `0`,
            display         : `flex`,
            flexDirection   : `column`,
            alignItems      : `center`,
            justifyContent  : `center`,
            padding         : `0`,
            margin          : `0`,
            border          : `0.1px solid white`,
            backgroundColor : `hsla(150deg, 40%, 10%, 100%)`,
            fontSize        : `1.2rem`,
            color           : `white`,
        }}>
            <TextInputBox
                title    = "Input Name Below"
                value    = {input_name}
                callback = {callbackInputName}
            />

            {(server_response !== "null") && (
                <div style={{
                    border: `0px solid white`,
                    display:  `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    marginTop: `1rem`,
                }}>
                    <div style={{
                        width: `75%`,
                        textAlign: `center`,
                        fontSize: `0.8em`,
                    }}>
                        {`Our AI predicts that the person with the name '${input_name}' is most likely to be born between:` }
                    </div>
                    <div style={{
                        border: `1rem solid transparent`,
                    }} />
                    {server_response}
                </div>
            )}
        </div>
    );
}