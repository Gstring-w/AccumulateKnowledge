const http = require("http");
const path = require("path");
const fse = require("fs-extra");
const multiparty = require("multiparty");

const server = http.createServer();
const UPLOAD_DIR = path.resolve(__dirname, "..", "target"); // 大文件存储目录

const resolvePost = req =>
  new Promise(resolve => {
    let chunk = "";
    req.on("data", data => {
      chunk += data;
    });
    req.on("end", () => {
      resolve(JSON.parse(chunk));
    });
  });

// 合并切片
const mergeFileChunk = async (filePath, filename, type) => {
  const chunkPaths = await fse.readdir(filePath);
  chunkPaths.forEach(chunkPath => {
    fse.appendFileSync(`merge/${filename}.${type}`, fse.readFileSync(`${filePath}/${chunkPath}`))
    fse.unlinkSync(`${filePath}/${chunkPath}`)
  }); 
  fse.rmdirSync(filePath)
};

server.on("request", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.status = 200;
    res.end();
    return;
  }

  if (req.url === "/merge") {
    const data = await resolvePost(req);
    const { fileName, type } = data;
    const filePath = `${UPLOAD_DIR}/${fileName}`;
    await mergeFileChunk(filePath, fileName, type);
    res.end(
      JSON.stringify({
        code: 0,
        message: "file merged success"
      })
    );
  }

  const multipart = new multiparty.Form();

  multipart.parse(req, async (err, fields, files) => {
    if (err) {
      return;
    }
    const [chunk] = files.chunk;
    const [hash] = fields.hash;
    const [filename] = fields.filename;
    const chunkDir = `${UPLOAD_DIR}/${filename}`;

    // 切片目录不存在，创建切片目录
    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirs(chunkDir);
    }

    // fs-extra 专用方法，类似 fs.rename 并且跨平台
    // fs-extra 的 rename 方法 windows 平台会有权限问题
    // https://github.com/meteor/meteor/issues/7852#issuecomment-255767835
    await fse.move(chunk.path, `${chunkDir}/${hash}`);
    res.end("received file chunk");
  });
});

server.listen(3000, () => console.log("正在监听 3000 端口"));
