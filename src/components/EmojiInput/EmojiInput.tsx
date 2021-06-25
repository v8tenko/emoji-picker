import React, {FC, useEffect} from "react";
import "./EmojiInput.sass"
import {EmojiPicker} from "./EmojiPicker/EmojiPicker";
import {DataHelper} from "utils/DataHelper";
import {useAppDispatch, useAppSelector} from "app/hooks";
    import {AutoTextArea} from "../AutoTextArea/AutoTextArea";
import {
    showPicker, setHover, mouseOut, mouseOutPicker, hidePicker
} from "features/pickerSlice";
import {
    selectInputText, updateText
} from "features/inputSlice";

export const EmojiInput: FC = () => {

    const dispatch = useAppDispatch()
    const inputText = useAppSelector(selectInputText)
    const updateInputText =
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(updateText(event.target.value))
        }

    const smileRef = React.createRef<SVGSVGElement>()
    const emojiPickerRef = React.createRef<HTMLDivElement>()

    // делаем ссылки
    useEffect(() => {
        const smileNode = smileRef.current
        const emojiPickerNode = emojiPickerRef.current

        const show = () => dispatch(showPicker())
        const hide = () => dispatch(hidePicker())
        const setHoverTrue = () => dispatch(setHover(true))
        const mouseOutOfSmile = () => dispatch(mouseOut())
        const mouseOutOfPicker = () => dispatch(mouseOutPicker())

        let clickCount = 0
        const handleBindClick = (event: KeyboardEvent) => {
            if (event.key !== "Tab") {
                return
            }
            if (clickCount % 2 === 0) {
                show()
            } else {
                hide()
            }
            clickCount++
        }

        smileNode?.addEventListener('mouseenter', show)
        smileNode?.addEventListener('mouseleave', mouseOutOfSmile)
        emojiPickerNode?.addEventListener('mouseenter', setHoverTrue)
        emojiPickerNode?.addEventListener('mouseleave', mouseOutOfPicker)
        window.addEventListener('keydown', handleBindClick)

        return () => {
            smileNode?.removeEventListener('mouseenter', show)
            smileNode?.removeEventListener('mouseleave', mouseOutOfSmile)
            emojiPickerNode?.removeEventListener('mouseenter', setHoverTrue)
            emojiPickerNode?.removeEventListener('mouseleave', mouseOutOfPicker);
            window.addEventListener('keydown', handleBindClick)
        }
    }, [dispatch, emojiPickerRef, smileRef])

    return (
        <form
            action=""
            className="emoji-form"
        >
            <EmojiPicker ref={emojiPickerRef}/>
            <AutoTextArea
                onChange={updateInputText}
                className="emoji-input-span"
                content={inputText}
                ref={smileRef}
                style={{
                    width: DataHelper.PICKER_WIDTH
                }}
            />
        </form>
    )
}
