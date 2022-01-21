var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var __url = request.url;
    var queryData = url.parse(__url, true).query;
    var pathname = url.parse(__url, true).pathname;

    if (pathname === '/') {
        fs.readdir('./data', function (err, filelist) {
            console.log(`1. ${filelist}`);
            var i = 1;
            var list = `<ol>`;
            while (i < filelist.length) {
                list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
                i += 1;
            }
            list = list + `</ol>`;
            var title = queryData.id;

            if (title === undefined) {
                var title = 'Welcome'
                var description = 'HELLO, Node.js'

                console.log(`2.${description}`);
                var template = `<!doctype html >
                <html>
                <head>
                  <title>WEB1 - ${title}</title>
                  <meta charset="utf-8">
                  </head>
                  <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                    <h2>${title}</h2>
                    <p>${description}</p>
                  </body>
                  </html>`;
                response.end(template);
                response.writeHead(200);
            }

            else {
                fs.readFile(`data/${title}`, 'utf-8', function (err, description) {
                    console.log(`3.${description}`);
                    var template = `<!doctype html >
                    <html>
                    <head>
                      <title>WEB1 - ${title}</title>
                      <meta charset="utf-8">
                      </head>
                      <body>
                        <h1><a href="/">WEB</a></h1>
                        ${list}
                        <h2>${title}</h2>
                        <p>${description}</p>
                      </body>
                      </html>`;
                    console.log(`4.${description}`);
                    response.end(template);
                    response.writeHead(200);
                });
            }

        });

    }

    else {
        response.end('NOT FOUND');
        response.writeHead(404);
    }

});

app.listen(3000);
