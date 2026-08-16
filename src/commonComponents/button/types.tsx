interface CustomButtonProps {
  onPress?: () => void
  title: string
  backgroundColor?: string
  color?: string
  margin?: number
  loading?: boolean
  borderColor?: string
  borderWidth?: string | number | any;
  activeOpacity?: any,
  textDecorationLine?:any
  // Blocks presses without showing the loading spinner, for a button that is
  // visible but not yet actionable.
  disabled?: boolean
}

export default CustomButtonProps
