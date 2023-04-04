const fs = require("fs");
const path = require("path");
const { readFile, readdir, writeFile, unlink } = require("fs/promises");
const uuid = require("uuid");

const readFiles = async (dir, skip, limit) => {
  try {
    const files = await readdir(dir);
    console.log("files=>", files);
    console.log("files length=>", files.length);
    console.log("param=>", { skip, limit });

    // set limit and skip
    limit = limit ? skip + limit : undefined;
    const data = files.slice(skip, limit);
    console.log("data", data);
    let res = data.map(async (file) => {
      const fileDir = path.join(dir, file);
      console.log("fileDir=>", fileDir);

      try {
        const data = await readFile(fileDir, { encoding: "utf8" });
        // console.log("data", data);
        return JSON.parse(data);
      } catch (error) {
        console.log("read file err", err);
        return error;
      }
    });
    res = await Promise.all(res);

    // console.log("res=>", res);
    return { data: res, totalLength: files.length };
  } catch (error) {
    console.log("read dir error=>", err);
    return error;
  }

  // fs.readdir(dir, async (err, files) => {
  //   if (err) {
  //     console.log("error=>", err);
  //   } else {
  //     console.log("files=>", files);
  //     console.log("files length=>", files.length);
  //     const data = files.slice(0, 3);
  //     console.log("data", data);
  //     const res = data.map(async (file) => {
  //       const fileDir = path.join(dir, file);
  //       console.log("fileDir=>", fileDir);

  //       try {
  //         const data = await readFile(fileDir, { encoding: "utf8" });
  //         console.log("data", data);
  //         return data;
  //       } catch (error) {
  //         console.log("read file err", err);
  //       }
  //     });
  //     console.log("res", res);
  //   }
  // });
};

const readDir = async (dir, skip, limit) => {
  try {
    const files = await readdir(dir);
    console.log("files=>", files);
    console.log("files length=>", files.length);
    console.log("param=>", { skip, limit });
    limit = limit ? skip + limit : undefined;
    const res = files.slice(skip, limit);

    console.log("data", res);
    return res;
  } catch (error) {
    console.log("read dir error=>", error);
    return error;
  }
};

const readSingleFile = async (fileDir) => {
  try {
    const data = await readFile(fileDir, { encoding: "utf8" });
    console.log("raw data=>", data);
    return JSON.parse(data);
  } catch (error) {
    console.log("readSingleFile error=====>", error);
    return null;
  }
};

const writeData = async (fileDir, data) => {
  try {
    const uniqId = uuid.v4();
    const fileName = `${uniqId}.json`;
    console.log("fileName=>", fileName);
    data = typeof data != "object" ? JSON.parse(data) : data;
    data._id = uniqId;
    data = JSON.stringify(data);
    console.log("data==>", data);
    const res = await writeFile(path.join(fileDir, fileName), data, {
      encoding: "utf8",
    });
    console.log("raw data=>", res);
    return data;
  } catch (error) {
    return error;
  }
};

const removeFile = async (fileDir, fileName) => {
  try {
    const res = await unlink(path.join(fileDir, fileName));
    console.log("raw data=>", res);
    return res;
  } catch (error) {
    console.log("remove file error", error);
    throw new Error(error);
  }
};

const updateFile = async (fileDir, data) => {
  try {
    // const fileName = `${uuid.v4()}.json`;
    // console.log("fileName=>", fileName);
    data = typeof data != "object" ? JSON.parse(data) : data;
    // data._id = fileName;
    data = JSON.stringify(data);
    console.log("data==>", data);
    const res = await writeFile(fileDir, data, {
      encoding: "utf8",
    });
    console.log("raw data=>", res);
    return JSON.parse(data);
  } catch (error) {
    return error;
  }
};

const dir = path.join(__dirname, ".data", "users");
console.log(dir);
// writeData(dir, { id: 100, name: "test" });
// removeFile(dir, "4a1c1650-e1eb-4403-a892-8a835a130ec6.json");

// console.log("uuid.v4()=>", uuid.v4());

// readDir(dir, 2, 10);
// readFiles(dir)
//   // .then((res) => JSON.parse(res))
//   .then((data) => console.log("data", data))
//   .catch((err) => console.log("err=>", err));

module.exports = {
  readDir,
  readFiles,
  readSingleFile,
  writeData,
  removeFile,
  updateFile,
};
