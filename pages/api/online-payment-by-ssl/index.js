import SSLCommerzPayment from "sslcommerz-lts";
const store_id = "mahbu6228481a4b946";
const store_passwd = "mahbu6228481a4b946@ssl";
const is_live = false; //true for live, false for sandbox
export default function handler(req, res) {
  const data = {
    total_amount: 333,
    currency: "BDT",
    tran_id: "REF123", // use unique tran_id for each api call
    success_url: "http://localhost:3000/order-confirmation",
    fail_url: "http://localhost:3000/payment-fail",
    cancel_url: "http://localhost:3000/payment-canceled",
    ipn_url: "http://localhost:3000/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "req.body.name",
    cus_email: "amazondb@gmail.com",
    cus_add1: "req.body.address",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "09876768",
    cus_fax: "01623218618",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.redirect(GatewayPageURL);
    console.log("Redirecting to: ", GatewayPageURL);
  });
}
