const mongoose = require('mongoose')

// Mongoose Model
// Custom Model
// https://next-auth.js.org/tutorials/typeorm-custom-models
import Adapters from "next-auth/adapters"

// Extend the built-in models using class inheritance
export default class User extends Adapters.TypeORM.Models.User.model {
    // You can extend the options in a model but you should not remove the base
    // properties or change the order of the built-in options on the constructor
    constructor(name, email, image, emailVerified) {
      super(name, email, image, emailVerified)
    }
  }

export const UserSchema = {
    name: "User",
    target: User,
    columns: {
      ...Adapters.TypeORM.Models.User.schema.columns,
      // Adds a phoneNumber to the User schema
      phoneNumber: {
        type: "varchar",
        nullable: true,
      },
      roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
        ]
    },
  }

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

// itemSchema.add({category: 'string', type: 'string', uri: 'string'});
// export default mongoose.models.User || mongoose.model('User', userSchema);