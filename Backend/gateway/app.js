const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const expressProxy = require('express-http-proxy');
const gatewayPort = process.env.GATEWAY_PORT || 4000;
const userServiceUrl = process.env.USER_SERVICE_URL || "http://localhost:4001";
const captainServiceUrl = process.env.CAPTAIN_SERVICE_URL || "http://localhost:4002";
const app = express();

app.use('/users', expressProxy(userServiceUrl));
app.use('/captains', expressProxy(captainServiceUrl));


app.listen(gatewayPort, () => {
    
    console.log(`Gateway is running on port ${gatewayPort}`);
});