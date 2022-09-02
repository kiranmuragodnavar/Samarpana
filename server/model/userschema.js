const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        deafult: Date.now
    },
    messages: [
        {
            name: {
                type: String,
                required: true
            },
            phone: {
                type: Number,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ],
    tokens:
        [
            {
                token:
                {
                    type: String,
                    required: true
                }
            }
        ]

})

userschema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 12);
    }
    next();
});

userschema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    }
    catch (err) {
        console.log(err);
    }
}

userschema.methods.addmessage = async function (name, email, phone,type, description) {
    try {
        this.messages = this.messages.concat({ name, email,phone, type, description })
        await this.save();
        return this.messages;
    }
    catch (err) {
        console.log(err)
    }
}


const User = mongoose.model('USER', userschema);

module.exports = User;