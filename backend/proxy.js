import axios from "axios"
import { getCache, setCache } from "./cache.js"

export const proxyHandler = (origin) => async (req, res) => {
  const cacheKey = req.originalUrl
  const cached = getCache(cacheKey)

  if (cached) {
    res.set("X-Cache", "HIT")
    return res.status(cached.status).send(cached.data)
  }

  try {
    const response = await axios.get(origin + req.originalUrl)

    setCache(cacheKey, {
      status: response.status,
      data: response.data
    })

    res.set("X-Cache", "MISS")
    res.status(response.status).send(response.data)
  } catch {
    res.status(500).send("Proxy Error")
  }
}
