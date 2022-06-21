import { StyleSheet, View, FlatList, SafeAreaView, Image, TouchableOpacity, StatusBar } from "react-native";
import { Dimensions } from "react-native";
import { Box, Heading, HStack, Text, Icon, VStack, ZStack, Divider } from "native-base";
import { Feather } from "@native-base/icons";
import { LinearGradient } from 'expo-linear-gradient';

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height; 

const CharacterInfo = ({route, navigation}) => {
    const { name, img, occupation, status, nickname, seasonAppearance, better_call_saul_appearance } = route.params;

    return(
        <SafeAreaView style={{flex: 1}}>
            <Box style={styles.container}>
                <Image style={styles.mainImage} source={{
                        uri: img,
                }}/>
                <LinearGradient
                    colors={['rgba(15,15,15,15)', 'rgba(1,1,1,0)']}
                    style={styles.gradient}
                />
                <VStack style={{paddingTop: width * 0.1, position: "absolute"}}>
                    <HStack>
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                        }} style={{alignSelf: "center", marginRight: 10}}>
                            <Icon as={Feather} ml={3} name="chevron-left" size="30px" color={"white"}></Icon>
                        </TouchableOpacity>
                        <Heading ml={2} color={"white"}>{name}</Heading>
                    </HStack>
                    <Text size={"sm"} ml={60} color={"white"}>AKA - {nickname}</Text>
                </VStack>
                <VStack space={3} style={styles.infoPane}>
                    <HStack ml={4} mt={5}>
                        <Icon mr={2} as={Feather} name="briefcase" size="24px" color={"gray.400"}></Icon>
                        <Text style={styles.subheading} fontSize={"md"} color={"gray.400"}>Occupation</Text>
                    </HStack>
                    <Divider backgroundColor={"#e1e6ec"} my="1" style />
                    <HStack ml={4}>
                        <Text style={styles.text} fontSize={"sm"} color={"gray.400"}>{occupation.join(' / ')}</Text>
                    </HStack>
                    <HStack ml={4} mt={5}>
                        <Icon mr={2} as={Feather} name="activity" size="24px" color={"gray.400"}></Icon>
                        <Text style={styles.subheading} fontSize={"md"} color={"gray.400"}>Status</Text>
                    </HStack>
                    <Divider backgroundColor={"#e1e6ec"} my="1" style />
                    <HStack ml={4}>
                        <Text style={styles.text} fontSize={"sm"} color={"gray.400"}>{status}</Text>
                    </HStack>
                    <HStack ml={4} mt={5}>
                        <Icon mr={2} as={Feather} name="tv" size="24px" color={"gray.400"}></Icon>
                        <Text style={styles.subheading} fontSize={"md"} color={"gray.400"}>Season Appearance</Text>
                    </HStack>
                    <Divider backgroundColor={"#e1e6ec"} my="1" style />
                    <VStack space={2}>
                        {seasonAppearance.length == 0 ? null :  <HStack ml={4}>
                            <Text style={styles.text} fontSize={"sm"} color={"gray.400"}>{"Breaking Bad - " + seasonAppearance.join(', ')}</Text>
                        </HStack>}
                        {better_call_saul_appearance.length == 0 ? null :  <HStack ml={4}>
                            <Text style={styles.text} fontSize={"sm"} color={"gray.400"}>{"Better Call Saul - " + better_call_saul_appearance.join(', ')}</Text>
                        </HStack>}
                    </VStack>
                </VStack>
            </Box>
        </SafeAreaView>
    )
}


export default CharacterInfo;

const styles = StyleSheet.create({
    container: {
      paddingTop: 5,
      flex: 1,
    },
    heading:{
        alignSelf: "stretch",
        textAlign: "left",
        marginBottom: 30
    },
    mainImage: {
        width: width,
        height: height / 1.8
    },
    gradient:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: height * 0.2,
    },
    infoPane: {
        position: "absolute",
        backgroundColor: "white",
        height: "55%",
        paddingHorizontal: 15,
        paddingTop: 10,
        bottom: -45,
        borderRadius: 15,
        width: width
    },
    subheading: {
        fontWeight: "600",
        alignSelf: "center",
        width: "85%"
    },
    text:{
        fontWeight: "400"
    }
  });