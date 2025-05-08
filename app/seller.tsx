import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, ImageBackground } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { useState } from "react";

const {width, height} = Dimensions.get('window');

export default function Seller() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorUser, setErrorUser] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [authError, setAuthError] = useState(false);

  const router = useRouter()

  const HandleFormPress = async () => {
    setErrorUser(false);
    setErrorPass(false);
    setAuthError(false);

    if (username.trim() === '' || password.trim() === '') {
      setErrorUser(username.trim() === '');
      setErrorPass(password.trim() === '');
    };

    try {
      const docRef = doc(db, 'login', 'seller_login');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        if (data.username !== username) {
          setErrorUser(true);
          setUsername('');
          alert('ALGUMA INFORMAÇÃO ESTÁ INCORRETA!')
        }

        if (data.password !== password) {
          setErrorPass(true);
          setPassword('ALGUMA INFORMAÇÃO ESTÁ INCORRETA!');
        }

        if (data.username === username && data.password === password) {
          console.log('Login bem-sucedido!');
          router.push('/infos');
        } else {
          setAuthError(true);
          setUsername('');
          setPassword('');
        }
      } else {
        setAuthError(true);
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      console.error('Erro na autenticacao:', error);
      setUsername('');
      setPassword('');
    }
  };

  const HandleButtonPress = () => {
    router.push('/home')
  };

  return(
    <View style={styles.main}>
      <ImageBackground style={styles.container} source={require('../assets/images/app-images/Texture/soft-plaster-texture.jpg')}>
        <Text style={styles.title}>LOGIN DO VENDEDOR</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>USUÁRIO</Text>
            <TextInput
              style={[styles.input, (errorUser || authError) && styles.errorInput]}
              placeholder='usuário'
              placeholderTextColor={authError || errorUser ? 'red' : '#f3c037'}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>SENHA</Text>
            <TextInput
              style={[styles.input, (errorPass || authError) && styles.errorInput]}
              placeholder='senha'
              placeholderTextColor={authError || errorPass ? 'red' : '#f3c037'}
              value={password}
              onChangeText={setPassword}
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
  errorInput: {
    width: width * 0.6,
    backgroundColor: '#ffffff',
    borderColor: 'red',
    borderWidth: 2,
    textAlign: 'center'
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