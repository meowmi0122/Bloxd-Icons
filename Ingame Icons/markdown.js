const fs = require("fs");
const path = require("path");

const folder = __dirname;

const listFile = path.join(folder, "list.txt");
const outputFile = path.join(folder, "Ingame Icons.md");

const baseURL =
    "https://raw.githubusercontent.com/meowmi0122/Bloxd-Icons/refs/heads/main/Ingame%20Icons/";

// 讀取 list.txt
const list = fs
    .readFileSync(listFile, "utf8")
    .split(/\r?\n/)
    .map(x => x.trim())
    .filter(x => x.length > 0);

// 產生 Markdown
const output = list.map(name => {
    const fileName = name.endsWith(".png") ? name : `${name}.png`;
    const filePath = path.join(folder, fileName);

    if (!fs.existsSync(filePath)) {
        console.warn(`can't find: ${fileName}`);
    }

    const encodedFileName = encodeURIComponent(fileName);

    return `![${name}](${baseURL}${encodedFileName}) ${name}`;
}).join("\n");

// 寫入 Markdown
fs.writeFileSync(outputFile, output, "utf8");

console.log(`Done! ${list.length} icons`);
console.log(`Output: ${outputFile}`);