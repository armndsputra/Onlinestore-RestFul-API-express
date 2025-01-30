import mongoose from 'mongoose'

const URL = 'mongodb+srv://armndsputra:'+process.env.DB_KEY+'@cluster0-restfull-api.gmcfp.mongodb.net/'+process.env.DB_NAME+'?retryWrites=true&w=majority&appName=Cluster0-restfull-api'

export default mongoose.connect(URL).then((database) => {
    console.info('Connected database success')
    // console.info(database)
}).catch(err => { console.error(err); console.info('database connection failed !') })