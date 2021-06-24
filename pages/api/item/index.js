// Fake users data
/*const items = [
    { id: 1, name: "A Book" }, 
    { id: 2, name: "B Book" }, 
    { id: 3, name: "C Book" }]
*/
//const db = require("../../models")
//const Item = db.item;
import dbConnect from "../../../utils/dbConect"
import Item from '../../../models/Item'

export default async function handler(req, res) {
    const { method } = req
    
    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const items = await Item.find({}) /* find all the data in our database */
                //res.status(200).json({ success: true, data: items })
                res.status(200).json(items)
            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const pet = await Pet.create(
                    req.body
                ) /* create a new model in the database */
                res.status(201).json({ success: true, data: pet })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }

    // Get data from your database
    /*
    let query = {};
    if ('c' in req.query) {
        query = { category: req.query.c }
    }
    */
}