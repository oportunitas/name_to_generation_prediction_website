"use client"
import TextInputBox from '@/app/ui/text-input-box'

import {
    useCallback,
    useEffect,
    useState
} from 'react'

export default function Page() {
    const [input_name, setInputName] = useState("")
    const callbackInputName          = useCallback((stream: any) => {
        setServerResponse("null")
        setInputName(stream)
        console.log(`submitted ${stream} into server`)
    }, [input_name])

    const [server_response, setServerResponse] = useState("null");

    const url = process.env.NEXT_PUBLIC_VERCEL_URL ?
        `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api` :
        "http://localhost:3000/api"

    useEffect(() => {
        const requestPrediction = async () => {
            try {
                const call = await fetch(`${url}/predict`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        prompt: input_name
                    })
                })

                if (!call.ok) {
                    console.log("internal server error");
                }

                const call_res = await call.json()
                await console.log(call_res)
                setServerResponse(call_res)
            } catch (error) {
                setServerResponse("not_found")
            }
        }
        
        if (input_name !== "") {
            requestPrediction();
        }
    }, [input_name]);

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
                <>
                    {(server_response !== "not_found" && (
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
                    ))}

                    {(server_response === "not_found" && (
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
                                {`Seems like our AI is too confused on finding out which year '${input_name}' is most likely to be born between` }
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}