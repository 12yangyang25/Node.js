var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body) {
  return `
        <!doctype html >
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            ${body}
          </body>
          </html>
        `;
}

var app = http.createServer(function (request, response) {
  var __url = request.url;
  var queryData = url.parse(__url, true).query;
  var pathname = url.parse(__url, true).pathname;

  if (pathname === '/') {
    var title = queryData.id; //여기 두면 title= undefined...................d왜
    fs.readdir('./data', function (err, filelist) {
      console.log(title);
      //var title = queryData.id;
      var i = 1;
      var list = `<ol>`;
      while (i < filelist.length) {
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        i += 1;
      }
      list = list + `</ol>`;


      if (title === undefined) {
        var title = 'Welcome'
        var description = 'HELLO, Node.js'
        var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
        response.end(template);
        response.writeHead(200);
      }

      else {
        fs.readFile(`data/${title}`, 'utf-8', function (err, description) { //여기서 title은 인식되는 이유
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
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