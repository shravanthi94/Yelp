const app = require("./app");

const registerCustomer = require("./routers/customer/register");
const loginCustomer = require("./routers/customer/login");

//Routes for Customers

//Customer - SIGNUP
app.use("/customer/register", registerCustomer);
//Customer - LOGIN
app.use("/customer/login", loginCustomer);

//Connection to a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Application started listening to port ${PORT} successfully.`);
});
