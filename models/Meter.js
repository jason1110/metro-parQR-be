const { Model } = require('objection')
const User = require('./User')


class Meter extends Model {
    static tableName = 'meters'
}

module.exports = Meter