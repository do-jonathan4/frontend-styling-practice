const moment = require('moment')
const random = require('random')

const date = n => {
    let [operator, number, period] = n.split('')
    
    operator = operator === '+' ? 'add' : 'subtract'
    period = period.toUpperCase() === 'M' ? 'M' : 'y'
    number = Number(number)
    const weeks = period === 'M' ? 4*number : 52

    const x = random.int(0, weeks)
    const y = random.int(0, 6)
    return moment()
        [operator](number, period).add(1, 'd')
        .add(x, 'w').add(y, 'd').format()
}

module.exports = date