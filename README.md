# Vibrofeel m (BETA)

Ref: https://github.com/Vibrofeel/vibrofeel.ino

Most of the vibrofeel codes require you to have arduino controller that controls your motors. In case you don't have one you can use your mobile phone that should have vibrator motors built-in.


### It is not the same as using arduino
A mobile phone usually have only one vibration motor and to make matters worse you can only turn it on and off. Most the vibrofeel requires you to have two motors small and large one. This project is somehow simulating how it would feel it by creating vibration pattern with delays to simulate values on motors. Your experience may vary


# Install 
Only tested on windows
You need to install this software http://com0com.sourceforge.net/

Only dev build exist right now
```bash 
npm i
npm run ts-w # launches typescript compiler
npm run webpack # builds webpage
npm run dev # opens dev server
```
The app should create virtual port COM98 that you connect with you vibrofeel program and since com0com is sending data back to COM99 this application is reading that data and then sending it to your device.

type ipconfig in cmd and and get ip IPv4 Address. You enter that ip in your phone's browser ex `192.168.0.123:5050` and the webpage should open. You need to tap on screen to make it work