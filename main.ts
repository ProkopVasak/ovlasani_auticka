let speedFactor = -80
let pin_Trig = DigitalPin.P8
let pin_Echo = DigitalPin.P15
let l = DigitalPin.P13
let r = DigitalPin.P14
let whiteline = 0
let connected = 0
let manual = false
let strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
pins.setPull(l, PinPullMode.PullNone)
pins.setPull(r, PinPullMode.PullNone)
bluetooth.startUartService()
basic.showString("S")
function motor_run(left: number = 0, right: number = 0, speed_factor: number = 80) {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, Math.map(Math.constrain(left * (speedFactor / 100), -100, 100), -100, 100, -255, 255))
    PCAmotor.MotorRun(PCAmotor.Motors.M2, Math.map(Math.constrain(right * (speedFactor / 100), -100, 100), -100, 100, -255, 255))
}

function motor_stop() {
    PCAmotor.MotorStop(PCAmotor.Motors.M1)
    PCAmotor.MotorStop(PCAmotor.Motors.M2)
}

bluetooth.onBluetoothConnected(function on_bluetooth_connected() {
    let uartData: string;
    
    basic.showIcon(IconNames.Heart)
    connected = 1
    while (connected == 1) {
        uartData = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        console.logValue("data", uartData)
        if (uartData == "A") {
            motor_run(70, 70)
            basic.pause(500)
            motor_stop()
        } else if (uartData == "B") {
            motor_run(-70, -70)
            basic.pause(300)
            motor_stop()
        } else if (uartData == "C") {
            motor_run(70, 0)
            basic.pause(300)
            motor_stop()
        } else if (uartData == "D") {
            motor_run(0, 70)
            basic.pause(300)
            motor_stop()
        } else if (uartData == "G") {
            motor_run(80, -80)
            basic.pause(580)
            motor_stop()
        } else if (uartData == "F") {
            motor_run(-80, 80)
            basic.pause(580)
            motor_stop()
        } else if (uartData == "E") {
            motor_stop()
        }
        
    }
})
bluetooth.onBluetoothDisconnected(function on_bluetooth_disconnected() {
    
    basic.showIcon(IconNames.Sad)
    connected = 0
})
input.onButtonPressed(Button.A, function manual_movement() {
    
    if (manual == false) {
        manual = true
    } else {
        manual = false
    }
    
    console.log(manual)
})
basic.forever(function movement() {
    if (connected == 0) {
        // reakční frekvence 20 Hz
        //  print(l+""+r)
        basic.forever(function on_forever() {
            let l: number;
            let r: number;
            
            if (manual == true) {
                l = pins.digitalReadPin(DigitalPin.P13)
                r = pins.digitalReadPin(DigitalPin.P14)
                if (l == whiteline && r != whiteline) {
                    motor_run(0, 50)
                } else if (l != whiteline && r == whiteline) {
                    motor_run(50, 0)
                } else if (l == whiteline && r == whiteline) {
                    motor_run(50, 50)
                } else if (l != whiteline && r != whiteline) {
                    motor_run(50, 50)
                }
                
                basic.pause(50)
            }
            
        })
    }
    
})
