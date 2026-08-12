const fs = require("fs");
const path = require("path");

const folder = __dirname;

const listFile = path.join(folder, "list.txt");
const outputFile = path.join(folder, "Font Awesome Icons.md");

const baseURL =
    "https://raw.githubusercontent.com/meowmi0122/Bloxd-Icons/refs/heads/main/Font%20Awesome%20Icons/";

// 讀取 list.txt
const list = fs
    .readFileSync(listFile, "utf8")
    .split(/\r?\n/)
    .map(x => x.trim())
    .filter(x => x.length > 0);

// 產生 Markdown
const output = list.map(name => {
    const fileName = name.endsWith(".svg") ? name : `${name}.svg`;
    const filePath = path.join(folder, fileName);

    if (!fs.existsSync(filePath)) {
        console.warn(`can't find: ${fileName}`);
    }

    const encodedFileName = encodeURIComponent(fileName);

    return `![${name}](${baseURL}${encodedFileName}) ${name}`;
}).join("\n\n");

// 寫入 Markdown
fs.writeFileSync(outputFile, output, "utf8");

console.log(`Done! ${list.length} icons`);
console.log(`Output: ${outputFile}`);