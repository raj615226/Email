const token = require('../lib/token')
function init(app) {
 app.post('/email',token.post)

 app.get('/', (req, res) => {
    res.send('Vblock API Service V1')
  })
}
module.exports = init;