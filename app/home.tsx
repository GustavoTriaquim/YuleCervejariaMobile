import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, ImageBackground, Image } from "react-native";
import { useRouter } from "expo-router";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get('window');

// Definindo as imagens com id
const images = [
  { id: '1', source: require('../assets/app-images/portacopo.jpg') },
  { id: '2', source: require('../assets/app-images/carteira.jpg') },
  { id: '3', source: require('../assets/app-images/capinha.jpg') },
];

export default function Home() {
  const router = useRouter();

  const handleButtonPress = () => {
    router.push('/products');
  };

  return (
    <View style={styles.main}>
      <ImageBackground style={styles.content} source={require('../assets/app-images/Texture/soft-plaster-texture.jpg')}>
        <View style={styles.overlay}>
          <View style={styles.texts}>
            <Text style={styles.title}>Nossos Produtos</Text>
            <Text style={styles.subtitle}>Brindes e Utensílios Reaproveitados Especialmene Para Você</Text>
          </View>
          
          {/* Swiper Substituindo a Imagem */}
          <Swiper 
            style={styles.wrapper} 
            showsButtons={false}
            showsPagination={false} 
            loop 
            autoplay
          >
            {images.map((image) => (
              <View key={image.id} style={styles.slide}>
                <Image source={image.source} style={styles.image} />
              </View>
            ))}
          </Swiper>

          <View style={styles.buttons}>
            <View style={styles.buttonsIcon}>
              <TouchableOpacity style={styles.buttonIcon}>
                <FontAwesome
                  name="leaf"
                  size={35}
                  color={'#f3c037'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonIcon}>
                <FontAwesome5
                  name="lightbulb"
                  size={35}
                  color={'#f3c037'}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
              <Text style={styles.buttonText}>RESGATAR BRINDE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: width,
    height: height * 0.65,
  },
  overlay: {
    width: width,
    height: height * 0.65,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: height * 0.04,
    paddingHorizontal: width * 0.05,
    gap: height * 0.03,
  },
  texts: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: height * 0.01,
  },
  title: {
    fontSize: width * 0.045,
    color: '#f3c037',
    fontFamily: 'Judson-Bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: width * 0.057,
    fontFamily: 'Judson-Bold',
    color: '#0c0c0c',
  },
  wrapper: {
    height: height * 0.6,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.65,
    height: height * 0.25,
    resizeMode: 'contain',
  },
  buttons: {
    gap: height * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.45,
  },
  buttonIcon: {
    backgroundColor: '#0c0c0c',
    width: width * 0.15,
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f3c037',
    width: width * 0.7,
    paddingVertical: height * 0.015,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: width * 0.045,
    fontFamily: 'Inter-VariableFont_opsz,wght',
    fontWeight: 'bold',
  },
});
