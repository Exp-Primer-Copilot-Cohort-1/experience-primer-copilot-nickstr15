// Create web server with express
// Load modules
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const path = require('path')

// Load modules
const comments = require('./comments.js')

// Use body parser
app.use(bodyParser.urlencoded({ extended: true }))

// Set view engine
app.set('view engine', 'ejs')

// Set view folder
app.set('views', path.join(__dirname, 'views'))

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Render index page
app.get('/', (req, res) => {
  res.render('index', { comments: comments })
})

// Render new page
app.get('/new', (req, res) => {
  res.render('new')
})

// Create new comment
app.post('/new', (req, res) => {
  const newComment = {
    id: comments.length + 1,
    name: req.body.name,
    content: req.body.content
  }
  comments.push(newComment)
  res.redirect('/')
})

// Render edit page
app.get('/:id/edit', (req, res) => {
  const comment = comments.find(comment => comment.id.toString() === req.params.id)
  res.render('edit', { comment: comment })
})

// Edit comment
app.post('/:id/edit', (req, res) => {
  const comment = comments.find(comment => comment.id.toString() === req.params.id)
  comment.name = req.body.name
  comment.content = req.body.content
  res.redirect('/')
})

// Delete comment
app.post('/:id/delete', (req, res) => {
  const index = comments.findIndex(comment => comment.id.toString() === req.params.id)
  comments.splice(index, 1)
  res.redirect('/')
})

// Listen server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
