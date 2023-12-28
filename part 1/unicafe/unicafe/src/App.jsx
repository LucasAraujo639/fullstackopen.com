import { useState } from 'react'

const Button = (props) =>(
  <button onClick={props.handlerClick}>{props.text}</button>
)
const Display = (props) => (
  <p> {props.text + " "+ props.value}</p>
)
const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
  }
  return (
    <div>
      <Button handlerClick={()=> setToValue("good")} text="good"/>
      <Button handlerClick={()=> setToValue("neutral")} text="neutral"/>
      <Button handlerClick={()=> setToValue("bad")} text="bad"/>
      <Display text="good" value={good}/>
      <Display text="neutral" value={neutral}/>
      <Display text="bad" value={bad}/>
    </div>
  )
}


export default App
