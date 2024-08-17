const http = require('http');
const URL = require('url');
const fs = require('fs/promises');


const NOT_FOUND_404_FILE_NAME = '404.html';
const routes = ['/', '/about', '/contact-me'];

function isPathInRoutes(path) {
    return routes.some(route => route === path);
}


const server = http.createServer(async (req, res) => {
    const pathName = URL.parse(req.url, true).pathname;
    if (!isPathInRoutes(pathName)) {
        try {
            const data = await fs.readFile(NOT_FOUND_404_FILE_NAME, {encoding: 'utf8'});
            res.writeHead(200, {'Content-Type': 'text/html'});
            return res.end(data);
        } catch (e) {
            console.error(e);
        }
    }
    const fileName = pathName === '/' ?
        'index.html' :
        `${pathName.replace('/', '')}.html`;

    try {
        const data = await fs.readFile(fileName, {encoding: 'utf8'});
        res.writeHead(200, {'Content-Type': 'text/html'});
        return res.end(data);
    } catch (e) {
        console.error(e);

    }
});

server.listen(8000, () => {
});