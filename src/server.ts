import * as BodyParser from 'body-parser'
import * as CookieParser from 'cookie-parser'
import * as Express from 'express'
import * as Path from 'path'
import * as Cors from 'cors'
import * as Util from 'util'
import * as UUID from 'uuid'

import * as Routes from './routes'
import * as Database from './lib/Database'
import * as Helpers from './utils/helpers'
import * as Mailgun from './lib/Mailgun'

const config = require(Path.resolve(__dirname, '../config', process.env.NODE_ENV || 'development'))

export default async function () {
  try {
		initializeExpressRoutes(config)

  } catch (error) {
    console.log('Failed to load application configuration! ', error)
    throw error
  }
}

function initializeExpressRoutes (config: Config.Application) {
	const app = Express()

	app.use(Cors({
    origin: config.cors.allowedOrigins,
    credentials: true
	}))

	app.use(BodyParser.urlencoded({ extended: true }))
  app.use(BodyParser.json())
  app.use(CookieParser())
	app.disable('x-powered-by')

	app.get('/ping', Routes.ping)
  app.get('/uuid', Routes.testUUID)

	// Add a catchall handler, for 404
	app.all('*', (req, res) => {
    return res.sendStatus(404)
  })

	app.listen(config.app.port, config.app.host, (err) => {
		if (err) {
			throw err
    }
    
		console.log(`Server listening on ${config.app.host}:${config.app.port}\n`)
	})
}

process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
	// application specific logging, throwing an error, or other logic here
})
