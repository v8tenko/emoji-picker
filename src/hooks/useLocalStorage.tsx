import {useState} from "react"

function useLocalStorage<ValueType>(key: string, initialValue: ValueType)
    : [ValueType, (value: ValueType) => void] {
    const [storedValue, setStoredValue] = useState<ValueType>(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(error)
            return initialValue
        }
    })
    const setValue = (value: ValueType) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
        } catch (error) {
            console.log(error)
        }
    }
    return [storedValue, setValue]
}

export default useLocalStorage
