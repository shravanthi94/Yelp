/* eslint-disable no-console */
const app = require('./app');

const registerCustomer = require('./routers/customer/register');
const loginCustomer = require('./routers/customer/login');
const profileCustomer = require('./routers/customer/profile');
const registerRestaurant = require('./routers/restaurant/register');
const loginRestaurant = require('./routers/restaurant/login');
const profileRestaurant = require('./routers/restaurant/profile');
const events = require('./routers/events');
const resOrders = require('./routers/restaurant/orders');
const cusOrders = require('./routers/customer/orders');
const reviews = require('./routers/reviews');
const search = require('./routers/restaurant/search');

/*  Routes for Customers */
//  Customer - SIGNUP
app.use('/customer/register', registerCustomer);
//  Customer - LOGIN
app.use('/customer/login', loginCustomer);
//  Customer - PROFILE
app.use('/customer/profile', profileCustomer);
//  Customer - ORDERS
app.use('/customer/orders', cusOrders);

/* Routes for Restaurant */
//  Restaurant SIGNUP
app.use('/restaurant/register', registerRestaurant);
//  Restaurant - LOGIN
app.use('/restaurant/login', loginRestaurant);
//  Restaurant - PROFILE
app.use('/restaurant/profile', profileRestaurant);
//  Restaurant - ORDERS
app.use('/restaurant/orders', resOrders);

// Events
app.use('/events', events);

//  Reviews
app.use('/reviews', reviews);

// Restaurant search bar
app.use('/search', search);

//  Connection to a port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Application started listening to port ${PORT} successfully.`);
});
