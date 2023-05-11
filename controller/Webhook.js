const db = require("../Database");
const stripe = require("stripe")(process.env.Stripe_Secret);
const endpointSecret = process.env.webhook_Secret;
const { buffer } = require("micro");

const fullFaill_Order = async (session) => {
  const result = await db.query("select * from OrderData where id = $1;", [
    session.metadata.id,
  ]);

  const Results = await db.query(
    "UPDATE OrderData SET email = $1 , name = $2, userimage = $3 , totalamount = $4 , phone = $5 , city = $6 , country =$7 , town = $8 , postal_code = $9 , state = $10 , orderdata = $12 , email2 = $13 where id = $11 returning *",
    [
      session.customer_details.email,
      session.customer_details.name,
      session.metadata.userImage,
      Number(session.amount_total) / 100,
      Number(session.customer_details.phone),
      session.customer_details.address.city,
      session.customer_details.address.country,
      session.customer_details.address.line1,
      session.customer_details.address.postal_code,
      session.customer_details.address.state,
      session.metadata.id,
      JSON.stringify(result.rows[0].orderdata),
      session.metadata.email,
    ]
  );
};

const WEb_Hook = async (req, res) => {
  try {
    const payload = JSON.stringify(req.body);
    let event = req.body;

    try {
      if (endpointSecret) {
        const signature = req.headers["stripe-signature"];
        event = stripe.webhooks.constructEvent(
          payload,
          signature,
          endpointSecret
        );
      } else {
        console.log("Return earr");
        res.status(404).json({ message: "EndpointSecret Not found!" });
        return;
      }
    } catch (err) {
      console.log("case 2 earr");
      console.log(err);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      return fullFaill_Order(session);
    }
  } catch (err) {
    console.log("here earr", err);
    console.warn(err);
  }
};

module.exports = { WEb_Hook };

//acct_1MaXlbHoeF6UWdek
//stripe listen --forward-to localhost:4000/checkout/WebHook
//4242 4242 4242 4242
//whsec_f4b7d870457b997e7b142d0077710ebded2885eeb24937ea3b4637f30a831a1a
