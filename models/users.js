const mongoose  = require('mongoose');
const bcrypt    = require('bcryptjs');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    path_to_national_card_image: {
        type: String
    },
    phone_number: {
        type: String        
    },
    landline_phone_number: {
        type: String
    }
});

UsersSchema.pre('save', function makeHash(next) {
    let user = this;
    if (!user.isModified('password')) return next();

    if (user.password) {
        let salt = bcrypt.genSaltSync(5);
        user.password = bcrypt.hashSync(user.password, salt);
        next();
    }
})

UsersSchema.methods.comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = mongoose.model('Users', UsersSchema);