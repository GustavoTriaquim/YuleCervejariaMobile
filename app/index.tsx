import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

const {width, height} = Dimensions.get('window');

export default function Index() {
  const router = useRouter();

  const handleButtonPress = () => {
    router.push('/home');
  };
  
  return(
    <ImageBackground source={require('../assets/app-images/Texture/soft-plaster-texture.jpg')} style={styles.container} resizeMode="cover">
      <View style={styles.content}>
        <Image source={require("../assets/app-images/image 1 (1).png")} style={styles.logo}/>
        <View style={styles.textView}>
          <Text style={styles.text}>BEM-VINDO(A) AO NOSSO CATALOGO DE BRINDES!</Text>
          <Text style={styles.subtext}>Tradicao em Cada Gole, Paixao em Cada Lote.</Text>
        </View>
        <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
          <Text style={styles.buttonText}>VER BRINDES</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: height * 0.15,
    width: width,
  },
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: height * 0.05,
    backgroundColor: '#0c0c0c',
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.05,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.33,
    marginBottom: height * 0.02,
  },
  textView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: height * 0.02,
  },
  text: {
    fontSize: width * 0.06,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtext: {
    fontSize: width * 0.04,
    color: "#8d8d8d",
    textAlign: 'center',
  },
  button: {
    width: width * 0.8,
    height: height * 0.07,
    backgroundColor: "#f3c037",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
  }
})