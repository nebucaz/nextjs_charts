import dbConnect from "../../../utils/dbConect"
const Item = require("../../../models/Item");

export default async function handler(req, res) {
    const {
      query: { id },
      method,
    } = req
  
    await dbConnect()

    switch (method) {
      case 'GET':
        // Get data from your database
        res.status(200).json({ id, name: `Item ${id}` })
        break
      case 'PUT':
        // Update or create data in your database
        res.status(200).json({ id, name: `Item ${id}` })
        break
      default:
        res.setHeader('Allow', ['GET', 'PUT'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }