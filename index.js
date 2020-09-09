const app = require("./app");

const registerCustomer = require("./routers/customer/register");

//Routes for Customers

//Customer - SIGNUP
app.use("/customer/register", registerCustomer);

//Connection to a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Application started listening to port ${PORT} successfully.`);
});
