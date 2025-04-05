import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Dimensions, type ImageSourcePropType } from "react-native";
import { useEffect, useState } from "react";
import { collection, getDoc, setDoc, getDocs, doc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

const { width, height } = Dimensions.get("window");

const images: { [key: string]: ImageSourcePropType } = {
  "product_portacopo": require("../assets/app-images/portacopo.jpg"),
  "product_carteira": require("../assets/app-images/carteira.jpg"),
  "product_capinha": require("../assets/app-images/capinha.jpg"),
};

export default function Products() {
  const [products, setProducts] = useState<{ id: string; name: string; price: string; seller: string }[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "vendas"));
        const productsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "Sem nome",
            price: data.price || "Sem preço",
            seller: data.seller || "Sem vendedor",
          };
        });
        setProducts(productsData);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleRedeem = async (productId: string) => {
    try {
      const now = new Date();
      const monthIndex = now.getMonth();
      const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
      const monthDocId = monthNames[monthIndex].toLowerCase();

      const resgateRef = doc(db, 'resgates', monthDocId);
      const resgateSnap = await getDoc(resgateRef);

      if (resgateSnap.exists()) {
        await updateDoc(resgateRef, {
          quantity: increment(1),
          [`produtos.produtos_${productId.split("product_")[1]}`]: increment(1),
        });
      } else {
        await setDoc(resgateRef, {
          quantity: 1,
          id: monthIndex + 1,
          month: monthNames[monthIndex],
          produtos: { [productId]: 1 },
        });
      }

      alert("BRINDE RESGATADO COM SUCESSO!");
    } catch (error) {
      console.error("Erro ao resgatar brinde:", error);
      alert("Erro ao resgatar brinde. Tente novamente.");
    }
  };

  return (
    <View style={styles.main}>
      {products.length === 0 ? (
        <Text style={styles.text}>Carregando produtos...</Text>
      ) : (
        products.map((product) => (
          <ImageBackground 
            key={product.id}
            style={styles.content} 
            source={require("../assets/app-images/Texture/soft-plaster-texture.jpg")}
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
                  <TouchableOpacity style={styles.button} onPress={() => handleRedeem(product.id)}>
                    <Text style={styles.buttonText}>RESGATAR {product.name}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
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
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: height * 0.04,
    paddingHorizontal: width * 0.05,
    gap: height * 0.03,
  },
  infos: {
    gap: height * 0.01,
    justifyContent: "center",
    alignItems: "center",
  },
  texts: {
    gap: height * 0.03,
  },
  text: {
    textAlign: "center",
    fontSize: width * 0.08,
    fontFamily: "Inter-VariableFont_opsz,wght",
    fontWeight: "bold",
  },
  image: {
    width: width * 0.5,
    height: height * 0.25,
  },
  seller: {
    fontSize: width * 0.04,
    fontFamily: "Inter-VariableFont_opsz,wght",
  },
  button: {
    width: width * 0.7,
    backgroundColor: "#f3c037",
    paddingVertical: height * 0.015,
  },
  buttonText: {
    textAlign: "center",
    fontSize: width * 0.045,
    fontFamily: "Inter-VariableFont_opsz,wght",
    fontWeight: "bold",
  },
});
