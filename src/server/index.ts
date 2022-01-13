import { setupSerial } from "./serial";
import express from "express";
import io from "socket.io";

const port = 5050;

async function start() {
    const serial = await setupSerial();
    const clients: io.Socket[] = [];

    let smallMotor = 0;
    let largeMotor = 0;


    serial.on("data", data => {
        smallMotor = data[0];
        largeMotor = data[1];

        for (let i = 0; i < clients.length; i++) {
            clients[i].emit("data", smallMotor, largeMotor);
        }
    });


    const app = express();
    app.use(express.static("public"));

    const server = app.listen(port, () => {
        console.log(`Listening to ${port}`);
    });

    const socket = new io.Server(server);
    socket.on("connection", socket => {
        clients.push(socket);
        socket.emit("data", smallMotor, largeMotor);
        socket.on("disconnect", () => {
            const index = clients.indexOf(socket);
            if (index !== -1) {
                clients.splice(index, 1);
            }
        });
    });

}

start();
