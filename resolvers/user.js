import bcrypt from 'bcrypt';
import { Constants } from '../helpers/constant'
import { formateErrors } from '../helpers/utils';
module.exports = {
    Query: {
        getUser: (parent, { id }, { models}) => models.User.findOne({ where: { id } }),
        allUsers: (parent, args, { models }) => models.User.findAll()
    },
    Mutation: {
        register: async (parent, args, { models }) => {
            try {
                const { username, password, email } = args;
                const hashPassword = await bcrypt.hash(password, Constants.SALT_ROUNDS)
                const user = await models.User.create({
                    username, email,
                    password: hashPassword
                })
                return {
                    ok: true,
                    user
                }
            } catch (error) {
                const errorRes = formateErrors(error)
                console.log('error======',errorRes);
                return {
                    ok: false,
                    error: errorRes
                };
            }
        }
    }
}
