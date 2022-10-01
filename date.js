const moment = require('moment')
const random = require('random')
const process = require('process')

// n wont be used
//[operator][number][time period]  [number of commits] 	
//+1M 50

const [range, commit] = process.argv.slice(2)

const date = n => {
    let [operator, number, period] = n.split('')
    
    operator = operator === '+' ? 'add' : 'subtract'
    period = period === 'M' ? 'M' : 'y'
    number = Number(number)
    const weeks = period === 'M' ? 4*number : 52
    console.log({operator}, {number}, {period}, {weeks})

    const x = random.int(0, weeks)
    const y = random.int(0, 6)
    let DATE = moment()
        .add(number, period).add(1, 'd')
        .add(x, 'w').add(y, 'd').format()

    const today = new Date(DATE);
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    console.log(mm, dd, yyyy)
}

date(range)