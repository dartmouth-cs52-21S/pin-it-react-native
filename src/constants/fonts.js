/* eslint-disable camelcase */
import { RFValue } from 'react-native-responsive-fontsize';
import { StyleSheet } from 'react-native';

const fontStyles = StyleSheet.create({
  smallHeaderTitle: {
    fontSize: RFValue(25),
    color: 'white',
    fontFamily: 'Montserrat_600SemiBold',
  },
  largeHeaderTitle: {
    fontSize: RFValue(30),
    color: 'white',
    fontFamily: 'Montserrat_700Bold',
  },
  smallTextRegular: {
    fontSize: RFValue(11),
    color: 'white',
    fontFamily: 'Montserrat_400Regular',
  },
  smallTextBold: {
    fontSize: RFValue(11),
    color: 'white',
    fontFamily: 'Montserrat_700Bold',
  },
  mediumTextRegular: {
    fontSize: RFValue(15),
    color: 'white',
    fontFamily: 'Montserrat_400Regular',
  },
  mediumTextBold: {
    fontSize: RFValue(15),
    color: 'white',
    fontFamily: 'Montserrat_700Bold',
  },
  largeTextBold: {
    fontSize: RFValue(25),
    color: 'white',
    fontFamily: 'Montserrat_700Bold',
  },
});

export default fontStyles;
