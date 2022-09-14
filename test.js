const fs = require('fs')
const data = `body {
    background-color: lightblue;
  }`
const hello = () => {
    fs.writeFile('styles.css', data, () => {
        console.log(hello)
    })
}
hello()