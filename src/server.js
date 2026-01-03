require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const { User } = require("./models");

const PORT = process.env.PORT || 5000;

connectDB(); //connect Database

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

(async () => {
  const user = await User.create({
    name: "Vigneshwaran Thiruselvam",
    email: "vthiruselvam@gmail.com",
    password: "Vignesh@2026",
  });

  console.log(user);
})();
