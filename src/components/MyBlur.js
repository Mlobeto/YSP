  import {
  add,
  Circle,
  Canvas,
  LinearGradient,
  vec,
  sub,
  Fill,
  useLoop,
  mix,
  BackdropFilter,
  Blur,
  useComputedValue} from '@shopify/react-native-skia'
 import * as React from 'react'
 import {Dimensions} from 'react-native'

  const { width, height} = Dimensions.get('window')
  const c = vec(width /2, (height /2)*1.5)
  const r = c.x - 32

 export default function MyBlur() {
      const progress= useLoop({duration: 5000})
      const start = useComputedValue(
          ()=> sub(c, vec(0, mix(progress.current, r, r))),
      [progress],
      )
      const end= useComputedValue(
          ()=> sub(c, vec(0, mix(progress.current, r, r/2))),
      [progress],
      )

      const radius = useComputedValue(
          ()=> mix(progress.current, r, r/2),
      [progress],
      )
     return(
         <Canvas style = {{width:'100%', height:'100%', position: 'absolute'}}>
         <Fill color={'#e5e8ef'}/>
         <Circle c={c} r={radius}>
         <LinearGradient
         start={start}
         end={end}
         colors={['#fca311', '#f6bd60']}

         />
         </Circle>
         <BackdropFilter filter ={< Blur blur={20}/>}></BackdropFilter>
         <Fill color={'#DFE3E610'}/>
         </Canvas>

     )

 }