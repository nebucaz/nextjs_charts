import dbConnect from "../../../utils/dbConect"
import Item from '../../../models/Item'

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req

    await dbConnect()

    var item = null;

    switch (method) {
        
        case 'GET':
            // Get data from your database
            item = await Item.findById(id).lean()
            item._id = item._id.toString()
            res.status(200).json({ error: false, item })
            break
        case 'PUT':
            // Update or create data in your database
            item = await Item.findByIdAndUpdate(id, req.body);
            
            res.status(202).json({ error: false, item })
            //res.status(200).json({ id, name: `Item ${id}` })
            break
        case 'DELETE':
            item = await Item.findByIdAndDelete(id);
            res.status(202).json({ error: false, item })
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}