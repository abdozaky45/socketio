import express from "express";
import { Server } from "socket.io";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;

app.get('/', (req, res) => res.send('Hello World!'))
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
const io = new Server(server, {
    cors: "*"
});
// middalware
io.use((socket, next) => {
    console.log(socket.handshake.auth.name);

    if (!socket.handshake.auth.name) {
        console.log("name is required!");
        return;
    }
socket.name = socket.handshake.auth.name;
    return next();
})
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("clientTOserver", ({from ,message}) => {
        console.log(`message frontend ${message}`);
        socket.emit("b to f", message)
    })
})