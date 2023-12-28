import { useState } from 'react'

const Button = (props) =>(
  <button onClick={props.handlerClick}>{props.text}</button>
)
const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)
const StatisticContent = ({good,neutral,bad,all,calculateAverage,calculatePositive}) => {
  
  if (all === 0) {
    return(
      <p>no feedback given</p>
    )
    
  }
  return (

  <table>
    <tbody>
    <StatisticLine text="good" value={good}/>
    <StatisticLine text="neutral" value={neutral}/>
    <StatisticLine text="bad" value={bad}/>
    <StatisticLine text="all" value={all}/>
    <StatisticLine text="average" value={calculateAverage(good,bad,all)}/>
    <StatisticLine text="positive" value={calculatePositive(good,all) + "%"}/>
    </tbody>

  </table>
  )
}
const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const setToValue = (feedback) => {
    switch (feedback) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        break;
    }
    setAll(all + 1)

  }
  const calculateAverage = (good, bad, all) => {
    return ((good - bad) / all)
  }
  const calculatePositive = (good, all) => {
    return good / all
  }
  return (
    <div>
      <h2>give feedback</h2>
      <Button handlerClick={()=> setToValue("good")} text="good"/>
      <Button handlerClick={()=> setToValue("neutral")} text="neutral"/>
      <Button handlerClick={()=> setToValue("bad")} text="bad"/>

      <h2>statics</h2>
      <StatisticContent
      good={good}
      neutral={neutral}
      bad={bad}
      all={all}
      calculateAverage={calculateAverage}
      calculatePositive={calculatePositive}
      />
    </div>
  )
}


export default App
