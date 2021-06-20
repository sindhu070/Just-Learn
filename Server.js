//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('C:/Users/admin/JL' + '/Just-Learn'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join('C:/Users/admin/JL'+'/dist/Just-Learn'/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);