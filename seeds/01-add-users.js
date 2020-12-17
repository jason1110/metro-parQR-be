
exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('meters').del()
      // Inserts seed entries
  await knex('users').insert([
    {
      name: 'Jason Easterly',
      email: 'fake123@gmail.com',
      driversLicense: '112345Q',
      licensePlate: '555 - owl',
      password: 'password',
      approved: true
    },
    {
      name: 'James H',
      email: 'veryfake7893@gmail.com',
      driversLicense: '4567ITR',
      licensePlate: '111-111',
      password: 'secret',
      approved: false
    }
  ]);
  await knex('meters').insert([
    {
      maxStay: '3',
      type: 'h3',
      cost: 1.00,
      inUse: false,
      latlng: '-.188050',
      freeTime: 'M-S 8 p.m - 6 a.m holidays and Sundays'
    },
    {
      maxStay: '2',
      type: 'h2',
      cost: 1.00,
      inUse: false,
      latlng: 'wtf',
      freeTime: 'M-S 10 p.m - 6 a.m holidays and Sundays'
    }
  ]);
};
