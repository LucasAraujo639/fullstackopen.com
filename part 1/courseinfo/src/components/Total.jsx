import React from 'react'

export const Total = (props) => {
  return (
        <p> Number of exercises {props.total.parts[0].exercises + props.total.parts[1].exercises + props.total.parts[2].exercises } </p>
  )
}
