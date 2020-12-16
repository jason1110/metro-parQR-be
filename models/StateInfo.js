const { Model } = require('objection')


class StateInfo extends Model {
    static tableName = 'stateInfo'
}

module.exports = StateInfo