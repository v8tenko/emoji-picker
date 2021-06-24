import React, {forwardRef, useEffect} from 'react'
import './EmojiPicker.sass'
import section from 'res/sections.json'
import {DataHelper} from "utils/DataHelper";
import {EmojiSection} from "./EmojiSection/EmojiSection";
import {useAppDispatch, useAppSelector} from "app/hooks";
import {
    selectMode,
    selectPickerShown,
    setMode,
    selectRecent, initEmojiCount,
} from "features/pickerSlice";
import {ReactComponent as Recent} from "res/recent.svg"
import {ReactComponent as Smile} from "res/smile.svg"


export const EmojiPicker = forwardRef<HTMLDivElement>((_, ref) => {

    const dispatch = useAppDispatch()
    const pickerShown = useAppSelector(selectPickerShown)
    const mode = useAppSelector(selectMode)
    const recent = useAppSelector(selectRecent)
    const modeAll = () => dispatch(setMode("all"))
    const modeRecent = () => dispatch(setMode("recent"))

    useEffect(() => {
        dispatch(initEmojiCount(section.map(el => el.items).flat().map(el => [el, 0])))
    }, [dispatch])

    return (
        <div
            className={`emoji-container${!pickerShown ? ' hidden' : ''}`}
            ref={ref}
        >
            <div
                className={`emoji-picker`}
                style={{
                    width: DataHelper.PICKER_WIDTH
                }}
            >
                {
                    mode === "all"
                        ? section.map(el => {
                            return <EmojiSection
                                key={el.title}
                                title={el.title}
                                content={el.items}
                            />
                        })
                        : <EmojiSection title="Недавние" content={recent} />
                }
            </div>
            <div className={`emoji-last ${mode}`}>
                <Smile
                    className="smile-last"
                    onClick={modeAll}
                />
                <Recent
                    className="recent-last"
                    onClick={modeRecent}
                />
            </div>
        </div>
    )
})
