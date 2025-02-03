import { Types } from 'mongoose'

export default (id) => { return Types.ObjectId.isValid(id) }