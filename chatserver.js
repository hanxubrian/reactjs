const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require("@pusher/chatkit-server")

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:e55a61d5-6a16-4a03-9ff0-5bdacd4f04ca',
  key :'8932ee13-fa97-4b3d-a3b9-c9aa621fd7fa:jkdV64btqEORxCZDjoX5Y7W/PA7QuHFyKCs0+GOCM94='
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res)=>{
  const {username} = req.body
  chatkit.createUser({
    id: username,
    name : username
  })
  .then(()=>res.sendStatus(201))
  .catch(error=>{
    if (error.error_type === 'services/chatkit/user_already_exists'){
      res.sendStatus(200)
    } else{
      res.status(error.status).json(error)
    }
  })
})

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id})
  res.status(authData.status).send(authData.body)
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})