import { useEffect, useState, useRef, useMemo, useCallback, PureComponent } from "react";
import { useDispatch, useSelector } from "react-redux"	
import { StyleSheet, View, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { Box, Heading, HStack, ZStack, VStack, Text, Divider, Icon, Spinner, Input, Avatar, Select } from "native-base";
import { Feather, Ionicons } from "@native-base/icons";
import { getCharacters } from "../redux/features/characters/charactersSlice";
import { Dimensions } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Chip from "../components/Chip"
import FlatListView from "../components/List"

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height; 

const CharacterList = ({navigation}) =>{

    const filtersBB = useSelector(state => state.filters.filters_bb)
    const filtersBCS = useSelector(state => state.filters.filters_bcs)
    const { characters, status } = useSelector(state => state.characters)
    const dispatch = useDispatch();

    const [data, setData] = useState([])
    const [filter, setFilter] = useState("")

    const handleChange = (text) => {
        setFilter(text);
        const filteredData = characters.filter(item => item.name.includes(text))
        setData(filteredData)
    }

    const [trayIndex, setTrayIndex] = useState(-1)

    const bottomSheetRef = useRef(null);

    const snapPoints = useMemo(() => ['65%'], []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const renderBackdrop = useCallback(
        (props) => (
          <BottomSheetBackdrop
            {...props}
            pressBehavior={"close"}
            disappearsOnIndex={-1}
          />
        ),
        []
      );

    useEffect(() => {
        dispatch(getCharacters())
        setData(characters)
    }, [dispatch])

    if(status == "loading") return(
        <Box style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Spinner color="#ea6161" size="lg" />
        </Box>
    )

    return(
        <SafeAreaView style={styles.container}>
                <Box h={height * 0.95}>
                    <Heading style={styles.heading} color={"gray.400"}>Characters</Heading>
                    <HStack space={3} style={{marginBottom: 25}}>
                        <Input value={filter} color={"gray.400"} placeholderTextColor={"#b6c1ce"} borderColor={"#e5e9ee"} onChangeText={handleChange} borderRadius={10} size="md" w={{
                            base: "84%",
                            md: "25%"
                        }} InputLeftElement={<Icon as={<Feather name="search" />} size={4} ml="2" color="gray.100" />} placeholder="Search" />
                        <TouchableOpacity style={styles.filter} onPress={() => {
                                bottomSheetRef.current.expand();
                            }}>
                            <Icon as={Feather} name="sliders" size="md" color={"white"} />
                        </TouchableOpacity>
                    </HStack>
                    <FlatListView characters={data.length == 0 ? characters : data}/>
                </Box>
                <BottomSheet
                        ref={(ref) => (bottomSheetRef.current = ref)}
                        index={trayIndex}
                        animateOnMount={false}
                        backdropComponent={renderBackdrop}
                        enablePanDownToClose
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                    >
                        <View style={styles.contentContainer}>
                        <Heading ml={3} size={"md"} style={styles.heading} color={"gray.400"}>Filter by season</Heading>
                            <VStack ml={3} mb={4}>
                                <Text fontSize={"md"} color={"gray.400"}>Breaking Bad</Text>    
                            </VStack>
                            <Box mb={5} style={{flexDirection: "row", flexWrap: "wrap"}} alignItems="flex-start">
                                <Chip text={"Season 1"} value={1} show={"breaking_bad"}/>
                                <Chip text={"Season 2"} value={2} show={"breaking_bad"}/>
                                <Chip text={"Season 3"} value={3} show={"breaking_bad"}/>
                                <Chip text={"Season 4"} value={4} show={"breaking_bad"}/>
                                <Chip text={"Season 5"} value={5} show={"breaking_bad"}/>
                            </Box>
                            <VStack ml={3} mb={4}>
                                <Text fontSize={"md"} color={"gray.400"}>Better Call Saul</Text>    
                            </VStack>
                            <Box mb={10} style={{flexDirection: "row", flexWrap: "wrap"}} alignItems="flex-start">
                                <Chip text={"Season 1"} value={1} show={"better_call_saul"}/>
                                <Chip text={"Season 2"} value={2} show={"better_call_saul"}/>
                                <Chip text={"Season 3"} value={3} show={"better_call_saul"}/>
                                <Chip text={"Season 4"} value={4} show={"better_call_saul"}/>
                                <Chip text={"Season 5"} value={5} show={"better_call_saul"}/>
                            </Box>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                bottomSheetRef.current.close()
                                var arr = [];
                                for (let index = 0; index < characters.length; index++) {
                                    const character = characters[index];
                                    if(filtersBB.some(r=> character.appearance.includes(r)) || filtersBCS.some(s => character.better_call_saul_appearance.includes(s))){
                                        arr.push(character)
                                    }
                                }
                                setData(arr)
                            }}>
                                <Text fontWeight={"600"} color={"white"} fontSize={"md"}>View Results</Text>
                            </TouchableOpacity>
                        </View>
                </BottomSheet>
        </SafeAreaView>
    )
}

export default CharacterList;

const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex:1,
      paddingTop: 50,
      paddingHorizontal: 25
    },
    contentContainer:{
        paddingHorizontal: 10,
        marginTop: 15,
        flex: 1
    },
    heading:{
        alignSelf: "stretch",
        textAlign: "left",
        marginBottom: 25
    },
    name:{
        alignSelf: "center",
        flex: 0.8,
        fontWeight: "500"
    },
    gradient:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 40,
        height: height * 0.2,
    },
    filter:{
        width: 45,
        height: 45,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#ea6161"
    },
    button:{
        marginLeft: 20,
        borderRadius: 15,
        backgroundColor: "#ea6161",
        width: width * 0.75, 
        height: 55,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center"
    }
  });
