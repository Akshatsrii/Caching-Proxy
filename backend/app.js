import express from "express"
import cors from "cors"
import { proxyHandler } from "./proxy.js"

export const startServer = (port, origin) => {
  const app = express()

  app.use(cors())
  app.use("/", proxyHandler(origin))

  app.listen(port, () => {
    console.log(`Proxy running on port ${port}`)
  })
}
