#!/usr/bin/env node

import { Command } from "commander"
import { startServer } from "./app.js"

const program = new Command()

program
  .option("--port <number>")
  .option("--origin <url>")
  .option("--clear-cache")

program.parse(process.argv)
const options = program.opts()

if (options.clearCache) {
  const port = options.port || 3000
  try {
    const res = await fetch(`http://localhost:${port}/clear-cache`, { method: "POST" })
    if (res.ok) {
      console.log("Cache cleared successfully on port", port)
    } else {
      console.log(`Failed to clear cache: ${res.status} ${res.statusText}`)
    }
  } catch (err) {
    console.log(`Could not connect to proxy server on port ${port} to clear cache. Make sure it is running.`)
  }
  process.exit(0)
}

if (!options.port || !options.origin) {
  console.log("Usage: caching-proxy --port <number> --origin <url>")
  process.exit(1)
}

startServer(options.port, options.origin)
