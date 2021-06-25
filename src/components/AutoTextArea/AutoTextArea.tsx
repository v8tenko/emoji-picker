import React, {CSSProperties, forwardRef, useEffect, useRef, useState} from 'react'
import {ReactComponent as Smile} from "../../res/smile.svg";

export interface AutoTextAreaProps {
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    style?: CSSProperties,
    className?: string,
    content?: string
}


export const AutoTextArea
    = forwardRef<SVGSVGElement, AutoTextAreaProps>((
    {style, onChange, className, content}: AutoTextAreaProps,
    smileRef
) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [text, setText] = useState("")
    const [textAreaHeight, setTextAreaHeight] = useState("auto")
    const [parentHeight, setParentHeight] = useState("auto")

    useEffect(() => {
        setParentHeight(`${textAreaRef.current!.scrollHeight}px`)
        setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`)
    }, [text])

    const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaHeight("auto")
        setParentHeight(`${textAreaRef.current!.scrollHeight}px`)
        setText(event.target.value)
        onChange?.call(null, event)
    }

    return (
        <div
            style={{
                minHeight: parentHeight,
                position: "relative"
            }}
        >
			<textarea
                ref={textAreaRef}
                rows={1}
                className={`${className} auto-textarea`}
                value={content ?? text}
                style={{
                    height: textAreaHeight,
                    overflow: "hidden",
                    ...style
                }}
                onChange={onChangeHandler}
            />
            <Smile
                className="emoji-input-smile"
                ref={smileRef}
            />
        </div>
    )
})
