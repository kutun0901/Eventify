import { View, Text, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { appColors } from '../constants/appColors';
import { fontFamily } from '../constants/fontFamily';
import { globalStyles } from '../styles/globalStyles';

interface Props {
  text: string,
  color?: string,
  size?: number,
  flex?: number,
  font?: string,
  styles?: StyleProp<TextStyle>,
  title?: boolean,
  numOfLine?: number;
}

const TextComponent = (props: Props) => {

  const { text, size, font, flex, color, styles, title, numOfLine } = props;

  return (

    <Text
      numberOfLines={numOfLine}
      style={[
        globalStyles.text,
        {
          color: color ?? appColors.text,
          flex: flex ?? 0,
          fontSize: size ? size : title ? 24 : 14,
          fontFamily: font ? font : title ? fontFamily.medium : fontFamily.regular,

        },
        styles
      ]}
    >{text}</Text>

  )
}

export default TextComponent
