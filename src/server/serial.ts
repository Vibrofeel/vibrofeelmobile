import path from "path";
import { existsSync } from "fs";
import SerialPort from "serialport";
import { execFile } from "child_process";

export async function setupSerial() {
    const senderPort = argParser(["--senderport"]) || "COM98";
    const receiverPort = argParser(["--reciverport"]) || "COM99";
    if (process.platform === "win32") {
        const programPath = getProgramPath();
        const serialPort = new SerialPort(receiverPort, { autoOpen: false});
        try {
            await new Promise<void>((resolve, reject) =>  serialPort.open(err => err ? reject(err) : resolve()));
        } catch (error) {
            if (error.message.toLowerCase().includes("file not found")) {
                console.log("createPort");
                const filePath = path.join(programPath, "setupc.exe");
                console.log(filePath);
                const args = [
                    "install",
                    `portName=${senderPort}`,
                    `portName=${receiverPort}`,
                ];
                try {
                    await execPromise(filePath, args);
                } catch (error) {
                    console.error(`Unable to create port open powershell and run as admin command`);
                    console.error(`${filePath} ${args.join(" ")}`);
                }
            }
        }
        return serialPort;
    }
    return new SerialPort(receiverPort);
}

type ExecPromiseReturn = {stdout: string,stderr: string};
function execPromise(filePath: string , args: string[]) {
    return  new Promise<ExecPromiseReturn >((resolve, reject) => {
        execFile(filePath , args, (error, stdout, stderr) => {
            if (error) {
                console.error(`Unable to create port open powershell and run as admin command`);
                console.error(`${filePath} ${args.join(" ")}`);
                reject(error);
            } else {
                resolve({
                    stdout,
                    stderr,
                });
            }
        });
    });
}

function argParser(flags: string[]) {
    const args = [...process.argv];
    args.splice(0, 2);

    flags = flags.map(f => f.toLowerCase());

    for (let i = 0; i < args.length; i++) {
        const arg = args[i].toLowerCase();
        for (const flag of flags) {
            if (arg === flag) {
                return args[i + 1];
            }
        }
    }
}


function getProgramPath() {
    const programFilesCheckers = ["ProgramFiles", "ProgramFiles(x86)"];

    for (const programFiles of programFilesCheckers) {
        const location = process.env[programFiles];
        const programName = "com0com";
        const pathString = path.join(location, programName);
        if (existsSync(pathString)) {
            return pathString;
        }
    }
    console.log("Null-modem emulator (com0com) not installed!");
    console.log("Download it here");
    console.log("https://sourceforge.net/projects/com0com/files/latest/download");
    process.exit(1);

}
