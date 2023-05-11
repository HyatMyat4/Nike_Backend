const db = require("../Database");


const getallStories = async ( req , res ) => {
    try {
        const GetAllShoes = await db.query(
            "select * from stories;"
          );         
          if(!GetAllShoes){
           return  res.status(404).json({ message: "soorty shoes not found "})
        }
        res.status(200).json(GetAllShoes.rows);
    
     }  catch (err) {
        console.warn(err);
     }
}

const getSingleStories = async ( req , res ) => {
  try{
      const { id } = req.params;
      if(!id) return res.status(404).json({ message : "Soorty Id not found!"})     
      const result = await db.query("select * from stories where id = $1;",[ id ]);
      if(!result) res.status(404).json({ message: "Soorty Result not found!" })    
      res.status(201).json({ message: 'Success' , data:   result.rows  });
  } catch { 
    console.warn(err);
  }
}

const addStories = async (req , res) => {
  try{
    const { title , text , img , likecount } = req.body;
    if( !title || !text || !img || !likecount )  return res.status(404).json({message : "Soorty Somethig not found!"});
    const Results = await db.query(
      "INSERT INTO stories ( title,  text, img, likecount ) values ($1, $2, $3 , $4) returning *",
      [ title , text , img , likecount ]
     );
     res.status(200).json({ message: 'Success' , data:   Results.rows[0]  });
  } catch(err){
    console.log(err);
  }

}

const updateStories = async (req , res) => {
  try{
    const  { id , title , text , img , likecount } = req.body;
    if( !id || !title || !text || !img || !likecount) return res.status(404).json({message : "Something not found!"})
    const result = await db.query("UPDATE stories SET title = $1 , text = $2 , img = $3 , likecount = $4 where id = $5 returning *",[
      title , text , img , likecount , id
    ])
    if(!result) return res.status(404).json({message : "Soorty Result Not Found!" })
    res.status(200).json({ message: 'Success' , data: result.rows[0]  })
  } catch (err) {
    console.warn(err)
  }
}

const deleteStories = async ( req , res ) => {
  try{
    const { id } = req.params;
    if(!id) return res.status(404).json({meddage : "Soorty Id not found!"})
    const results = await db.query("DELETE FROM stories where id = $1",[
      id
     ]);
     if(!results) res.status(404).json({ message: "Result not found!" })
     
     res.status(201).json({ message: "Success" , data : results });
  } catch (err) {
     console.warn(err);
  }
}

module.exports = { getallStories ,addStories , deleteStories , getSingleStories , updateStories }


