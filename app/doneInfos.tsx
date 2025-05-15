import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const { width, height } = Dimensions.get("window");

export default function DoneInfos() {
  const [bagacoConvertido, setBagacoConvertido] = useState("0,00");
  const [couroProduzido, setCouroProduzido] = useState("0,00");
  const [bagacoRestante, setBagacoRestante] = useState("0,00");
  const [eficiencia, setEficiencia] = useState("00");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const now = new Date();
      const shortMonthPt = format(now, 'LLL', { locale: ptBR }).toLowerCase();
      const monthNameEn = format(now, "LLLL").toLowerCase();

      try {
        const infosDoc = await getDoc(doc(db, "infos", `info_${shortMonthPt}`));
        console.log(`Buscando em infos/infos_${shortMonthPt}`);
        const bagasse_kg = infosDoc.exists() ? infosDoc.data().bagasse_kg : 0;

        console.log("Bagaco do mes:", bagasse_kg);

        const resgatesDoc = await getDoc(doc(db, 'resgates', monthNameEn));
        const produtosResgatados = resgatesDoc.exists() ? resgatesDoc.data().produtos : {};

        let totalCouro = 0;
        let totalBagacoUsado = 0;

        for (const produtoKey in produtosResgatados) {
          const quantidade = produtosResgatados[produtoKey];
          const productId = produtoKey.replace('produtos_', 'product_');

          const vendaDoc = await getDoc(doc(db, 'vendas', productId));
          if (vendaDoc.exists()) {
            const data = vendaDoc.data();
            totalCouro += Number(data.leather_m2) * quantidade;
            totalBagacoUsado += Number(data.malt_bagasse_kg) * quantidade;
          }
        }

        console.log("Total de bagaco usado:", totalBagacoUsado);
        
        const bagacoRestante = Math.max(0, bagasse_kg - totalBagacoUsado);
        console.log("Bagaco restante:", bagacoRestante);
        const eficiencia = bagasse_kg > 0 ? (totalBagacoUsado / bagasse_kg) * 100 : 0;

        setBagacoConvertido(totalBagacoUsado.toFixed(2).replace('.', ','));
        setCouroProduzido(totalCouro.toFixed(2).replace('.', ','));
        setBagacoRestante(bagacoRestante.toFixed(2).replace('.', ','));
        setEficiencia(eficiencia.toFixed(1).replace('.', ','));

        await setDoc(doc(db, 'grafico', `grafico_${shortMonthPt}`), {
          bagasse_production: Number(totalBagacoUsado.toFixed(2)),
          leather_production: Number(totalCouro.toFixed(2)),
          residuos: Number(bagacoRestante.toFixed(2)),
          eficiencia: Number(eficiencia.toFixed(0)),
        });
        
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = () => {
    router.push("/home");
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>INFORMAÇÕES DO MÊS</Text>

        <View style={styles.content}>
          <View style={styles.infos}>
            <Text style={styles.label}>Bagaço Convertido</Text>
            <Text style={styles.output}>{bagacoConvertido} kg</Text>
          </View>
          <View style={styles.infos}>
            <Text style={styles.label}>Couro Produzido</Text>
            <Text style={styles.output}>{couroProduzido} m²</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.infos}>
            <Text style={styles.label}>Bagaço Restante</Text>
            <Text style={styles.output}>{bagacoRestante} kg</Text>
          </View>
          <View style={styles.infos}>
            <Text style={styles.label}>Eficiência:</Text>
            <Text style={styles.output}>{eficiencia}%</Text>
          </View>
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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.05,
    gap: height * 0.04,
  },
  container: {
    borderColor: "#f3c037",
    borderWidth: 7,
    width: width * 0.9,
    height: "80%",
    paddingVertical: height * 0.02,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: width * 0.06,
    fontWeight: "bold",
    fontFamily: "Inter-VariableFont_opsz,wght",
  },
  content: {
    gap: width * 0.05,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  infos: {
    justifyContent: "center",
    alignItems: "center",
    gap: height * 0.02,
  },
  label: {
    fontSize: width * 0.047,
    fontFamily: "Inter-VariableFont_opsz,wght",
    fontWeight: "bold",
  },
  output: {
    borderColor: "#666",
    borderWidth: 2,
    paddingVertical: height * 0.005,
    width: width * 0.35,
    textAlign: "center",
    color: "#666",
  },
  button: {
    width: width * 0.9,
    backgroundColor: "#f3c037",
    paddingVertical: height * 0.015,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    fontFamily: "Inter-VariableFont_opsz,wght",
  },
});
