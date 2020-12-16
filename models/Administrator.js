const { Model } = require('objection')


class Administrator extends Model {
    static tableName = 'administrators'
}

module.exports = Administrator