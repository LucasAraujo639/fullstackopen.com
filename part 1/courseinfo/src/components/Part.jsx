import React from 'react'

export const Part = (props) => {
  return (
    <div>
        <p>{props.parts.name} {props.parts.exercises}</p>
    </div>
  )
}
