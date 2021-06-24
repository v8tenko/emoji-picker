import React, {CSSProperties, FC, useEffect, useRef, useState} from 'react'

export interface AutoTextAreaProps {
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    style?: CSSProperties,
    className?: string,
    content?: string
}


export const AutoTextArea: FC<AutoTextAreaProps>
    = ( { style, onChange, className, content }: AutoTextAreaProps) => {
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
        </div>
    )
}
