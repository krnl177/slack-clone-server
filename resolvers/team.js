module.exports = {
    Mutation: {
        createTeam: async (parent, args, { models, user }) => {
            try {
                await models.Team.create({ ...args, owner: user.id })
                return true
            } catch (error) {
                console.log('errr', error);
                return false
            }
        }
    }
}