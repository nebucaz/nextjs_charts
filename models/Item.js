// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    type: String,
    uri: String,
    embed_uri: String,
    category: String, 
    topic: String,
    author: String,
    rating: Number
}, { timestamps: true });

// itemSchema.add({category: 'string', type: 'string', uri: 'string'});
export default mongoose.models.Item || mongoose.model('Item', itemSchema);

/*
module.exports = mongoose => {
    const Item = mongoose.model(
      "item",
      mongoose.Schema(
        {
            name: String,
            description: String,
            type: String,
            uri: String,
            embed_uri: String,
            category: String, 
            topic: String,
            author: String,
            rating: Number
        },
        { timestamps: true }
      )
    );
  
    return Item;
  };

*/

/*
category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
},
topics: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic"
    }
]*/