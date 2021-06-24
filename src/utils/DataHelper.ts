export class DataHelper {
    static EMOJI_SIZE = +process.env["REACT_APP_EMOJI_SIZE"]!
    static COUNT_IN_ROW = +process.env["REACT_APP_COUNT_IN_ROW"]!
    static PICKER_WIDTH = (DataHelper.EMOJI_SIZE + 1) * DataHelper.COUNT_IN_ROW * 2 // иконки + растояние между иконками

    static emojiCount = 0
    static idByEmojiMap = new Map<string, number>()

    static setEmojiId(query: string, id: number) {
        this.idByEmojiMap.set(query, id)
    }

    static getEmojisId(query: string): number {
        return this.idByEmojiMap.get(query) ?? -1
    }

}
