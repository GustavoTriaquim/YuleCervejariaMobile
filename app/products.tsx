import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Dimensions, type ImageSourcePropType} from "react-native";
import data from '../assets/data/data.json';

const {width, height} = Dimensions.get('window');

const images: { [key: number]: ImageSourcePropType } = {
  1: require("../assets/app-images/portacopo.jpg"),
  2: require("../assets/app-images/carteira.jpg"),
  3: require("../assets/app-images/capinha.jpg"),
} as const;

export default function Products() {
  return(
    <View style={styles.main}>
      {data.products.map((product) => (
        <ImageBackground 
          key={product.id}
          style={styles.content} 
          source={require('../assets/app-images/Texture/soft-plaster-texture.jpg')}
        >
          <View style={styles.overlay}>
            <View style={styles.infos}>
              <View style={styles.texts}>
                <Text style={styles.text}>{product.name}</Text>
                <Image 
                  style={styles.image} 
                  source={images[product.id]}
                />
                <Text style={styles.text}>{product.price}</Text>
              </View>
              <View style={styles.infos}>
                <Text style={styles.seller}>Vendido por: {product.seller}</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>RESGATAR {product.name}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    paddingVertical: height * 0.05,
  },
  content: {
    width: width,
    height: height * 0.6,
    marginBottom: height * 0.05,
  },
  overlay: {
    width: width,
    height: height * 0.6,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.04,
    paddingHorizontal: width * 0.05,
    gap: height * 0.03,
  },
  infos: {
    gap: height * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texts: {
    gap: height * 0.03,
  },
  text: {
    textAlign: 'center',
    fontSize: width * 0.08,
    fontFamily: 'Inter-VariableFont_opsz,wght',
    fontWeight: 'bold',
  },
  image: {
    width: width * 0.5,
    height: height * 0.25,
  },
  seller: {
    fontSize: width * 0.04,
    fontFamily: 'Inter-VariableFont_opsz,wght',
  },
  button: {
    width: width * 0.7,
    backgroundColor: '#f3c037',
    paddingVertical: height * 0.015,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: width * 0.045,
    fontFamily: 'Inter-VariableFont_opsz,wght',
    fontWeight: 'bold',
  },
})