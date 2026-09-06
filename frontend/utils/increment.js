export default function increment(type, display, setDisplay, array) {
    if (type === 'add') {
        setDisplay((display + 1) % array.length)
    } else if (type === 'substract') {
        setDisplay((display - 1 + array.length) % array.length)
    }
}