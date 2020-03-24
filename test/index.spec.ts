import EventHub from '../src/index'

const test1 = message => {
  let event = new EventHub()
  console.assert(event instanceof Object === true)
  console.log(message)
}

const test2 = message => {
  let event = new EventHub()
  let call = false
  event.on('fn1', () => {
    call = true
  })
  event.emit('fn1')
  setTimeout(() => {
    console.assert(call === true)
    console.log(message)
  })
}

const test3 = message => {
  let event = new EventHub()
  event.on('fn1', (...args) => {
    setTimeout(() => {
      console.assert(args[0] === '我是入参')
      console.log(message)
    })
  })
  event.emit('fn1', '我是入参')
}
const test4 = message => {
  let event = new EventHub()
  let call = false
  const fn1 = () => {
    call = true
  }
  event.on('fn1', fn1)
  event.off('fn1', fn1)
  event.emit('fn1')
  setTimeout(() => {
    console.assert(call === false)
    console.log(message)
  })
}

test1('EventHub 可以创建对象')
test2('EventHub 可以发布订阅')
test3('EventHub 可以发布可以传参')
test4('EventHub 可以取消订阅')