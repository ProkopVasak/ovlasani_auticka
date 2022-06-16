let speedFactor = -90
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

/** def on_bluetooth_connected():
    global connected
    basic.show_icon(IconNames.HEART)
    connected = 1
    while connected == 1:
        uartData = bluetooth.uart_read_until(serial.delimiters(Delimiters.HASH))
        console.log_value("data", uartData)
        if uartData == "A":
            motor_run(70, 70)
            basic.pause(500)
            motor_stop()
        elif uartData == "B":
            motor_run(-70, -70)
            basic.pause(300)
            motor_stop()    
        elif uartData == "C":
            motor_run(70, 0)
            basic.pause(300)
            motor_stop()
        elif uartData == "D":
            motor_run(0, 70)
            basic.pause(300)
            motor_stop()
        elif uartData == "G":
            motor_run(80, -80)   
            basic.pause(580) 
            motor_stop()
        elif uartData == "H":
            motor_run(-80, 80)
            basic.pause(580)
            motor_stop()
        elif uartData == "E":
            motor_stop()  
        elif uartData == "F":
            control.reset() 
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    global connected
    basic.show_icon(IconNames.SAD)
    # connected = 0
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def manual_movement():
    global manual
    if manual == False: manual = True
    else: manual = False
    print(manual)    
input.on_button_pressed(Button.A, manual_movement)
 */
// reakční frekvence 20 Hz  
basic.forever(function on_forever() {
    
    let l = pins.digitalReadPin(DigitalPin.P13)
    let r = pins.digitalReadPin(DigitalPin.P14)
    if (l == whiteline && r != whiteline) {
        motor_run(0, 50)
    } else if (l != whiteline && r == whiteline) {
        motor_run(50, 0)
    } else if (l == whiteline && r == whiteline) {
        motor_run(50, 50)
    } else if (l != whiteline && r != whiteline) {
        motor_run(50, 0)
    }
    
    basic.pause(40)
})
