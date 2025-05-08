import { View, Text, StyleSheet, Image, Dimensions, StatusBar, TouchableOpacity, Animated, Modal, Pressable} from "react-native";
import {Slot, useRouter} from 'expo-router';
import { usePathname } from "expo-router";
import {getStatusBarHeight} from 'react-native-status-bar-height';
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { ScrollView, GestureHandlerRootView } from "react-native-gesture-handler";

const {width, height} = Dimensions.get('window');
const statusBarHeight = getStatusBarHeight();

export default function Layout() {
  const [yellowHeaderHeight, setYellowHeaderHeight] = useState(0);

  const [fontsLoaded] = useFonts({
    'InriaSerif-Regular': require('../assets/fonts/InriaSerif-Regular.ttf'),
    'InriaSerif-Bold': require('../assets/fonts/InriaSerif-Bold.ttf'),
    'Inter-VariableFont_opsz,wght': require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    'Judson-Regular': require('../assets/fonts/Judson-Regular.ttf'),
    'Judson-Bold': require('../assets/fonts/Judson-Bold.ttf'),
  });

  const pathname = usePathname();
  const showYellowHeader = pathname !== '/' && pathname !== '/seller' && pathname !== '/infos' && pathname !== '/doneInfos';
  const showBlackHeader = pathname !== '/' && pathname !== '/seller';
  const showFooter = pathname !== '/' && pathname !== '/seller' && pathname !== '/infos' && pathname !== '/doneInfos';
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const [slideAnim] = useState(new Animated.Value(300));

  const handleButtonContactPress = () => {
    router.push('https://g.co/kgs/6x6KZ9e');
  };

  const handleButtonSellerPress = () => {
    router.push('/seller');
  };

  useEffect(() => {
    if (menuVisible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: 300,
        useNativeDriver: true,
      }).start();
    }
  },[menuVisible, slideAnim]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor={'#0c0c0c'}/>
      {showYellowHeader && (
        <>
          <StatusBar backgroundColor={'#f3c037'} />
          <View 
            style={styles.yellowHeader}
            onLayout={(event) => setYellowHeaderHeight(event.nativeEvent.layout.height)}
          >
            <Text style={styles.yellowHeaderText}>APP APENAS PARA MAIORES DE 18 ANOS</Text>
          </View>
        </>
      )}
      
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {showBlackHeader && (
          <View style={[styles.blackHeader, { marginTop: showYellowHeader ? yellowHeaderHeight: 0}]}>
            <Image style={styles.headerMenuImage} source={require('../assets/images/app-images/image 1 (1).png')}/>
            <FontAwesome 
              name="bars"
              size={25}
              color={'#f3c037'}
              onPress={toggleMenu}
            />
          </View>
        )}
        
        <View style={styles.content}>
          <Slot />
        </View>
  
        {showFooter && (
          <TouchableOpacity style={styles.buttonFooter} onPress={handleButtonSellerPress}>
            <Text style={styles.buttonFooterText}>SOU VENDEDOR</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <Modal animationType="none" transparent visible={menuVisible} onRequestClose={toggleMenu}>
        <Pressable style={styles.overlay} onPress={toggleMenu}>
          <Pressable style={{ flex: 1 }} pointerEvents="box-none">
            <Animated.View style={[styles.menu, {transform: [{translateX: slideAnim}] }]}>
              <View style={styles.menuInterface}>
                <View style={styles.menuCloseIcon}>
                  <FontAwesome 
                    name="close"
                    size={40}
                    color={'#f3c037'}
                    onPress={toggleMenu}
                  />
                </View>
                <Text style={styles.menuTitle}>PRODUTOS - COURO VEGETAL 100% VEGANO</Text>
                <View style={styles.centerButton}>
                  <TouchableOpacity style={styles.menuButton}  onPress={handleButtonContactPress}>
                    <FontAwesome 
                      name="phone"
                      size={15}
                      color={'#0c0c0c'}
                    />
                    <Text style={styles.menuButtonText}>ENTRAR EM CONTATO</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.centerImage}>
                  <Image style={styles.headerMenuImage} source={require('../assets/images/app-images/image 1 (1).png')}/>
                  <Text style={styles.slogan}>Tradição em Cada Gole, Paixão em Cada Lote.</Text>
                </View>
                <View style={styles.infos}>
                  <Text style={styles.contact}>Contato</Text>
                  <View style={styles.local}>
                    <FontAwesome 
                      name="map-pin"
                      size={30}
                      color={'#f3c037'}
                    />
                    <Text style={styles.localText}>R. Francisco Nunes, 1944 - Prado Velho, Curitiba - PR</Text>
                  </View>
                  <View style={styles.mail}>
                    <FontAwesome 
                      name="envelope"
                      size={30}
                      color={'#f3c037'}
                    />
                    <Text style={styles.mailText}>contato@cervejariayule.com.br</Text>
                  </View>
                </View>
                <View style={styles.payments}>
                  <FontAwesome 
                    name="cc-visa"
                    size={27}
                    color={'#f3c037'}
                  />
                  <FontAwesome 
                    name="cc-paypal"
                    size={27}
                    color={'#f3c037'}
                  />
                  <FontAwesome 
                    name="cc-mastercard"
                    size={27}
                    color={'#f3c037'}
                  />
                  <FontAwesome5 
                    name="cc-apple-pay"
                    size={27}
                    color={'#f3c037'}
                  />
                </View>
              </View>
            </Animated.View>
          </Pressable>
        </Pressable>
      </Modal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  yellowHeader: {
    width: width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: statusBarHeight - (height * 0.02),
    backgroundColor: '#f3c037',
    borderBottomColor: '#3d3c3c',
    borderBottomWidth: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  yellowHeaderText: {
    fontSize: width * 0.047,
    fontFamily: 'InriaSerif-Bold',
  },
  blackHeader: {
    backgroundColor: '#0c0c0c',
    display: 'flex',
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.025,
    paddingHorizontal: width * 0.1,
  },
  headerMenuImage: {
    width: width * 0.3,
    height: height * 0.1,
  },
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0c0c0c',
    width: width * 0.7,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.03,
    height: height,
  },
  menuInterface: {
    flex: 1,
  },
  menuCloseIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: height * 0.06,
  },
  menuTitle: {
    color: '#fff',
    fontFamily: 'Inter-VariableFont_opsz,wght',
    fontWeight: 'bold',
    fontSize: width * 0.07,
  },
  centerButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: '#f3c037',
    display: 'flex',
    flexDirection: 'row',
    gap: width * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    width: width * 0.6,
    marginTop: height * 0.05,
    marginBottom: height * 0.03,
  },
  menuButtonText: {
    fontFamily: 'Inter-VariableFont_opsz,wght',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  centerImage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: height * 0.02,
  },
  slogan: {
    color: '#8d8d8d',
    fontSize: width * 0.05,
    fontFamily: 'Inter-VariableFont_opsz,wght',
  },
  infos: {
    marginVertical: height * 0.01,
  },
  contact: {
    color: '#fff',
    textAlign: 'center',
    fontSize: width * 0.05,
    fontFamily: 'Judson-Bold',
  },
  local: {
    display: 'flex',
    flexDirection: 'row',
    gap: width * 0.03,
    marginBottom: height * 0.02,
  },
  localText: {
    color: '#8d8d8d',
    fontSize: width * 0.06,
  },
  mail: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mailText: {
    color: '#8d8d8d',
    fontSize: width * 0.04,
  },
  payments: {
    flexDirection: 'row', 
    gap: width * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonFooter: {
    paddingVertical: height * 0.025,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0c0c0c',
    width: width,
  },
  buttonFooterText: {
    color: '#fff',
    fontFamily: 'Inter-VariableFont_opsz,wght',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
});