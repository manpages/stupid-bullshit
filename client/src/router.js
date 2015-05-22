import React from 'react/addons'

function li(xs) {
  return xs.map((x, k) => <li key={k + '->' + x}>{x}</li>)
}

export default ([head, ...tail]) => {
  console.log(head)
  console.log(tail)
  if (!head) return <h1>Root</h1>
  return <div>
    <h1>Controller: {head}</h1>
    <span>Args: <ul>{ li(tail) }</ul></span>
  </div>
}
