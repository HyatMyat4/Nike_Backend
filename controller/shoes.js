const db = require("../Database");

const getallshoes = async (req, res) => {
  try {
    const GetAllShoes = await db.query("select * from shoes;");
    if (!GetAllShoes) {
      return res.status(404).json({ message: "soorty shoes not found " });
    }
    res.status(200).json(GetAllShoes.rows);
  } catch (err) {
    console.warn(err);
  }
};

const getSingleshoe = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "id not found!" });
    const result = await db.query("select * from shoes where id = $1;", [id]);
    if (!result) res.status(404).json({ message: "Result not found!" });
    res.status(201).json({ message: "Success", data: result.rows });
  } catch (err) {
    console.warn(err);
  }
};

const addShoes = async (req, res) => {
  try {
    const {
      Image,
      BgColour,
      ShadowColour,
      shoeImformation,
      shoeName,
      shoePrice,
      shoeTitle,
      Rating,
    } = req.body;
    if (
      !Image ||
      !BgColour ||
      !ShadowColour ||
      !shoeImformation ||
      !shoeName ||
      !shoePrice ||
      !shoeTitle ||
      !Rating
    ) {
      return res.status(404).json({ message: "Something Not Found!" });
    }
    const Results = await db.query(
      "INSERT INTO shoes ( Image,  BackgroundColour, Shadow, ShoeName , Price , Title , ShoeImformation , Rating ) values ($1, $2, $3 , $4 , $5 , $6 , $7 , $8) returning *",
      [
        Image,
        BgColour,
        ShadowColour,
        shoeName,
        shoePrice,
        shoeTitle,
        shoeImformation,
        Rating,
      ]
    );
    if (!Results) res.status(404).json({ message: "Result not found!" });
    res.status(201).json({ message: "Success", data: Results.rows[0] });
  } catch (err) {
    console.warn(err);
  }
};

const Updateshoe = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "id not found!" });
    const {
      Image,
      BgColour,
      ShadowColour,
      shoeImformation,
      shoeName,
      shoePrice,
      shoeTitle,
      Rating,
    } = req.body;

    if (
      !Image ||
      !BgColour ||
      !ShadowColour ||
      !shoeImformation ||
      !shoeName ||
      !shoePrice ||
      !shoeTitle ||
      !Rating
    ) {
      return res.status(404).json({ message: "Something Not Found!" });
    }
    const result = await db.query(
      "UPDATE shoes SET Image = $1, BackgroundColour = $2, Shadow = $3, ShoeName = $4, Price = $5, Title = $6, ShoeImformation = $7, Rating = $8 where id = $9 returning *",
      [
        Image,
        BgColour,
        ShadowColour,
        shoeName,
        shoePrice,
        shoeTitle,
        shoeImformation,
        Rating,
        id,
      ]
    );
    if (!result) res.status(404).json({ message: "Result not found!" });
    res.status(201).json({ message: "Success", data: result.rows[0] });
  } catch (err) {
    console.warn(err);
  }
};

const deleteShoes = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "id not found!" });

    const results = await db.query("DELETE FROM shoes where id = $1", [id]);
    if (!results) res.status(404).json({ message: "Result not found!" });

    res.status(201).json({ message: "Success", data: results });
  } catch (err) {
    console.warn(err);
  }
};

module.exports = {
  getallshoes,
  getSingleshoe,
  addShoes,
  Updateshoe,
  deleteShoes,
};
