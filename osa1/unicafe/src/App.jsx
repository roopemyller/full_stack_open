import { useState } from 'react'

const Button = ({handleClick, text}) =>(
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.total === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good}/>
        <StatisticLine text="neutral" value={props.neutral}/>
        <StatisticLine text="bad" value={props.bad}/>
        <StatisticLine text="all" value={props.total}/>
        <StatisticLine text="average" value={props.average}/>
        <StatisticLine text="positive" value={props.good / props.total * 100 + ' %'}/>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setAll(allClicks.concat(1))
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
    setAll(allClicks.concat(0))
  }
  const handleBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setAll(allClicks.concat(-1))
  }

  const calculateAverage = () => {
    let sum = 0
    allClicks.forEach(num => {
      sum += num
    })
    return sum / allClicks.length
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text={'good'}/>
      <Button handleClick={handleNeutral} text={'neutral'}/>
      <Button handleClick={handleBad} text={'bad'}/>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={calculateAverage()}/>
    </div>
  )
}

export default App