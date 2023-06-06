import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config();


let server = express();
server.use(express.static('public'));

// server.get('/', (req, res) => {
//     res.send("He");
// })


let port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`listening on port ${port}`);
})
