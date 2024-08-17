const http = require('http');
const URL = require('url');
const fs = require('fs/promises');


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


const server = http.createServer(async (req, res) => {
    const pathName = URL.parse(req.url, true).pathname;
    const fileToServer = getFile(pathName);
    const isFile404 = fileToServer === NOT_FOUND_404_FILE_NAME;
    try {
        const data = await fs.readFile(fileToServer, {encoding: 'utf8'});
        res.writeHead(isFile404 ? 404 : 200, {'Content-Type': 'text/html'});
        return res.end(data);
    } catch (e) {
        res.writeHead(500, {'Content-Type': 'text/html'});
        return res.end('Internal Server Error');
    }
});

server.listen(8000, () => {
});