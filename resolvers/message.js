
module.exports = {
    Mutation: {
        createMessage: async (parent, args, { models, user }) => {
            try {
                await models.Message.create({ ...args, userId: user.id })
                return true;
            } catch (error) {
                console.log('errr', error);
                return false;
            }
        }
    }
}