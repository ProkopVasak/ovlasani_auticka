radio.set_group(92)
radio.set_transmit_power(7)
def on_forever():
    basic.show_icon(IconNames.HEART)
forever(on_forever)

def turn_left():
    radio.send_value("turn", 1)
input.on_button_pressed(Button.A, turn_left)

def turn_right():
    radio.send_value("turn", 2)
input.on_button_pressed(Button.B, turn_right)

def go_forward():
    radio.send_value("move", 1)
input.on_logo_event(TouchButtonEvent.PRESSED, go_forward)

def go_back():
    radio.send_value("move", 2)
input.on_pin_pressed(TouchPin.P2, go_back)

def stop():
    radio.send_value("stop", 1)
input.on_pin_pressed(TouchPin.P0, stop)
