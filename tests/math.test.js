const {calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add} = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)

    // if (total !== 13) {
    //     throw new Error('Total tip should be 13! Got ' + total)
    // }
})

test('should calculate total tip with default value', () => {
    const total = calculateTip(24)
    expect(total).toBe(30)
})
test('should convert 32F to 0C', () => {
    const converted = fahrenheitToCelsius(32)
    expect(converted).toBe(0)
})

test('should convert 0 C to 32 F', () => {
    const converted = celsiusToFahrenheit(0)
    expect(converted).toBe(32)
})

// test('async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })

test('Should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })

})

test('Should add two numbers async/await', async () => {
    const sum = await add(4, 3)
    expect(sum).toBe(7)
})
