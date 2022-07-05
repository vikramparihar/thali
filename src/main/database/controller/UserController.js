const connection = require('../dbConnection');

const UserSchema = connection.getModels().UserSchema;

class UserController {
  constructor() {}

  async getUsers() {
    try {
      let rs = await UserSchema.count();
      return { count: rs };
    } catch (error) {
      console.log(error);
      return {
        error: 'Sorry something went wrong',
      };
    }
  }

  async userRegister(args) {
    try {
      const { username, password } = args;
      let user = await UserSchema.create({
        userName: username,
        Password: password,
      });
      return { status: 'ok', user: user };
    } catch (error) {
      console.log(error);
      return { status: 'failed', error: error };
    }
  }
  async isUserExists(args) {
    try {
      let username =
        typeof args.username != undefined &&
        args.username.toString().trim().length > 0
          ? args.username.toString().trim()
          : null;
      let password =
        args.password != undefined && args.password.toString().trim().length > 0
          ? args.password.toString().trim()
          : null;
      if (username && password) {
        let rs = await UserSchema.count({
          where: {
            userName: username,
            Password: password,
          },
        });
        return { count: rs };
      } else {
        return {
          error: 'Invalid Username.',
        };
      }
    } catch (error) {
      console.log(error);
      return {
        error: 'Sorry something went wrong',
      };
    }
  }
}

module.exports = new UserController();
