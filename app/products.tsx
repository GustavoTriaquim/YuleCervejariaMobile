import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView } from "react-native";

const {width, height} = Dimensions.get('window');

export default function Products() {
  return(
    <View style={styles.main}>
      <ImageBackground style={styles.content} source={require('../assets/app-images/Texture/soft-plaster-texture.jpg')}>
        <View style={styles.overlay}>
          <View style={styles.infos}>
            <View style={styles.texts}>
              <Text style={styles.text}>PRODUTO 1</Text>
              <Image style={styles.image} source={require('../assets/app-images/portacopo.jpg')}/>
              <Text style={styles.text}>R$00,00</Text>
            </View>
            <View style={styles.infos}>
              <Text style={styles.seller}>Vendido por: Yule Brewery</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>RESGATAR PRODUTO 1</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>

      <ImageBackground style={styles.content} source={require('../assets/app-images/Texture/soft-plaster-texture.jpg')}>
        <View style={styles.overlay}>
          <View style={styles.infos}>
            <View style={styles.texts}>
              <Text style={styles.text}>PRODUTO 2</Text>
              <Image style={styles.image} source={require('../assets/app-images/carteira.jpg')}/>
              <Text style={styles.text}>R$00,00</Text>
            </View>
            <View style={styles.infos}>
              <Text style={styles.seller}>Vendido por: Yule Brewery</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>RESGATAR PRODUTO 2</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>

      <ImageBackground style={styles.content} source={require('../assets/app-images/Texture/soft-plaster-texture.jpg')}>
        <View style={styles.overlay}>
          <View style={styles.infos}>
            <View style={styles.texts}>
              <Text style={styles.text}>PRODUTO 3</Text>
              <Image style={styles.image} source={require('../assets/app-images/capinha.jpg')}/>
              <Text style={styles.text}>R$00,00</Text>
            </View>
            <View style={styles.infos}>
              <Text style={styles.seller}>Vendido por: Yule Brewery</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>RESGATAR PRODUTO 3</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
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