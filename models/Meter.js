const { Model } = require('objection')


class Meter extends Model {
    static tableName = 'meters'
}

module.exports = Meter