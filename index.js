const URL = require('url');
const fs = require('fs/promises');

const express = require('express');
const app = express();


const NOT_FOUND_404_FILE_NAME = '404.html';

function getFile(path) {
    let fileToServe;
    switch (path) {
        case ('/'): {
            fileToServe = 'index.html';
            break;
        }
        case('/about'): {
            fileToServe = 'about.html';
            break;
        }

        case ('/contact-me'): {
            fileToServe = 'contact-me.html';
            break;
        }
        default: {
            fileToServe = NOT_FOUND_404_FILE_NAME;
            break;
        }
    }

    return fileToServe;
}


app.get(['/', '/contact-me', '/about'], async (req, res) => {
    const pathName = URL.parse(req.url, true).pathname;
    const fileToServe = getFile(pathName);
    try {
        const data = await fs.readFile(fileToServe, {encoding: 'utf8'});
        return res.send(data);
    } catch (e) {
        res.sendStatus(500);
        return res.send('Internal Server Error');

    }
});

app.get('*', async (req, res) => {
    try {
        const data = await fs.readFile(NOT_FOUND_404_FILE_NAME, 'utf8');
        return res.send(data);
    } catch (e) {
        res.sendStatus(500);
        return res.send('Internal Server Error');
    }
});

const PORT = 3000;
app.listen(PORT);

