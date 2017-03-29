import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;

  new SimpleSchema({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    }).validate({ email });

  return true;
});

//Exercise:
// const employeeSchema = new SimpleSchema({
//   name: {
//     type: String,
//     min: 1,
//     max:200
//   },
//   hourlyWage: {
//     type: Number,
//     min: 0
//   },
//   email: {
//     type: String,
//     regEx: SimpleSchema.RegEx.Email
//   }
// });
//
// employeeSchema.validate({
//   name: 'herry',
//   hourlyWage: 899,
//   email: 'asdflkj@asdlfj'
// })
