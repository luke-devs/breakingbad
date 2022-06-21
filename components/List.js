import { PureComponent, memo } from "react";
import { Dimensions, StyleSheet, View, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { Box, Heading, HStack, ZStack, VStack, Text, Divider, Icon, Spinner, Input, Avatar, Select } from "native-base";
import { Feather, Ionicons } from "@native-base/icons";
import { useNavigation } from '@react-navigation/native';

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height; 

const Character = ({...props}) => {
  const navigation = useNavigation();
  const {name, image, occupation, status, nickname, seasonAppearance, better_call_saul_appearance} = props

  return(
      <TouchableOpacity onPress={() => {
          navigation.navigate("Character Info",{
              name: props.name,
              img: props.image,
              occupation: props.occupation,
              status: props.status,
              nickname: props.nickname,
              seasonAppearance: props.seasonAppearance,
              better_call_saul_appearance: better_call_saul_appearance
          });
      }} style={{width: width, paddingVertical: 8, justifyContent: "flex-start"}}>
          <HStack space={4}>
              <Avatar source={{
                   uri: image
              }}/>
              <Text fontSize="md" color={"gray.400"} style={styles.name}>{name}</Text>
              <Icon color={"#b6c1ce"} style={{alignSelf: "center"}} as={Feather} name="chevron-right" size="21px"></Icon>
          </HStack>
      </TouchableOpacity>
  )
}

const ITEM_HEIGHT = 50;

    const getItemLayout = (data, index) => {
        return{
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * data.length,
            index
        }
    }

    const renderItem = ({item}) =>{
      return(
        <View>
          <Character 
              id={item.char_id}
              name={item.name} 
              image={item.img} 
              occupation={item.occupation} 
              status={item.status}
              nickname={item.nickname}
              seasonAppearance={item.appearance}
              better_call_saul_appearance={item.better_call_saul_appearance} />
          <Divider backgroundColor={"#e1e6ec"} my="2" style />
        </View>
      )
    }

export default class FlatListView extends PureComponent {
  
 
    constructor(props: Object) {
      super(props);
      this.state = {
        characters: props.characters
      }
    };

  
    render() {
      return( 
        <FlatList
          data={this.props.characters}
          initialNumToRender={10}
          renderItem={renderItem}
          removeClippedSubviews={true}
        />
      )
    }
  }

  const styles = StyleSheet.create({
      name:{
          alignSelf: "center",
          flex: 0.8,
          fontWeight: "500"
      },
  });