
let alarm = false

serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)

serial.onDataReceived(
    serial.delimiters(Delimiters.NewLine),
    function () {
        let command = serial.readUntil(
            serial.delimiters(Delimiters.NewLine)
        )

        if (command == "소음") {
            alarm = true
        } else if (command == "정적" || command == "대화") {
            alarm = false
            pins.digitalWritePin(DigitalPin.P1, 0)
            pins.digitalWritePin(DigitalPin.P0, 0)
            basic.clearScreen()
        }
    }
)

basic.forever(function () {
    if (alarm) {
        basic.showIcon(IconNames.Angry)

        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P0, 1)
        basic.pause(300)

        basic.clearScreen()
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P0, 0)
        basic.pause(300)
    } else {
        basic.clearScreen()
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P0, 0)
        basic.pause(100)
    }
})
