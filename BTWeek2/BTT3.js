const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

const users = [
    {
        id: 1,
        email: 'user1@gamil.com',
        password: 'abc123',
        gender: 'male'
    },
    {
        id: 2,
        email: 'user2@gamil.com',
        password: 'abc1232',
        gender: 'female'
    }
];

writeFileSync = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                return reject(err);
            }
            const fileContent = JSON.parse(data)
            return resolve(fileContent);
        });
    });
}

readFileSync = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                return reject(err);
            }
            const fileContent = JSON.parse(data);
            return resolve(fileContent);
        });
    });
}

app.get('/users/:userId', async (req, res) => {
    try {
        const users = await readFileSync('users.txt');
        const userId = parseInt(req.params.userId); // get from client
        for (const item of users) {
            if (item.id === userId) {
                return res.status(200).json({ user: item });
            }
        }
        return res.status(400).json({ message: 'User is not found' });
    } catch (e) {
        return res.status(400).json({ message: 'Cannot read user file', error: e.message });
    }
});

app.get('/users/a/write', async (req, res) => {
    try {
        // write users to file.
        const data = await writeFileSync('users.txt', JSON.stringify(users));
        return res.json({ message: 'Successful' });
    }
    catch (e) {
        //console.error(e);
        return res.status(400).json({ message: 'Cannot write file!', error: e.message });
    }
});

app.post('/users/post', async (req, res) => {
    try {
        const body = req.body; // get from client
        if (!body.id) {
            return res.status(400).json({ error: 'id is required field' });
        }
        if (!body.email) {
            return res.status(400).json({ error: 'email is required field' });
        }

        const users = await readFileSync('users.txt');
        for (const item of users) {
            if (item.id === parseInt(body.id)) {
                return res.status(400).json({ error: 'user is exist' });
            }
        }

        users.push({
            id: parseInt(body.id),
            email: body.email,
            password: body.password,
            gender: body.gender
        })
        await writeFileSync('users.txt', JSON.stringify(users));
        return res.status(200).json({ message: 'Successfull!', users: body });
    }
    catch (e) {
        return res.status(400).json({ message: 'Error!', error: e.message });
    }
});

app.delete('/users/delete/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id); // get from client
        if (!userId) {
            return res.status(200).json({ error: 'id is required field' });
        }
        const users = await readFileSync('users.txt');
        let index = getIndexOfUserByid(userId, users);
        if (index !== undefined) {
            users.splice(index, 1);
            await writeFileSync('users.txt', JSON.stringify(users));
            return res.status(200).json({ message: 'Delete Successful!' });
        }
        return res.status(400).json({ message: 'Not found user!' });
    }
    catch (e) {
        //console.error(e);
        return res.status(400).json({ message: 'Error!', error: e.message });
    }
});

 getIndexOfUserByid = (id, users) => {
    //findIndex
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            return i;
        }
    }
}

app.put('/users/update/:id', async (req, res) => {
    try {
        const userid = parseInt(req.params.id); // get from client
        const body = req.body;

        if (!body.email) {
            return res.status(400).json({ error: 'email is required field' });
        }

        const users = await readFileSync('users.txt');
        for (const item of users) {
            if (item.id === userid) {
                item.email = body.email,
                item.password = body.password,
                item.gender = body.gender
                await writeFileSync('users.txt', JSON.stringify(users));
                return res.status(200).json({ message: 'update Successful!' });
            }
        }
        return res.status(400).json({ message: 'Not found user!' });
    }
    catch (e) {
        return res.status(400).json({ message: 'Error!', error: e.message });
    }
});

app.get('/users/search/:email', async (req, res) => {
    try {
        const email = req.params.email; // get from client

        const users = await readFileSync('users.txt');
        for (const item of users) {
            if (item.email === email) {
                return res.status(200).json({ user: item });
            }
        }
        return res.status(400).json({ message: 'Not found user!' });
    }
    catch (e) {
        //console.error(e);
        return res.status(400).json({ message: 'Error!', error: e.message });
    }
});

app.get('/users/search/regex/:email', async (req, res) => {
    try {
        const email = req.params.email; // get from client

        const users = await readFileSync('users.txt');
        const result = [];
        for (const item of users) {
            if (item.email.search(email) > -1) {
                result.push(item);
                //console.log(item.email.search(email));
                //return res.status(200).json({ user: item });
            }
        }
        if (result.length > 0) {
            return res.status(200).json({ result });
        }
        return res.status(400).json({ message: 'Not found users!' });
    }
    catch (e) {
        //console.error(e);
        return res.status(400).json({ message: 'Error!', error: e.message });
    }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));