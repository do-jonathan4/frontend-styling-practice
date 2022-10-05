const colorChanger = () => {
    const hex = Math.floor(Math.random()*16777215).toString(16)
    const randomColor = hex === 000000 ? 'F8F8FF' : hex
    const comment = `changed bg color to #${randomColor}`
    const data = `body {
        background-color: #${randomColor};
    }`
    return [data, comment]
}

module.exports = colorChanger