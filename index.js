const express = require("express");
var app = express();
const bodyParser = require('body-parser');
const {logger} = require("./logger");
const alert = require('./src/alert/sentry');
const cache = require('./src/lib/cache/redis');

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

alert();

app.use("/customer", require("./routes/customer"));
app.use("/categories", require("./routes/category"));
app.use("/product", require("./routes/product"));
app.use("/orders", require("./routes/order"));
app.use("/shoppingcart", require("./routes/cart"));

cache.connectRedis();

app.listen(PORT, (req, res) => {
    logger.info(`Server started on PORT ${PORT}`);
    console.log(`Server started on PORT ${PORT}`);
});

module.exports = app;