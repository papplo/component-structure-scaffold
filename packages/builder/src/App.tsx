import { useDeferredValue, useState } from 'react'
import './App.css'
import { EnhancedCard as Card } from './components/enhanced'
import { Button } from './components/stateless/Button'
import { SvgImage } from './components/stateless/SvgImageShape'

function App() {
  const [count, setCount] = useState(0)

  const deferredCount = useDeferredValue(count.toFixed(3).endsWith('000') ? count : count.toFixed(3))

  function sum(n: number, increment = 1) {
    return n + increment
  }

  function divide(n: number, divisor = 1) {
    return n / divisor
  }

  function subtract(n: number, decrement = 1) {
    return n - decrement
  }

  return (
    <>
      <SvgImage width={100} height={100} fillColor={'#00FF00'} sides={Number(deferredCount)} ></SvgImage>
      <h1>{deferredCount}</h1>
      <section style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1280px', columnGap: '3em' }}>
        <Card title='Sum'>
          <Button label={'Sum 1'} onClick={() => setCount((count) => sum(count, 1))} />
          <Button label={'Sum 3'} onClick={() => setCount((count) => sum(count, 3))} />
          <Button label={'Sum 5'} onClick={() => setCount((count) => sum(count, 5))} />
          <button onClick={(event) => {setCount(0); event.stopPropagation()}}>
            Reset
          </button>
          <p>
            In mathematics, the sum is an operation that combines two or more numbers to give a total value. It is a fundamental concept in arithmetic and is often used in various calculations.
            To calculate the sum of two or more numbers, you simply add them together. For example, the sum of 2, 3, and 4 is 2 + 3 + 4 = 9.
          </p>
        </Card>
      <Card title='Division'>
        <Button label={'Divide by 2'} onClick={() => setCount((count) => divide(count, 2))} />
        <Button label={'Divide by 3'} onClick={() => setCount((count) => divide(count, 3))} />
        <Button label={'Divide by 5'} onClick={() => setCount((count) => divide(count, 5))} />
        <button onClick={(event) => {setCount(0); event.stopPropagation()}}>
          Reset
        </button>
        <p>
          In mathematics, the sum is an operation that combines two or more numbers to give a total value. It is a fundamental concept in arithmetic and is often used in various calculations.
          To calculate the sum of two or more numbers, you simply add them together. For example, the sum of 2, 3, and 4 is 2 + 3 + 4 = 9.
        </p>
      </Card>
      <Card title='Subtraction'>
        <Button label={'Subtract 1'} onClick={() => setCount((count) => subtract(count, 1))} />
        <Button label={'Subtract 3'} onClick={() => setCount((count) => subtract(count, 3))} />
        <Button label={'Subtract 5'} onClick={() => setCount((count) => subtract(count, 5))} />
        <button onClick={(event) => {setCount(0); event.stopPropagation()}}>
          Reset
        </button>
        <p>
          In mathematics, the sum is an operation that combines two or more numbers to give a total value. It is a fundamental concept in arithmetic and is often used in various calculations.
          To calculate the sum of two or more numbers, you simply add them together. For example, the sum of 2, 3, and 4 is 2 + 3 + 4 = 9.
        </p>
      </Card>
      </section>

    </>
  )
}

export default App


