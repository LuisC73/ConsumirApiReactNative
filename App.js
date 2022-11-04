import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [sid, setId] = useState("");

  /*  const getUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const json = await response.json();
      setData(json); //recibe todo los usuarios si todo esta bien
    } catch (error) {
      console.error(error); // si hay error en obtener la info de la api
    } finally {
      setLoading(false); // si o si ejecuta esta linea cuando finalice el try catch, asi se valla por el catch o con try
    }
  }; */

  const getClientes = async () => {
    try {
      const url = `http://172.16.61.225:3000/api/clientes`;
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveCliente = async () => {
    if (!nombre.trim() || !apellidos.trim()) {
      alert("Nombre y apellidos inválido");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `http://172.16.61.225:3000/api/clientes`,
        {
          nombre,
          apellidos,
        }
      );
      alert("Cliente agregado correctamente ...");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCliente = async (id) => {
    if (!nombre.trim() || !apellidos.trim()) {
      alert("Nombre y apellidos inválido");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(
        `http://172.16.61.225:3000/api/clientes/${id}`,
        {
          nombre,
          apellidos,
        }
      );
      alert("Cliente actualizado correctamente ...");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCliente = async (id) => {
    try {
      if (confirm("Esta seguro de eliminar el cliente")) {
        const response = await axios.delete(
          `http://172.16.61.225:3000/api/clientes/${id}`,
          {
            nombre,
            apellidos,
          }
        );
        alert("Cliente Eliminado exitosamente ...");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // getUsers();
    getClientes(); //
  }, []); //con poner ,[] hago que ejecute la funcion getMovies(); una vez, si los borro hago que se ejecuta una y otra vez.

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <View>
        <TouchableOpacity
          style={{ backgroundColor: "green" }}
          onPress={() => getClientes()}
        >
          <Text style={{ color: "white" }}>Listar Clientes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "green", marginTop: 10, marginBottom: 5 }}
          onPress={saveCliente}
        >
          <Text style={{ color: "white" }}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "green", marginTop: 10, marginBottom: 5 }}
          onPress={() => updateCliente(sid)}
        >
          <Text style={{ color: "white" }}>Actualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "green", marginTop: 10, marginBottom: 5 }}
          onPress={() => deleteCliente(sid)}
        >
          <Text style={{ color: "white" }}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "maroon", marginTop: 10, marginBottom: 5 }}
          onPress={() => getClientesPorId(sid)}
        >
          <Text style={{ color: "white" }}>Buscar por Id</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.wrapper}>
          <TextInput
            placeholder="Id del Cliente a Buscar"
            placeholderTextColor="orange"
            style={styles.input}
            value={sid}
            onChangeText={(sid) => setId(sid)}
          />
          <TextInput
            placeholder="Nombre"
            placeholderTextColor="orange"
            style={styles.input}
            value={nombre}
            //editable={!isLoading}
            onChangeText={(nombre) => setNombre(nombre)}
          />
          <TextInput
            placeholder="Apellidos"
            placeholderTextColor="red"
            style={styles.input}
            value={apellidos}
            onChangeText={(apellidos) => setApellidos(apellidos)}
          />
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>
              {item._id} - {item.nombre} - {item.apellidos}
            </Text>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  botones: {
    borderRadius: 10,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    marginBottom: 10,
  },
});
