module.exports = {
    Mutation: {
        createChannel: async(parent, args, {models}) => {
            try {
                await models.Channel.create(args)
                return true;
            } catch (error) {
                console.log('errr', error);
                return false;
            }
        }
    }
}