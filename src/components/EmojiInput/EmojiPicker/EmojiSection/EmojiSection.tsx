import React, {FC} from "react";
import "./EmojiSection.sass"
import {useAppDispatch} from "app/hooks";
import {pushEmoji} from "features/inputSlice";
import {increaseClickCount} from "../../../../features/pickerSlice";

interface EmojiSectionProps {
    title: string,
    content: string[]
}

export const EmojiSection: FC<EmojiSectionProps> = ( {title, content} ) => {

    const dispatch = useAppDispatch()
    const push = (emoji: string) => dispatch(pushEmoji(emoji))
    const increase = (emoji: string) => dispatch(increaseClickCount(emoji))
    const focus = () => document.querySelector<HTMLTextAreaElement>(".emoji-input-span")!.focus()

    return (
        <section className="emoji-section">
            <p> {title} </p>
            <div className="emoji-grid">
                {
                    content.map(e => {
                        return <span
                            role="img"
                            key={e}
                            onClick={() => {
                                push(e)
                                increase(e)
                                focus()
                            }}
                        >
                            {e}
                        </span>
                    })
                }
            </div>
        </section>
    )
}
