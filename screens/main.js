import * as React from "react";
import { StyleSheet, View, Text, SafeAreaView, Platform, ScrollView, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { StatusBar } from "expo-status-bar";  
import { RFValue, RFPercentage} from "react-native-responsive-fontsize"

import Filter1 from "./filter1";
import Filter2 from "./filter2";
import Filter3 from "./filter3";
import Filter4 from "./filter4";
import Filter5 from "./filter5";
import Filter6 from "./filter6";

let data = [
  {
    "id": "1",
    "image": require("../assets/crown-pic.png"),
  },
  {
    "id": "2",
    "image": require("../assets/crown-pic3.png"),
  },
  {
    "id": "3",
    "image": require("../assets/other-pic3.png"),
  },
  {
    "id": "4",
    "image": require("../assets/flower-pic1.png"),
  },
  {
    "id": "5",
    "image": require("../assets/other-pic2.png"),
  },
  {
    "id": "6",
    "image": require("../assets/other-pic1.png"),
  },
]

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            faces: [],
            current_filter: "filter_1"
        };

        this.onFacesDetected = this.onFacesDetected.bind(this)
    }
    async componentDidMount() {
        const { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status === "granted" });
    }
    onFacesDetected({ faces }) {
        this.setState({ faces: faces });
    }
    onFacesDetectionError({ error }){
        console.log(error)
    }
    render() {
        const { hasCameraPermission } = this.state;
        if(hasCameraPermission === null){
            return(<View/>)
        }
        if(hasCameraPermission === false){
            return(
                <View style = {styles.container}>
                    <Text>Access Not Granted</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>

                <SafeAreaView style={styles.safeArea} />

                <View style={styles.headingContainer}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Image style={styles.appIcon} source={require("../assets/appIcon.png")}></Image>
                    <Text style={styles.titleText1}>Look Me</Text>
                    </View>
                </View>

                <View style = {styles.cameraStyle}>
              <Camera
                style={{flex : 1}}
                type={Camera.Constants.Type.front}
                faceDetectorSettings={{
                    mode: FaceDetector.FaceDetectorMode.fast,
                    detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                    runClassifications: FaceDetector.FaceDetectorClassifications.all
                }}
                onFacesDetected={this.onFacesDetected}
                onFacesDetectionError={this.onFacesDetectionError}
                />
                {this.state.faces.map(face => {
                if (this.state.current_filter === "crown-pic1") {
                  return <Filter1 key={face.faceID} face={face} />;
                } else if (this.state.current_filter === "crown-pic3") {
                  return <Filter2 key={face.faceID} face={face} />;
                } else if (this.state.current_filter === "other-pic3") {
                  return <Filter3 key={face.faceID} face={face} />;
                } else if (this.state.current_filter === "flower-pic1") {
                  return <Filter4 key={face.faceID} face={face} />;
                } else if (this.state.current_filter === "other-pic1") {
                  return <Filter5 key={face.faceID} face={face} />;
                }
                else if (this.state.current_filter === "other-pic1") {
                  return <Filter6 key={face.faceID} face={face} />;
                }
              })}
        </View>


                <View style={styles.framesContainer}>
        <ScrollView style={{flexDirection: "row"}} horizontal                showsHorizontalScrollIndicator={false}>

        {data.map(x=>{
          return(
            <TouchableOpacity style={styles.filterImageContainer}
            onPress={()=>{
              this.setState({current_filter: `filter${x.id}`})
            }}
            > 
              <Image source={x.image} style={styles.filters}></Image>
            </TouchableOpacity>
          )
        })} 
        </ScrollView>
        </View>
			</View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    safeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ADD8E6"
    },
    appIcon: {
    width:45,
    height: 45,
    borderRadius: 25
  },

    titleText1: {
    fontSize: RFValue (30),
    fontWeight: "bold",
    color: "#ADD8E6",
    fontStyle: "italic",
    alignSelf: "center",
    textShadowColor: "rgba(0,0,0,139)",
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 1,
	},
	cameraStyle: {
		flex: 0.65,
	},
  framesContainer: {
    flex: 0.2,
    paddingLeft: RFValue(20),
    paddingRight: RFValue(20),
    paddingTop: RFValue(30),
    backgroundColor: "#89CFF0",
  },
  filterImageContainer: {
    height: RFPercentage(8),
    width: RFPercentage(15),
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#E4E7F8",
    borderRadius: 30,
    marginRight: 20
  },
  filters: {
    height: "60%",
    width: "60%",
    alignSelf: "center",
    resizeMode: "contain"

  }
})