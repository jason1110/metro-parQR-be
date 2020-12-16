
exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('users').del()
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
};
