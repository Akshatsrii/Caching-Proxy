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
    const response = await axios.get(origin + req.originalUrl, {
      validateStatus: () => true // Prevent axios from throwing on non-2xx status codes
    })

    setCache(cacheKey, {
      status: response.status,
      data: response.data
    })

    res.set("X-Cache", "MISS")
    res.status(response.status).send(response.data)
  } catch (error) {
    res.status(500).send("Proxy Error: " + error.message)
  }
}
