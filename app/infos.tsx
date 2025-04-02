import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, StyleSheet, Dimensions} from "react-native";
import { TextInput } from "react-native-gesture-handler";

const {width, height} = Dimensions.get('window');

export default function Infos() {
  const router = useRouter();

  const HandleButtonClick = () => {
    router.push('/doneInfos')
  };

  return(
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>INFORMAÇÕES</Text>
        <View style={styles.content}>
          <View style={styles.form}>
            <Text style={styles.label}>Bagaço Produzido</Text>
            <TextInput
              style={styles.input} 
              placeholder="em kg"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Data da Produção</Text>
            <TextInput 
              style={styles.input}
              placeholder="dd/mm/aaaa"
              autoCapitalize="none"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.formButton}>
          <Text style={styles.buttonText}>SALVAR</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flexDiv}>
        <TouchableOpacity style={styles.button} onPress={HandleButtonClick}>
          <Text style={styles.buttonText}>RESULTADOS</Text>
          <FontAwesome 
            name="arrow-right"
            size={25}
            color='#0c0c0c'
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.05,
    gap: height * 0.04,
  },
  container: {
    borderColor: "#f3c037",
    borderWidth: 7,
    width: width * 0.8,
    height: '80%',
    paddingVertical: height * 0.02,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: width * 0.06,
    fontWeight: 'bold',
    fontFamily: 'Inter-VariableFont_opsz,wght'
  },
  content: {
    gap: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: height * 0.03
  },
  label: {
    fontSize: width * 0.047,
    fontFamily: 'Inter-VariableFont_opsz,wght',
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#0c0c0c',
    borderWidth: 2,
    width: width * 0.6,
    textAlign: 'center',
  },
  formButton: {
    backgroundColor: '#f3c037',
    paddingVertical: height * 0.015,
    width: width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexDiv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: width * 0.8,
    backgroundColor: '#f3c037',
    paddingVertical: height * 0.015,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: width * 0.03,
  },
  buttonText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    fontFamily: 'Inter-VariableFont_opsz,wght',
  },
})