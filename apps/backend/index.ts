import app from './core/app'

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server fuck is running on http://localhost:${PORT}`)
})
