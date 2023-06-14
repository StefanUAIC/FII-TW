const {StringDecoder} = require('string_decoder');
const jwt = require('jsonwebtoken');
const config = require("../config/config").config;


const hardcodedUser = {
   // username: 'test@yahoo.com', password: 'password', role: 'Elev'
    username: 'test2@yahoo.com', password: 'password', role: 'Profesor'
};

const secretKey = config.SECRET_KEY;
const authenticationController = (req, res) => {
    const url = req.url;
    const method = req.method.toLowerCase();

    const splitUrl = url.split('/').filter(Boolean);

    const endpoint = splitUrl[2];

    if (method === 'post') {
        if (endpoint === 'logout') {
            res.setHeader('Set-Cookie', [
                `token=; Max-Age=0; Path=/; HttpOnly;`,
                `role=; Max-Age=0; Path=/;`,
            ]);
            console.log('Logged out successfully');
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Logged out successfully'}));
            return;
        }

        const decoder = new StringDecoder('utf-8');
        let buffer = '';

        req.on('data', (data) => {
            buffer += decoder.write(data);
        });

        req.on('end', () => {
            buffer += decoder.end();
            const parsedData = JSON.parse(buffer);
            if (endpoint === 'login') {
                if (parsedData.username === hardcodedUser.username && parsedData.password === hardcodedUser.password) {
                    let token = jwt.sign({
                        username: parsedData.username,
                        role: hardcodedUser.role
                    }, secretKey, {expiresIn: '1h'});
                    res.setHeader('Set-Cookie', [
                        `token=${token}; Path=/; HttpOnly`,
                        `role=${hardcodedUser.role}; Path=/`,
                        'mancare_preferata=papanasi; Path=/'
                    ]);
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: 'Logged in successfully'}));
                } else {
                    res.writeHead(401, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: 'Incorrect username or password'}));
                }
            } else if (endpoint === 'register') {
                const {name, firstName, email, username, password, accountType} = parsedData;

                if (!name || !firstName || !email || !username || !password || !accountType) {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: 'Please fill all fields'}));
                    return;
                }

                const emailRegEx = /\S+@\S+\.\S+/;
                if (!emailRegEx.test(email)) {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: 'Please provide a valid email'}));
                    return;
                }

                const passwordRegEx = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,30}$/;
                if (!passwordRegEx.test(password)) {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: 'Password must have at least one special character, one digit, one uppercase letter, and be between 3 to 30 characters long'}));
                    return;
                }

                const usernameRegEx = /^[a-zA-Z0-9]{3,20}$/;
                if (!usernameRegEx.test(username)) {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: 'Username must be between 3 to 20 characters long and can only contain letters and digits'}));
                    return;
                }

                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({message: 'Registration successful', data: parsedData}));
            } else {
                res.writeHead(404);
                res.end('Not found');
            }
        });
    }
}

module.exports = {
    authenticationController
}
