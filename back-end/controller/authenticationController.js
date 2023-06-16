const {StringDecoder} = require('string_decoder');
const jwt = require('jsonwebtoken');
const config = require("../config/config").config;

const UserRepository = require('../repository/user.repository');
const {NotFoundException} = require("../exception/database.exception");
const {comparePasswords} = require("../util/hashpassword.util");

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
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Logged out successfully'}));
            return;
        }

        const decoder = new StringDecoder('utf-8');
        let buffer = '';

        req.on('data', (data) => {
            buffer += decoder.write(data);
        });

        req.on('end', async () => {
            buffer += decoder.end();
            const parsedData = JSON.parse(buffer);
            if (endpoint === 'login') {
                let user = false;
                try {
                    user = await UserRepository.getUser({email: parsedData.email});
                } catch (error) {
                    if (!(error instanceof NotFoundException)) {
                        console.error(error);
                        res.writeHead(500, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({message: 'Server error'}));
                        return;
                    }
                }
                if (!user || await comparePasswords(parsedData.password, user.password) === false) {
                    res.writeHead(401, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: 'Incorrect username or password'}));
                    return;
                }

                let token = jwt.sign({
                    email: parsedData.email,
                    role: user.role
                }, secretKey, {expiresIn: '1h'});

                res.setHeader('Set-Cookie', [
                    `token=${token}; Path=/; HttpOnly`,
                    'mancare_preferata=papanasi; Path=/'
                ]);

                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({message: 'Logged in successfully'}));
            } else if (endpoint === 'register') {
                const {name, firstName, email, username, password, role} = parsedData;
                if (!name || !firstName || !email || !username || !password || !role) {
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

                const passwordRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$&*])(?=.*[0-9]).{8,30}$/;
                if (!passwordRegEx.test(password)) {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: 'Password must have at least one special character, one digit, one uppercase letter, one lowercase letter, and be between 3 to 30 characters long'}));
                    return;
                }

                const usernameRegEx = /^[a-zA-Z0-9]{3,20}$/;
                if (!usernameRegEx.test(username)) {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: 'Username must be between 3 to 20 characters long and can only contain letters and digits'}));
                    return;
                }
                let existingUser = false;
                try {
                    existingUser = await UserRepository.getUser({$or: [{username}, {email}]});
                } catch (e) {
                    if (!(e instanceof NotFoundException)) {
                        console.error(e);
                        res.writeHead(500, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({message: 'Something went wrong'}));
                        return;
                    }
                }
                if (existingUser) {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: 'User with this username or email already exists'}));
                    return;
                }

                const user = {
                    lastName: name,
                    firstName: firstName,
                    email: email,
                    username: username,
                    password: password,
                    role: role
                };

                const createdUser = await UserRepository.createUser(user);

                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({message: 'Registration successful', data: createdUser}));
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
