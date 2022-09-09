const jsonfile = require('jsonfile')
const moment = require('moment')
const simpleGit = require('simple-git')
const random = require('random')
const FILE_PATH = './data.json'
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

    // weekend check
    const weekend = new Date(DATE)
    if(weekend.getDay() == 6 || weekend.getDay() == 0) {
        skipDays++
        DATE = null
    }

    // edits files repeatedly; ignore
    jsonfile.writeFile(FILE_PATH, data, () => {
        simpleGit().add([FILE_PATH]).commit(DATE, {'--date': DATE},
        makeCommit.bind(this, --n))
    })

    console.log(`submitted ${n} commits`)
}

console.log(`ignored ${skipDays} weekends`)

makeCommit(5)
