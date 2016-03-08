'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'OJ092eLISAD9ed';

var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    roles: {
        type: Array,
        default: ['user']
    }
});

function encrypt(text){
  var pass = new Buffer(text, 'utf8');
  var cipher = crypto.createCipher(algorithm,password);
  var crypted = cipher.update(pass,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}

UserSchema.pre('save', function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        user.password = encrypt(user.password);
        //TODO usar lib bcryptjs para criptografar senha 
    }
    next();
});

UserSchema.methods.comparePassword = function(passwd, callback) {
    //TODO implementar o bcrypt.compare
    if (passwd == decrypt(this.password)) {
        callback(true);
    } else {
        callback(false); 
    }
};

module.exports = mongoose.model('User', UserSchema);