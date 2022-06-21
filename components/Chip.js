import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Icon, HStack } from "native-base";
import { Feather } from "@native-base/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"	
import { add, remove } from "../redux/features/filters/filtersSlice"

const Chip = ({ text, value, onPress}) => {
    const dispatch = useDispatch();
    const { filters } = useSelector(state => state.filters)
    const [selected, setSelected] = useState(false)
    if(selected){
        return(
            <TouchableOpacity style={styles.buttonEnabled} onPress={(value) => {
                setSelected(false)
                dispatch(remove(value))
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
                dispatch(add(value))
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