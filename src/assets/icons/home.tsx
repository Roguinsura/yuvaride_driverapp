import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import SvgComponentProps from './type'

/*
  Pitched-roof house with an arched door. Replaces the original rounded-blob
  outline, which read as a shield more than a house at tab size. Stroke weight
  and joins match the other tab icons (dashboard, car, settings).
*/
const SvgComponent: React.FC<SvgComponentProps> = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M2.75 10.4 10.87 3.4a1.73 1.73 0 0 1 2.26 0l8.12 7"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M4.6 9v10.3c0 1 .8 1.8 1.8 1.8h11.2c1 0 1.8-.8 1.8-1.8V9"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M9.5 21.1v-4.9a2.5 2.5 0 0 1 5 0v4.9"
    />
  </Svg>
)
export default SvgComponent
