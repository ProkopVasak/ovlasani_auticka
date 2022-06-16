speedFactor = -100
pin_Trig = DigitalPin.P8
pin_Echo = DigitalPin.P15
l = DigitalPin.P13
r = DigitalPin.P14
whiteline = 0
connected = 0
manual = False

strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
pins.set_pull(l, PinPullMode.PULL_NONE)
pins.set_pull(r, PinPullMode.PULL_NONE)
bluetooth.start_uart_service()
basic.show_string("S")

def motor_run(left = 0, right = 0, speed_factor = 80):
    PCAmotor.motor_run(PCAmotor.Motors.M1, Math.map(Math.constrain(left * (speedFactor / 100), -100, 100), -100, 100, -255, 255))
    PCAmotor.motor_run(PCAmotor.Motors.M2, Math.map(Math.constrain(right * (speedFactor / 100), -100, 100), -100, 100, -255, 255))

def motor_stop():
    PCAmotor.motor_stop(PCAmotor.Motors.M1)
    PCAmotor.motor_stop(PCAmotor.Motors.M2)
def on_bluetooth_connected():
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




def movement():
    global connected
    # if connected ==0:
    def on_forever():
                global manual
            #if manual == True:
                l = pins.digital_read_pin(DigitalPin.P13)
                r = pins.digital_read_pin(DigitalPin.P14)
                if l == whiteline and r != whiteline:
                    motor_run(0, 70)
                elif l != whiteline and r == whiteline:
                    motor_run(70, 0)
                elif l == whiteline and r == whiteline:
                    motor_run(70, 70)
                elif l != whiteline and r != whiteline:
                    motor_run(70, 70)
                basic.pause(40) #reakční frekvence 20 Hz  
            # print(l+""+r)
    basic.forever(on_forever)
basic.forever(movement)
