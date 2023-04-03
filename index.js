const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app");
console.log("process.env=>", process.env.NODE_ENV);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
