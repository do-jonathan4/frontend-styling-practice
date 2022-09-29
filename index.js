const colorChanger = require('./color-changer')
const moment = require('moment')
const simpleGit = require('simple-git')
const random = require('random')
const CSS_PATH = './css/styles.css'
const fs = require('fs')
let skipDays = 0

const makeCommit = n => {
    if (n === 0) return simpleGit().push()

    //52 for years 4x for months
    const x = random.int(0, 52)
    const y = random.int(0, 6)
    let DATE = moment()
        .subtract(1, 'y').add(1, 'd')
        // .subtract(2, 'M').add(1, 'd')
        .add(x, 'w').add(y, 'd').format()
    const data = colorChanger()

    // weekend check
    const weekend = new Date(DATE)
    if(weekend.getDay() == 6 || weekend.getDay() == 0) {
        skipDays++
        makeCommit(n)
    } else {
        fs.writeFile(CSS_PATH, data, () => {
            simpleGit().add([CSS_PATH]).commit(DATE, {'--date': DATE},
            makeCommit.bind(this, --n))
        })
    }    
}

const dev = (n) => {
    makeCommit(n)
    console.log(`submitted ${n} commits`)
    console.log(`ignored ${skipDays} weekends`)
}

dev(5)

