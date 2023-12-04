import dotenv from 'dotenv'
import next from 'next'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import express from 'express'

import { getPayloadClient } from './payloadClient'

const app = express()
const PORT = process.env.PORT || 3000

const start = async (): Promise<void> => {
  const payload = await getPayloadClient()

  const nextApp = next({
    dev: true,
    dir: path.resolve(__dirname, '..'),
  })

  const nextHandler = nextApp.getRequestHandler()

  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    payload.logger.info('Next.js started')

    app.listen(PORT, async () => {
      payload.logger.info(`Next.js App URL: ${process.env.PAYLOAD_PUBLIC_CMS_URL}`)
    })
  })
}

start()
