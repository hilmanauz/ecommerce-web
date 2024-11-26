const directionKey = new Set([
    'Enter',
    'Tab',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Backspace',
])

export const handlePreventAlphabet = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const re = /[0-9]+/g
    if (!re.test(event.key) && !directionKey.has(event.key)) {
        event.preventDefault()
    }
}
