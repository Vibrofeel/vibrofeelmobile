import io from "socket.io-client";
import { MotorVisualizer } from "./canvas";
import { VibrationEmulator } from "./vibrationEmulator";


const socket = io();

const visualizer = new MotorVisualizer();
visualizer.start();

const vibrate = new VibrationEmulator();

socket.on("connect", () => {
    console.log("connected");
});
socket.on("disconnect", () => {
    console.log("disconnected");
});

socket.on("data", (smallMotor, largeMotor) => {
    vibrate.updateMotors(smallMotor, largeMotor);
    visualizer.updateValues(smallMotor, largeMotor);
    console.log(`${smallMotor}:${largeMotor}`);
});
