// module.exports = function(app) {
//   var User = app.models.user;
//   var Role = app.models.Role;
//   var RoleMapping = app.models.RoleMapping;

//   User.create([
//         {username: 'admin', email: 'admin@admin.com', password: 'origin123'},
//         {username: 'candidate', email: 'candidate@candidate.com', password: 'origin123'},
//         {username: 'employer', email: 'employer@employer.com', password: 'origin123'},
//   ], function(err, users) {
//     if (err) {
//       throw err;
//     } else {
//       console.log('Created users:', users);
//     }
//     Role.create([
//             {name: 'admin'},
//             {name: 'candidate'},
//             {name: 'employer'},
//     ], function(err, role) {
//       if (err) {
//         throw err;
//       } else {
//         console.log('Created role:', role);
//       }
//       role[0].principals.create({
//         principalType: RoleMapping.USER,
//         principalId: users[0].id,
//       }, function(err, principal) {
//         if (err) {
//           throw err;
//         } else {
//           console.log('Created principal:', principal);
//         }
//       });
//       role[1].principals.create({
//         principalType: RoleMapping.USER,
//         principalId: users[1].id,
//       }, function(err, principal) {
//         if (err) {
//           throw err;
//         } else {
//           console.log('Created principal:', principal);
//         }
//       });
//       role[2].principals.create({
//         principalType: RoleMapping.USER,
//         principalId: users[2].id,
//       }, function(err, principal) {
//         if (err) {
//           throw err;
//         } else {
//           console.log('Created principal:', principal);
//         }
//       });
//     });
//   });
// };
