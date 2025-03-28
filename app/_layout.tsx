import { View, Text, StyleSheet, Image, Dimensions, StatusBar, TouchableOpacity, Animated, Modal} from "react-native";
import {Slot, useRouter} from 'expo-router';
import { usePathname } from "expo-router";
import {getStatusBarHeight} from 'react-native-status-bar-height';
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";

const {width, height} = Dimensions.get('window');
const statusBarHeight = getStatusBarHeight();

export default function Layout() {
  const pathname = usePathname();
  const showHeader = pathname !== '/';
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const [slideAnim] = useState(new Animated.Value(300));

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
    <>
      <StatusBar backgroundColor={'#0c0c0c'}/>
      {showHeader && (
        <>
          <StatusBar backgroundColor={'#f3c037'} />
          <View style={styles.header}>
            <Image source={require("../assets/app-images/image 1 (1).png")} style={styles.headerImage}/>
            <FontAwesome 
              name="bars"
              size={25}
              color={'#f3c037'}
              onPress={toggleMenu}
            />
          </View>
        </>
      )}
      <View style={styles.content}>
        <Slot />
      </View>

      <Modal animationType="none" transparent visible={menuVisible} onRequestClose={toggleMenu}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={toggleMenu}>
          <Animated.View style={[styles.menu, {transform: [{translateX: slideAnim}] }]}>
            <TouchableOpacity style={styles.menuItem} onPress={() => {
              toggleMenu();
            }}>
              <Image style={styles.headerImage} source={require("../assets/app-images/image 1 (1).png")}/>
              <FontAwesome
                name="close"
                size={30}
                color={"#f3c037"} 
              />
              <Text style={styles.menuText}>MENU</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    maxHeight: height * 0.2,
    backgroundColor: '#0c0c0c',
    paddingTop: statusBarHeight + 10,
    paddingBottom: 20,
    paddingHorizontal: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerImage: {
    width: width * 0.2,
    height: height * 0.08,
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
    width: width * 0.6,
    height: '100%',
    backgroundColor: '#0c0c0c',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  menuTitle: {
    fontSize: width * 0.1,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuText: {
    fontSize: width * 0.05,
    marginLeft: 10,
    color: '#ffffff',
  },
});