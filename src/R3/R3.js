import React, { useState } from 'react'


const R3 = ({test}) => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Cl</button>
      <p>{test}</p>
    </div>
  )
}
export default R3
