import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, ImageBackground } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const {width, height} = Dimensions.get('window');

export default function Seller() {
  const router = useRouter()

  const HandleFormPress = () => {
    router.push('/infos')
  };

  const HandleButtonPress = () => {
    router.push('/home')
  };

  return(
    <View style={styles.main}>
      <ImageBackground style={styles.container} source={require('../assets/app-images/Texture/soft-plaster-texture.jpg')}>
        <Text style={styles.title}>LOGIN DO VENDEDOR</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>USUÁRIO</Text>
            <TextInput
              style={styles.input}
              placeholder="usuário"
              placeholderTextColor="#f3c037"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>SENHA</Text>
            <TextInput
              style={styles.input} 
              placeholder="senha"
              placeholderTextColor="#f3c037"
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.formButton} onPress={HandleFormPress}>
            <Text style={styles.buttonText}>LOGAR</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={HandleButtonPress}>
        <Text style={styles.buttonText}>VOLTAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: width,
    height: height,
    backgroundColor: '#0c0c0c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width,
    height: height * 0.75,
    paddingVertical: height * 0.03,
    alignItems: 'center',
    gap: height * 0.08,
    borderTopColor: '#f3c037',
    borderTopWidth: 7,
    marginTop: -5,
    marginBottom: -5,
  },
  title: {
    backgroundColor: '#0c0c0c',
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.06,
    color: "#ffffff",
    fontSize: width * 0.07,
    fontFamily: 'Inter-VariableFont_opsz,wght',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: height * 0.06,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: height * 0.02,
  },
  label: {
    fontSize: width * 0.06,
    fontFamily: 'Inter-VariableFont_opsz,wght',
    textAlign: 'center',
  },
  input: {
    width: width * 0.6,
    backgroundColor: '#ffffff',
    borderColor: '#f3c037',
    borderWidth: 2,
    textAlign: 'center',
  },
  formButton: {
    width: width * 0.6,
    backgroundColor: '#f3c037',
    paddingVertical: height * 0.01,
  },
  buttonView: {
    position: 'absolute',
    flex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopColor: "#f3c037",
    borderTopWidth: 7,
    backgroundColor: "#0c0c0c",
    paddingVertical: height * 0.035,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f3c037',
    width: width * 0.6,
    paddingVertical: height * 0.01,
  },
  buttonText: {
    color: '#0c0c0c',
    fontSize: width * 0.06,
    fontFamily: 'Inter-VariableFont_opsz,wght',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})