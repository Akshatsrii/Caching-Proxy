import { useState } from "react"

export default function App() {
  const [path, setPath] = useState("/products")
  const [data, setData] = useState("")
  const [cacheStatus, setCacheStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const sendRequest = async () => {
    setLoading(true)
    setData("")
    setCacheStatus(null)

    try {
      const res = await fetch("http://localhost:3000" + path)
      const json = await res.json()
      setCacheStatus(res.headers.get("X-Cache"))
      setData(JSON.stringify(json, null, 2))
    } catch {
      setData("Error fetching data")
    }

    setLoading(false)
  }

  return (
    <>
      {/* GLOBAL CSS */}
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #eff6ff, #f5f3ff, #faf5ff);
        }

        .container {
          max-width: 1100px;
          margin: auto;
          padding: 40px 20px;
        }

        .card {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
        }

        .btn {
          padding: 14px 24px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg,#2563eb,#7c3aed);
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .badge {
          display: inline-block;
          padding: 10px 18px;
          border-radius: 14px;
          font-weight: bold;
          margin-top: 20px;
        }

        .hit {
          background: #10b981;
          color: white;
          box-shadow: 0 0 30px rgba(16,185,129,0.6);
        }

        .miss {
          background: #f59e0b;
          color: white;
          box-shadow: 0 0 30px rgba(245,158,11,0.6);
        }

        pre {
          background: #0f172a;
          color: #34d399;
          padding: 20px;
          border-radius: 16px;
          overflow: auto;
          max-height: 400px;
          font-size: 13px;
        }
      `}</style>

      <div style={{ minHeight: "100vh" }}>
        <div className="container">

          {/* HEADER */}
          <h1 style={{
            textAlign: "center",
            fontSize: "48px",
            fontWeight: "800",
            marginBottom: "10px",
            background: "linear-gradient(120deg,#2563eb,#7c3aed,#ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Caching Proxy
          </h1>

          <p style={{ textAlign: "center", color: "#555", marginBottom: 40 }}>
            Visualizing Cache HIT & MISS in real time
          </p>

          {/* MAIN CARD */}
          <div className="card">

            {/* INPUT */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <input
                value={path}
                onChange={e => setPath(e.target.value)}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: 14,
                  border: "2px solid #ddd",
                  fontSize: 14
                }}
              />
              <button className="btn" onClick={sendRequest} disabled={loading}>
                {loading ? "Loading..." : "Send Request"}
              </button>
            </div>

            {/* CACHE STATUS */}
            {cacheStatus && (
              <div className={`badge ${cacheStatus === "HIT" ? "hit" : "miss"}`}>
                Cache {cacheStatus}
              </div>
            )}

            {/* RESPONSE */}
            {data && (
              <div style={{ marginTop: 30 }}>
                <h3 style={{ marginBottom: 10 }}>Response</h3>
                <pre>{data}</pre>
              </div>
            )}

            {!data && !loading && (
              <p style={{ marginTop: 30, color: "#666" }}>
                Enter an endpoint and click Send Request
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
