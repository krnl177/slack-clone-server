import { ValidationError } from 'sequelize'
import _ from 'lodash'
module.exports = {
    formateErrors: (e) => {
        if (e instanceof ValidationError) {
            return e.errors.map(x => _.pick(x, ['path', 'message']))
        }
        return [{ path: 'name', message: 'Something went wrong' }]
    }
}