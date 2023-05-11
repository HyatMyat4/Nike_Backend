const db = require("../Database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getAllUser = async (req, res) => {
  try {
    const GETALL_USERS = await db.query("select * from users;");
    if (!GETALL_USERS) {
      return res.status(404).json({ message: "soorty User not found! " });
    }
    res.status(200).json(GETALL_USERS.rows);
  } catch (err) {
    console.warn(err);
  }
};

const addUser = async (req, res) => {
  try {
    const { email, image, name, roleCode, password } = req.body;
    if (!email || !image || !name)
      return res.status(404).json({ message: "Something Not Found!" });
    const result = await db.query("select * from users where email = $1;", [
      email,
    ]);
    const token = jwt.sign(result.rows[0], process.env.JWT_SECRET);
    if (result.rows.length !== 0)
      return res.status(201).json({ message: "Success", token: token });
    let role;
    if (roleCode === "lizard7Rd3@") {
      role = "0479Admin0004";
    } else if (roleCode === "Mananger123@") {
      role = "4357Mananger";
    } else {
      role = "User";
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const Results = await db.query(
        "INSERT INTO users (email, img, name , role , password ) VALUES ($1, $2, $3 ,$4 ,$5) returning *",
        [email, image, name, role, passwordHash]
      );
      if (!Results)
        return res.status(404).json({ message: "Results Not Fould!" });
      const token = jwt.sign(Results.rows[0], process.env.JWT_SECRET);
      res.status(200).json({ message: "Success", token: token });
    } else {
      const Password = "ByGooglePassword";
      const Results = await db.query(
        "INSERT INTO users (email, img, name , role , password ) VALUES ($1, $2, $3 ,$4 ,$5) returning *",
        [email, image, name, role, Password]
      );
      if (!Results)
        return res.status(404).json({ message: "Results Not Fould!" });
      const token = jwt.sign(Results.rows[0], process.env.JWT_SECRET);
      res.status(200).json({ message: "Success", token: token });
    }
  } catch (err) {
    console.warn(err);
  }
};

const LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(404)
        .json({ message: "Authorization failed something Not Foul!" });
    const result = await db.query("select * from users where email = $1;", [
      email,
    ]);
    if (!result.rows[0])
      return res.status(400).json({ msg: "User dose not exist!." });
    const isMatch = await bcrypt.compare(password, result.rows[0].password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Password..." });
    const token = jwt.sign(result.rows[0], process.env.JWT_SECRET);
    res.status(200).json({ message: "Success", token: token });
  } catch (err) {
    console.warn(err);
  }
};

const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "Id Not Found!" });
    const results = await db.query("DELETE FROM users where id = $1", [id]);
    if (!results) res.status(404).json({ message: "Result not found!" });
    res.status(201).json({ message: "Success", data: results });
  } catch (err) {
    res.status(403).json({ message: "User Earr!" });
    console.warn(err);
  }
};

module.exports = { addUser, getAllUser, LogIn, DeleteUser };
