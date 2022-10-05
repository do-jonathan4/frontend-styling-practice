const process = require('process')
const fs = require('fs')
const simpleGit = require('simple-git')
const CSS_PATH = './css/styles.css'
const colorChanger = require('./color-changer')
const date = require('./date')
let skipDays = 0

const [range, commits] = process.argv.slice(2)

const makeCommit = n => {
    if (n === 0) return simpleGit().push()

    const DATE = date(range)
    const [data, comment] = colorChanger()

    // weekend check
    const weekend = new Date(DATE)
    if(weekend.getDay() === 6 || weekend.getDay() === 0) {
        skipDays++
        makeCommit(n)
    } else {
        fs.writeFile(CSS_PATH, data, () => {
            simpleGit().add([CSS_PATH]).commit(comment, {'--date': DATE},
            makeCommit.bind(this, --n))
        })
    }    
}

const dev = () => {
    makeCommit(commits)
    console.log(`submitted ${commits} commits`)
    console.log(`ignored ${skipDays} weekends`)
}

dev()

