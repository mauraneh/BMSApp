import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { Image, View } from 'react-native';
import { StyleSheet } from 'react-native';


function TopNav() {
  return (
    <View style={styles.container}>
        <FontAwesomeIcon icon={faBars} size={ 40 } color='#4e6c42'/>
        <Image source={require('../assets/icon.png')}/>
      </View>
  );
}

export default TopNav;


const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 30,
  },

});