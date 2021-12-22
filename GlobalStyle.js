import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    cell:{
        flex: 1, justifyContent: "space-between", flexDirection: "row", marginHorizontal: 30
    },
    iconeFeed: {
      width: 40, height: 40
    },
    basicText: {
      color: "white"
    },
    basicTitle: {
      color: "white",
      fontWeight: "bold"
    },
    bonusText: {
      color: "gold",
      fontWeight: "bold",
    },
    imageChallenge: {
        width: 100, height: 100, alignSelf: "center", marginVertical: 10
    },
  });

  export default styles