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
    const pdfDoc = new Recipe("templates/withTextfield.pdf", "templateOutput.pdf");
    pdfDoc
        .editPage(1)
        .image("templates/qr.jpg", 20, 100, { width: 300, keepAspectRatio: true })
        .text("ProofText", "center", 250, {
            color: "#066099",
            fontSize: 30,
            bold: true,
            font: "Helvatica",
            align: "center center",
            opacity: 0.8,
            rotation: 180,
        })
        .endPage()
        .endPDF();
}

function createDemoPDF() {
    const pdfDoc = new Recipe("new", "demo.pdf");
    pdfDoc
        // 1st Page
        .createPage("letter-size")
        .circle("center", 100, 30, { stroke: "#3b7721", fill: "#eee000" })
        .polygon(
            [
                [50, 250],
                [100, 200],
                [512, 200],
                [562, 250],
                [512, 300],
                [100, 300],
                [50, 250],
            ],
            {
                color: [153, 143, 32],
                stroke: [0, 0, 140],
                fill: [153, 143, 32],
                lineWidth: 5,
            }
        )
        .rectangle(240, 400, 50, 50, {
            stroke: "#3b7721",
            fill: "#eee000",
            lineWidth: 6,
            opacity: 0.3,
        })
        .moveTo(200, 600)
        .lineTo("center", 650)
        .lineTo(412, 600)
        .text("Welcome to Hummus-Recipe", "center", 250, {
            color: "#066099",
            fontSize: 30,
            bold: true,
            font: "Helvatica",
            align: "center center",
            opacity: 0.8,
            rotation: 180,
        })
        .text("some text box", 450, 400, {
            color: "#066099",
            fontSize: 20,
            font: "Courier New",
            strikeOut: true,
            highlight: {
                color: [255, 0, 0],
            },
            textBox: {
                width: 150,
                lineHeight: 16,
                padding: [5, 15],
                style: {
                    lineWidth: 1,
                    stroke: "#00ff00",
                    fill: "#ff0000",
                    dash: [20, 20],
                    opacity: 0.1,
                },
            },
        })
        .comment("Feel free to open issues to help us!", "center", 100)
        .endPage()
        // 2nd page
        .createPage("A4", 90)
        .circle(150, 150, 300)
        .endPage()
        // end and save
        .endPDF(() => {
            /* done! */
        });
}