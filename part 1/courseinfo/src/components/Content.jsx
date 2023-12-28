import React from 'react'
import { Part } from './Part'

export const Content = (props) => {
  return (
    <div>
        <Part parts={props.course.parts[0]}/>
        <Part parts={props.course.parts[1]}/>
        <Part parts={props.course.parts[2]}/>
    </div>
  )
}
