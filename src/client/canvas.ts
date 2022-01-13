import { FixLengthArray } from "./array";

export class MotorVisualizer {
    private canvas = document.createElement("canvas");
    private ctx: CanvasRenderingContext2D
    private frame: number;
    private now  = 0;
    private smallMotorValues = new FixLengthArray(100, 0);
    private largeMotorValues = new FixLengthArray(100,0 );
    private outsideUpdate = false;
    constructor() {
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.resize();
        window.addEventListener("resize", this.resize);
    }

    updateValues(smallMotor: number, largeMotor: number) {
        this.smallMotorValues.push(smallMotor);
        this.largeMotorValues.push(largeMotor);
        this.outsideUpdate = true;
    }

    private resize =() => {
        this.canvas.width = window.innerWidth - 5;
        this.canvas.height = window.innerHeight - 5;
    }

    start() {
        this.stop();
        this.now = performance.now();
        this.frame = requestAnimationFrame(this.draw);
    }
    stop(){
        if(this.frame) {
            cancelAnimationFrame(this.frame);
            this.frame = undefined;
        }
    }
    private draw = () => {
        const now = performance.now();

        const delta = now - this.now;
        this.now = now;
        const { width, height } = this.canvas;
        const ctx = this.ctx;
        this.ctx.clearRect(0, 0, width, height);

        if (this.outsideUpdate) {
            this.outsideUpdate = false;
        } else {
            this.smallMotorValues.push(this.smallMotorValues[this.smallMotorValues.length - 1]);
            this.largeMotorValues.push(this.largeMotorValues[this.largeMotorValues.length - 1]);
        }

        this.drawArray(this.largeMotorValues, width * 0.5, height * 0.25, -(height * 0.25));
        this.drawArray(this.smallMotorValues, width * 0.5, height * 0.25, height * 0.25);


        this.frame = requestAnimationFrame(this.draw);
    }


    drawArray(array: number[], half: number, height: number, offset = 0) {

        const len = array.length;
        const widthDraw = this.canvas.width / len;
        const max = 255 / height * height;
        this.ctx.strokeStyle = "white";
        const lastPos = {
            x: 0,
            y: half,
        };


        for (let i = 0; i < len; i++) {
            const value = this.smallMotorValues[i];
            const drawHeight = half * (value / max);
            this.ctx.beginPath();
            const x = i * widthDraw;
            const y = half - drawHeight + offset;

            this.ctx.moveTo(lastPos.x, lastPos.y);
            this.ctx.lineTo(x, y);

            lastPos.x = x;
            lastPos.y = y;
            this.ctx.stroke();
        }
    }
}
