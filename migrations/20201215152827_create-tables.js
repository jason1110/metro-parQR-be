
exports.up = async knex => {
    await knex.schema.createTable('users', (table) => {
        table.increments()
        table.string('name')
        table.string('email')
        table.string('driversLicense')
        table.string('licensePlate')
        table.string('password')
        table.boolean('approved')
    })
    await knex.schema.createTable('meters', (table) => {
        table.increments()
        table.string('maxStay')
        table.string('type')
        table.integer('cost')
        table.boolean('inUse')
        table.string('latlng'),
        table.string('freeTime')
    })
    await knex.schema.createTable('parkingSessions', (table) => {
        table.integer("user_id").references("id").inTable("users")
        table.integer("meter_id").references("id").inTable("meters")
    })
    await knex.schema.createTable('administrators', (table) => {
        table.increments()
        table.string('name')
        table.string('email')
        table.string('password')
        table.boolean('isAdmin')
    })
    await knex.schema.createTable('stateInfo', (table) => {
        table.increments()
        table.string('name')
        table.string('driversLicense')
        table.string('licensePlate')
        table.boolean('registered')
    })
};

exports.down = async knex => {
    await knex.schema.dropTableIfExists('stateInfo')
    await knex.schema.dropTableIfExists('administrators')
    await knex.schema.dropTableIfExists('parkingSessions')
    await knex.schema.dropTableIfExists('meters')
    await knex.schema.dropTableIfExists('users')
};
