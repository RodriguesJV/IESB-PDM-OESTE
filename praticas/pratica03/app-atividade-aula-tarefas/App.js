import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import MetaList from './components/MetaInput'; 
import MetaList from './components/MetaList'; 
import MetaInput from './components/MetaInput';


export default function App() {
  
  const[metas, setMetas] = useState([]);


  function adicionarMetaHandler(inputMeta){
    setMetas([...metas, inputMeta]);
  }


  return (
    <View style={styles.mainContainer}>
        <MetaInput onAddMeta = {adicionarMetaHandler} />
      <View style={styles.metaContainer}>
        <MetaList array = {metas} />
      </View>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  metaContainer:{
    flex:15,
  }
  
});