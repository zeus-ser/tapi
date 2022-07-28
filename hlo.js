__path = process.cwd()

var express = require('express');
var router = express.Router();

const { default: makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys')
const { state, saveState } = useSingleFileAuthState('./sessions.json')
const QRCode = require('qrcode')
const util = require('util')
const pino = require('pino')

     let ZimBotInc = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: state,
		browser: ['ZIM BOT JADI']
})

ZimBotInc.ev.on('connection.update', async (update) => {
		const { connection, qr } = update
		if (qr !== undefined) {
			let res = await QRCode.toDataURL(qr, { scale: 8 })
			let scan = await conn.sendFile(m.key.remoteJid, res, '', 'Scan bang...', m)
			setTimeout(() => {
				conn.sendMessage(m.key.remoteJid, { delete: { remoteJid: m.key.remoteJid, fromMe: true, id: scan.key.id, participant: conn.user.jid }})
			}, 30000)
			if (connection === 'open') {
				conn.reply(m.key.remoteJid, 'Success\n' + util.format(ZimBotInc.user), m)
			}
		}
	})

router.get('/qr', async(req, res) => {
       QRCode.toDataURL(qmr, { scale: 8 }).then(url => {
               res.send(`
               <h2>Alexa Qr</h2>
               <div><img src='${url}'/></div>
             `)
})
});

module.exports = router
