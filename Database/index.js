const { Pool } = require("pg");

const pool = new Pool();

module.exports = {
  query: (text, params) => pool.query(text, params),
};

// --create database   => CREATE DATABASE Nike

// --list all Database =>\l

// --choose database   => \c database name

// --Look All Table    => \d

// --Look Table information => \d TableName

// --Get All data From Table => select * from TableName;

// --Delete Table => DROP TABLE TableName;

// --Delete Commul => DELETE FROM restaurants where id = $1

/*
   -- CREATE TABLE shoes (
        id BIGSERIAL NOT NULL,
        Image text NOT NULL,
        BackgroundColour varchar(50) NOT NULL,
        Shadow varchar(50) NOT NULL,
        ShoeName varchar(80) NOT NULL,               
        Price smallint NOT NULL,
        Title varchar(100) NOT NULL, 
        ShoeImformation text NOT NULL,
        Rating smallint NOT NULL
    );

   -- CREATE TABLE stories (
        id BIGSERIAL NOT NULL,
        title varchar(200) NOT NULL,
        text text NOT NULL,
        img text NOT NULL,
        likecount smallint NOT NULL,
        time TIMESTAMPTZ DEFAULT Now()
    );

   -- CREATE TABLE users (
        id BIGSERIAL NOT NULL,
        email varchar(250) NOT NULL PRIMARY KEY,
        password varchar(250) NOT NULL ,    
        img text NOT NULL,
        name varchar(200) NOT NULL,
        role varchar(100) NOT NULL,
        time TIMESTAMPTZ DEFAULT Now()
    );

   -- CREATE TABLE OrderData (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        email varchar(250) NOT NULL ,
        email2 varchar(250) NOT NULL ,
        name varchar(250) NOT NULL,
        userimage text NOT NULL,
        totalamount numeric,
        phone smallint,
        city varchar(350),
        country varchar(450),
        town varchar(450),
        postal_code varchar(450),
        state varchar(450),
        time TIMESTAMPTZ DEFAULT Now(),
        orderdata json NOT NULL  
        
    );
*/
/*
 
        backgroundcolour varchar(50) NOT NULL ,
        shadow varchar(50) NOT NULL ,
        shoename varchar(250) NOT NULL ,    
        image text NOT NULL,
        price smallint NOT NULL, 
        rating smallint NOT NULL,
        cartQuantity smallint NOT NULL,
        time TIMESTAMPTZ DEFAULT Now()
 */
/*


      id: "0M0x12",
      title: "Nike Zoom Max",
      text: "MEN Running Shoes",
      rating: "5+",
      btn: "Buy Now",
      img: "/product8.png",
      price: "150",
      color: "from-blue-900 to-blue-500",
      shadow: "shadow-blue-500",


*/
// INSERT INTO shoes ( Image,  BackgroundColour, Shadow, ShoeName , Price , Title , ShoeImformation ) values ('Nike Zoom Max' , '2000', 'http/:firebase1244hfbvjbh2', 'rose' ,'rose' );
// INSERT INTO stories ( title , text , img, likecount ) values ( 'Jayson Tatum Debuts' , 'Jordan Brands signature model for the past few years, Jayson Tatum will be dawning the Air Jordan 37 this season before attaining potentially his first signature sneaker with Jumpman, which he rumored to be in the works recently via his Twitter.', 'https://sneakernews.com/wp-content/uploads/2022/09/air-jordan-37-low.jpg?w=540&h=380&crop=1' , 816 );
