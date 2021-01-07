const { Model } = require('objection')
const Meter = require('./Meter')


class User extends Model {
    static tableName = 'users'
    static relationMappings = {
        meters: { 
            relation: Model.HasOneThroughRelation,
            modelClass: Meter,
            join: {
                from: "users.id",
                through: {
                    from: "parkingSessions.user_id",
                    to: "parkingSessions.meter_id",
                },
                to: "meters.id",
            }
        } 
    }
}

module.exports = User