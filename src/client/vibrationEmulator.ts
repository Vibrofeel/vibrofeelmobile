export class VibrationEmulator{
   private smallMotor = 0;
   private largeMotor = 0;
   private activated = false;

   constructor() {
       window.addEventListener("click" , this.activate);
       window.addEventListener("touch" , this.activate);
   }

   private activate = () => {
       this.activated = true;
       this.update();
   }


   updateMotors(smallMotor: number, largeMotor: number) {
       this.smallMotor = smallMotor;
       this.largeMotor = largeMotor;
       this.update();
   }

   update() {
       if (!this.activated) {
           return;
       }
       const patternTemplate = [this.smallMotor, 255 - this.smallMotor, this.largeMotor, 255 -this.largeMotor];
       const repeat = 1000;
       const pattern: number[] = [];
       for (let i = 0; i < repeat; i++) {
           for (let j = 0; j < patternTemplate.length; j++) {
               pattern.push(patternTemplate[j]);
           }
           pattern.push();
       }
       navigator.vibrate(pattern);
       console.log("vibro");
   }
}
