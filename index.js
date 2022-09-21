const jsonfile = require('jsonfile')
const colorChanger = require('./color-changer')
const moment = require('moment')
const simpleGit = require('simple-git')
const random = require('random')
const FILE_PATH = './data.json'
const CSS_PATH = './styles.css'
const fs = require('fs')
let skipDays = 0

const makeCommit = n => {
    if (n === 0) return simpleGit().push()

    //52 for years 4x for months
    const x = random.int(0, 52)
    const y = random.int(0, 6)
    let DATE = moment()
        // one year back; possible to cross out
        .subtract(1, 'y').add(1, 'd')
        // .subtract(2, 'M').add(1, 'd')
        // change x only
        .add(x, 'w').add(y, 'd').format()
    const data = {
        date: DATE
    }
    const colorData = colorChanger()

    // weekend check
    const weekend = new Date(DATE)
    if(weekend.getDay() == 6 || weekend.getDay() == 0) {
        skipDays++
        DATE = null
    }
    fs.writeFile(CSS_PATH, colorData, () => {
        simpleGit().add([CSS_PATH]).commit(DATE, {'--date': DATE},
        makeCommit.bind(this, --n))
    })

    // edits files repeatedly; ignore
    // jsonfile.writeFile(FILE_PATH, data, () => {
    //     simpleGit().add([FILE_PATH]).commit(DATE, {'--date': DATE},
    //     makeCommit.bind(this, --n))
    // })
    
}

const com = (n) => {
    makeCommit(n)
    console.log(`submitted ${n} commits`)
    console.log(`ignored ${skipDays} weekends`)
}

com(5)

