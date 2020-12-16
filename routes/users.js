// modules.exports = {


// function createUser(request, response) {
//     database('users')
//         .insert({
//             name: request.body.name,
//             email: request.body.email,
//             driversLicense: request.body.driversLicense,
//             licensePlate: request.body.licensePlate,
//             password: request.body.password,
//             approved: request.body.approved
//         })
//         .returning(['id', 'name', 'email'])
//         .then(users => response.json(users[0]))
// }

// }