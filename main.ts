radio.setGroup(92)
radio.setTransmitPower(7)
forever(function on_forever() {
    basic.showIcon(IconNames.Heart)
})
input.onButtonPressed(Button.A, function turn_left() {
    radio.sendValue("turn", 1)
})
input.onButtonPressed(Button.B, function turn_right() {
    radio.sendValue("turn", 2)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function go_forward() {
    radio.sendValue("move", 1)
})
input.onPinPressed(TouchPin.P2, function go_back() {
    radio.sendValue("move", 2)
})
input.onPinPressed(TouchPin.P0, function stop() {
    radio.sendValue("stop", 1)
})
