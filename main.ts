let speedFactor = 80
let l = DigitalPin.P13
let r = DigitalPin.P14
let pin_Trig = DigitalPin.P8
let pin_Echo = DigitalPin.P15
let whiteline = 1
let connected = 0
let manual = 0
let switch_ = 0
let strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
pins.setPull(l, PinPullMode.PullNone)
pins.setPull(r, PinPullMode.PullNone)
bluetooth.startUartService()
basic.showString("S")
function motor_run(left: number = 0, right: number = 0, speed_factor: number = 80) {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, Math.map(Math.constrain(left * (speedFactor / 100), -100, 100), -100, 100, -255, 255))
    PCAmotor.MotorRun(PCAmotor.Motors.M2, Math.map(Math.constrain(-1 * right * (speedFactor / 100), -100, 100), -100, 100, -255, 255))
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
            motor_run(-70, 80, -80)
            basic.pause(500)
            motor_stop()
        } else if (uartData == "C") {
            motor_run(-70, 0, -80)
            basic.pause(300)
            motor_stop()
        } else if (uartData == "D") {
            motor_run(0, 80, -80)
            basic.pause(300)
            motor_stop()
        }
        
    }
})
bluetooth.onBluetoothDisconnected(function on_bluetooth_disconnected() {
    
    basic.showIcon(IconNames.Sad)
    connected = 0
})
input.onButtonPressed(Button.AB, function manual_movement() {
    let maual: number;
    
    if (manual == 0) {
        maual = 1
    } else {
        manual = 0
    }
    
})
basic.forever(function movement() {
    if (connected == 0) {
        // reakční frekvence 20 Hz
        basic.forever(function on_forever() {
            
            let obstacle_distance = sonar.ping(pin_Trig, pin_Echo, PingUnit.Centimeters, 100)
            l = pins.digitalReadPin(DigitalPin.P13)
            r = pins.digitalReadPin(DigitalPin.P14)
            if (l == 0 && r == 1) {
                motor_run(0, 80, -80)
            } else if (l == 1 && r == 0) {
                motor_run(-70, 0, -80)
            } else {
                motor_run(-70, 80, -80)
            }
            
            basic.pause(50)
        })
    }
    
})
