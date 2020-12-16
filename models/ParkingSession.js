const { Model } = require('objection')


class ParkingSession extends Model {
    static tableName = 'parkingSessions'
}

module.exports = ParkingSession