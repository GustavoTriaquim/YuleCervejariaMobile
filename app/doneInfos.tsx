import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');

export default function DoneInfos() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/home')
  };

  return(
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>INFORMAÇÕES</Text>
        <View style={styles.content}>
          <View style={styles.infos}>
            <Text style={styles.label}>Bagaço Convertido</Text>
            <Text style={styles.output}>(kg)</Text>
          </View>
          <View style={styles.infos}>
            <Text style={styles.label}>Couro Produzido</Text>
            <Text style={styles.output}>(m²)</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.infos}>
            <Text style={styles.label}>Bagaço Perdido</Text>
            <Text style={styles.output}>(kg)</Text>
          </View>
          <View style={styles.infos}>
            <Text style={styles.label}>Bagaço Restante</Text>
            <Text style={styles.output}>(kg)</Text>
          </View>
        </View>
        <View style={styles.infos}>
          <Text style={styles.label}>Eficiência: (%)</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
        <Text style={styles.buttonText}>FEITO</Text>
      </TouchableOpacity>
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
    borderColor: '#f3c037',
    borderWidth: 7,
    width: width * 0.9,
    height: '80%',
    paddingVertical: height * 0.02,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: width * 0.06,
    fontWeight: 'bold',
    fontFamily: 'Inter-VariableFont_opsz,wght',
  },
  content: {
    gap: width * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infos: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: height * 0.02,
  },
  label: {
    fontSize: width * 0.047,
    fontFamily: 'Inter-VariableFont_opsz,wght',
    fontWeight: 'bold',
  },
  output: {
    borderColor: '#666',
    borderWidth: 2,
    paddingVertical: height * 0.005,
    width: width * 0.35,
    textAlign: 'center',
    color: '#666',
  },
  button: {
    width: width * 0.9,
    backgroundColor: '#f3c037',
    paddingVertical: height * 0.015,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    fontFamily: 'Inter-VariableFont_opsz,wght',
  },
})