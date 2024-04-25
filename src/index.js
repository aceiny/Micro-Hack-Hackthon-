const jwt = require('jsonwebtoken');
const secretKey = 'Aceiny631@@.';

function createJwtToken(payload){
    const token = jwt.sign(payload, secretKey);
    return token;
}

// Example usage
const user = {
    id: 123,
    username: 'john_doe',
    role: 'admin'
};

const token = createJwtToken(user);
console.log('JWT Token:', token);