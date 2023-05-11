const db = require("../Database");
const stripe = require("stripe")(process.env.Stripe_Secret);

const CheckOut = async (req, res) => {
  try {
    const { Items, Email, Name, Image } = req.body;
    if (!Items || !Email || !Name || !Image) {
      return res
        .status(404)
        .json({ message: "Something Not Found Please Make Sure! " });
    }

    const tramFrom_data = await Items.map((item) => ({
      quantity: item.cartQuantity,
      price_data: {
        currency: "usd",
        unit_amount: Number(item.price) * 100,
        product_data: {
          name: item.shoename,
          description: `${item.shoeimformation.slice(0, 30)}...`,
          images: [item.image],
        },
      },
    }));

    const Results = await db.query(
      "INSERT INTO OrderData ( email,  name, userimage , totalamount , phone , city , country , town ,postal_code , state , orderdata , email2  ) values ($1, $2, $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12) returning *",
      ["", Name, Image, 0, 0, "", "", "", "", "", JSON.stringify(Items), Email]
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      shipping_address_collection: { allowed_countries: ["US", "CA", "GB"] },
      shipping_options: [
        { shipping_rate: "shr_1N3BPJHoeF6UWdekFpxWJsPB" },
        { shipping_rate: "shr_1N3BUvHoeF6UWdekxk5jQ76A" },
        { shipping_rate: "shr_1N3CMcHoeF6UWdekIZd30Uz2" },
      ],
      line_items: tramFrom_data,
      mode: "payment",
      success_url: `${process.env.FrontendHost}/SuccessPayment`,
      cancel_url: `${process.env.FrontendHost}/`,
      metadata: {
        email: Email,
        userImage: Image,
        id: Results.rows[0].id,
      },
      tax_id_collection: {
        enabled: true,
      },
    });

    res.status(200).json({
      message: "Success",
      id: session.id,
      order_id: Results.rows[0].id,
    });
  } catch (err) {
    console.warn(err);
  }
};

module.exports = { CheckOut };
