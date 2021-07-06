import mongoose, { Model } from 'mongoose';
import { UserDoc } from '../entities/User';
const Schema = mongoose.Schema;
import * as bcrypt from 'bcrypt';
const WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: {
        required: true,
        type: String,
        index: {unique: true},
        maxLength: 20
    },
    password: {
        type: String,
        required: true,
        maxLength: 50
    }
});

UserSchema.pre<UserDoc>('save', function(next) {
    if(!this.isModified('password')) return next();
    const user: UserDoc = this;
    bcrypt.genSalt(WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        console.log(user.password);
        console.log(salt);
        // hash the password
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            return next();
        });
    });
});

UserSchema.methods.validatePassword = function (candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, (this as UserDoc).password, function (err, isMatch) {
            if (err) return reject(err);
            resolve(isMatch);
        });
    });
};

const User: Model<UserDoc> = mongoose.model<UserDoc>('User', UserSchema);

export { User };