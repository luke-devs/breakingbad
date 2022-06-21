import { useEffect, useState, useRef, useMemo, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux"	
import { StyleSheet, View, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { Box, Heading, HStack, ZStack, VStack, Text, Divider, Icon, Spinner, Input, Avatar, Select } from "native-base";
import { Feather, Ionicons } from "@native-base/icons";
import { getCharacters } from "../redux/features/characters/charactersSlice";
import { Dimensions } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Chip from "../components/Chip"

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height; 

const CharacterList = ({navigation}) =>{

    const filters = useSelector(state => state.filters.filters)
    const { characters, status } = useSelector(state => state.characters)
    const dispatch = useDispatch();

    
    const [filter, setFilter] = useState("")
    const handleChange = text => setFilter(text);

    const [trayIndex, setTrayIndex] = useState(-1)

    const bottomSheetRef = useRef(null);

    const snapPoints = useMemo(() => ['40%'], []);

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
    }, [dispatch])

    const Character = ({...props}) => {
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

    const renderItem = useCallback(
        ({item}) => <View>
                        <Character 
                            name={item.name} 
                            image={item.img} 
                            occupation={item.occupation} 
                            status={item.status}
                            nickname={item.nickname}
                            seasonAppearance={item.appearance}
                            better_call_saul_appearance={item.better_call_saul_appearance} />
                        <Divider backgroundColor={"#e1e6ec"} my="2" style />
                     </View>, []
    )

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
                    <FlatList
                        fadingEdgeLength={70}
                        showsVerticalScrollIndicator={false}
                        data={characters}
                        extraData={characters}
                        renderItem={renderItem}
                        getItemLayout={getItemLayout}
                        keyExtractor={item => item.char_id}
                        windowSize={10}
                        initialNumToRender={5}
                        maxToRenderPerBatch={8}
                        updateCellsBatchingPeriod={100}
                    />
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
                            <View style={{flex: 1, flexDirection: "row", flexWrap: "wrap"}} alignItems="flex-start">
                                <Chip text={"Season 1"} value={1}/>
                                <Chip text={"Season 2"} value={2}/>
                                <Chip text={"Season 3"} value={3}/>
                                <Chip text={"Season 4"} value={4}/>
                                <Chip text={"Season 5"} value={5}/>
                            </View>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                bottomSheetRef.current.close()
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
        flex: 0.8
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
