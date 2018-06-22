import { food } from '../Emoji/Emoji'

export const Store = {
    emojis: food.filter(Boolean),
    getRandomIndex: maxValue => Math.floor(Math.random() * maxValue),
    shuffle: array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
        }
        return array
    },
    getArrayOfDoubles(length) {
        const result = []
        for (let i = 0; i < length; i += 2) {
            const pickedValue = this.emojis.splice(this.getRandomIndex(this.emojis.length), 1)[0]
            result.push(pickedValue, pickedValue)
        }
        return this.shuffle(result)
    }
}
