const { mongoose } = require('mongoose')

const dbConnect = () => {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
  })

  mongoose.connection
    .once('open', () =>
      console.log(`Connected to MongoDB ${mongoose.connection.name}`)
    )
    .on('error', error => console.log(`Error DB: ${error}`))
}
module.exports = dbConnect
