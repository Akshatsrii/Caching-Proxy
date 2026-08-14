import express from "express"
import cors from "cors"
import { proxyHandler } from "./proxy.js"
import { clearCache } from "./cache.js"

export const startServer = (port, origin) => {
  const app = express()

  // Expose X-Cache header so the frontend can read it
  app.use(cors({ exposedHeaders: ["X-Cache"] }))

  // Endpoint to allow CLI to clear cache
  app.post("/clear-cache", (req, res) => {
    clearCache()
    res.send({ message: "Cache cleared" })
  })

  app.use("/", proxyHandler(origin))

  app.listen(port, () => {
    console.log(`Proxy running on port ${port}`)
  })
}
