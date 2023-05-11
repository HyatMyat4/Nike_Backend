const db = require("../Database");

const getOrderdata = async (req, res) => {
  try {
    const result = await db.query("select * from OrderData;");
    if (!result) {
      return res.status(404).json({ message: "soorty result not found! " });
    }
    const orderBy = result.rows.sort((a, b) => b.time - a.time);
    res.status(200).json(orderBy);
  } catch (err) {
    console.warn(err);
  }
};

const GetUserOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "id not found!" });
    const result = await db.query("select * from OrderData where id = $1;", [
      id,
    ]);
    if (!result) res.status(404).json({ message: "Result not found!" });
    res.status(201).json(result.rows);
  } catch (err) {
    console.warn(err);
  }
};

const DeleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "id not found!" });

    const results = await db.query("DELETE FROM OrderData where id = $1", [id]);
    if (!results) res.status(404).json({ message: "Result not found!" });

    res.status(201).json({ message: "Success", data: results });
  } catch (err) {
    console.warn(err);
  }
};

module.exports = { getOrderdata, DeleteOrder, GetUserOrder };
