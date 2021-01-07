const { Model } = require('objection')


class ParkingSession extends Model {
    static tableName = 'parkingSessions'
    $beforeInsert() {
        this.created_at = new Date().toISOString();
    }
    
    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }

    
}

module.exports = ParkingSession