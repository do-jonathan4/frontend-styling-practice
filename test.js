const fs = require('fs')

const hello = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16)
    // make sure to contrast text
    const data = `body {
        background-color: #${randomColor};
      }`
    fs.writeFile('styles.css', data, () => {})
}
hello()