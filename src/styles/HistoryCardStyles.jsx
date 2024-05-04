import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;

const HistoryCardStyles = StyleSheet.create({
  //El que contiene todas las CustomCard
    container: { 
    width: deviceWidth ,
    alignItems: 'center',
    marginTop: 15,
  },
  cardContainer: {
    width: deviceWidth - offset,
    backgroundColor: '#E05E5E',
    height: 150,
    borderRadius: radius,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation:15,
    alignContent:'center'
  },

  titleStyle: {

    borderBottomColor: 'white',
    color:'white',
    alignSelf : 'flex-start',
    fontSize: 20,
    fontWeight: '800',
    marginLeft:10,
    marginTop:5,
  },

  subtitleStyle: {
    //alignSelf : 'flex-start',
    fontSize: 16,
    fontWeight: '800',
    //marginLeft:10,
    marginTop:-2,
  },
  infoStyle: {
    flexDirection:'row',
    marginHorizontal: 15,
    paddingTop:12,
    marginVertical: 5,
  },
  iconTrashStyle: {
    //flexWrap: 'row',
    marginTop:-25,
    marginLeft:280,
  },
  iconTimerStyle: {
    flexDirection: 'row',
    marginTop: 0,
    marginHorizontal:15,
  },
  iconArrowtyle:{
    marginTop:-45,
    marginLeft:268,
  }
});
export default HistoryCardStyles;