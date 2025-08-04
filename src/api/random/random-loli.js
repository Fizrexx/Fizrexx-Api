import axios from "axios"

export default (app) => {
  async function loli() {
    try {
      const { data } = await axios.get(
        `https://ryuu-endss-api.vercel.app/random/cosplay-ba`,
      )
      const response = await axios.get(data[Math.floor(data.length * Math.random())], { responseType: "arraybuffer" })
      return Buffer.from(response.data)
    } catch (error) {
      throw error
    }
  }

  app.get("/random/cosplay-ba", async (req, res) => {
    try {
      const imageBuffer = await loli()
      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": imageBuffer.length,
      })
      res.end(imageBuffer)
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error.message || "Failed to fetch Blue Archive image",
      })
    }
  })
    }
