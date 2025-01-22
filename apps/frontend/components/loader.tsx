import * as React from 'react'

export const Loader = React.memo(() => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={30}
    height={30}
    viewBox='0 0 200 200'
  >
    <circle
      cx='40'
      cy='65'
      r='15'
      fill='#4A7EFF'
      stroke='#4A7EFF'
      strokeWidth='15'
    >
      <animate
        attributeName='cy'
        begin='-0.4'
        calcMode='spline'
        dur='2'
        keySplines='.5 0 .5 1;.5 0 .5 1'
        repeatCount='indefinite'
        values='65;135;65;'
      ></animate>
    </circle>
    <circle
      cx='100'
      cy='65'
      r='15'
      fill='#4A7EFF'
      stroke='#4A7EFF'
      strokeWidth='15'
    >
      <animate
        attributeName='cy'
        begin='-0.2'
        calcMode='spline'
        dur='2'
        keySplines='.5 0 .5 1;.5 0 .5 1'
        repeatCount='indefinite'
        values='65;135;65;'
      ></animate>
    </circle>
    <circle
      cx='160'
      cy='65'
      r='15'
      fill='#4A7EFF'
      stroke='#4A7EFF'
      strokeWidth='15'
    >
      <animate
        attributeName='cy'
        begin='0'
        calcMode='spline'
        dur='2'
        keySplines='.5 0 .5 1;.5 0 .5 1'
        repeatCount='indefinite'
        values='65;135;65;'
      ></animate>
    </circle>
  </svg>
))
