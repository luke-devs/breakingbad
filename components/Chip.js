import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Icon, HStack } from "native-base";
import { Feather } from "@native-base/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"	
import { addBB, removeBB, addBCS, removeBCS } from "../redux/features/filters/filtersSlice"

const Chip = ({ text, value, onPress, show}) => {
    const dispatch = useDispatch();
    const { filters } = useSelector(state => state.filters)
    const [selected, setSelected] = useState(true)
    if(selected){
        return(
            <TouchableOpacity style={styles.buttonEnabled} onPress={() => {
                setSelected(false)
                switch (show) {
                    case "breaking_bad":
                        dispatch(removeBB(value))
                        break;
                    case "better_call_saul":
                        dispatch(removeBCS(value))
                        break;
                
                    default:
                        break;
                }
            }}>
                <HStack style={{justifyContent: "center", alignItems: "center"}}>
                    <Icon as={Feather} name="check" size="20px" color={"blue.500"}></Icon>
                    <Text ml={1} fontWeight={"500"} fontSize={"sm"} color={"blue.500"}>{text}</Text>
                </HStack>
            </TouchableOpacity>
        )
    }else{
        return(
            <TouchableOpacity style={styles.button} onPress={() => {
                setSelected(true)
                switch (show) {
                    case "breaking_bad":
                        dispatch(addBB(value))
                        break;
                    case "better_call_saul":
                        dispatch(addBCS(value))
                        break;
                
                    default:
                        break;
                }
            }}>
                <HStack style={{justifyContent: "center", alignItems: "center"}}>
                    <Text fontWeight={"500"} fontSize={"sm"} color={"gray.400"}>{text}</Text>
                </HStack>
           </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
      margin: 5,
      alignItems: "center",
      justifyContent: "center",
      height: 40,
      width: 111,
      borderColor: "gray",
      borderRadius: 15,
      borderWidth: 1
    },
    buttonEnabled: {
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 111,
        borderColor: "#3b82f6",
        borderRadius: 15,
        borderWidth: 2,
      },
  });

export default Chip;