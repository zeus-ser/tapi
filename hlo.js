__path = process.cwd()

var express = require('express');
var router = express.Router();

const QRCode = require('qrcode')

router.get('/mdqr', async(req, res) => {
       QRCode.toDataURL("Hi Guys", { scale: 8 }).then(url => {
               res.send(`
               <h2>Alexa Qr</h2>
               <div><img src='${url}'/></div>
             `)
})
});

module.exports = router
