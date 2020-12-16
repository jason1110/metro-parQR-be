const { Model } = require('objection')
const Meter = require('./Meter')


class User extends Model {
    static tableName = 'users'
    static relationMappings = {
        products: {
            relation: Model.ManyToManyRelation,
            modelClass: Meter,
            join: {
                from: "user.id",
                through: {
                    from: "parkingSession.user_id",
                    to: "parkingSession.meter_id",
                },
                to: "meter.id",
            }
        }
    }
}

module.exports = User