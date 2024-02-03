const http = require('node:http');
const Recipe = require('muhammara').Recipe;
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    editTemplate()
    res.end('PDF created\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function editTemplate() {
    const qrSide = 170
    const borderWidth = 0
    const qrPosition = { x: 125, y: 240 }
    const pdfDoc = new Recipe("templates/withTextfield.pdf", "templateOutput.pdf");
    pdfDoc
        .editPage(1)
        .rectangle(qrPosition.x - borderWidth / 2, qrPosition.y - borderWidth / 2, qrSide + borderWidth, qrSide + borderWidth, { fill: "#c7c7c5" })
        .image("templates/qr.jpg", qrPosition.x , qrPosition.y, { width: qrSide, keepAspectRatio: true })
        .text("Tisch 14", 360, 30, {
            color: "#000000",
            fontSize: 16,
            bold: true,
            font: "Helvatica",
            align: "center center",
        })
        .endPage()
        .endPDF();
}