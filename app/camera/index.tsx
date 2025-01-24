import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function CameraScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null)
    const [selectedImage, setSelectedImage] = useState<string | undefined>()
    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={{
                ...styles.container,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10
            }}>
                <Text style={styles.message}>Necesitamos tu permiso para mostrar la cámara</Text>

                <TouchableOpacity onPress={requestPermission}>
                    <ThemedText type='subtitle'>Solicitar permiso</ThemedText>
                </TouchableOpacity>
            </View>
        );
    }

    const onShutterButtonPress = async () => {
        if (!cameraRef.current) return

        const picture = await cameraRef.current.takePictureAsync({
            skipProcessing: true,
            base64: true,
            quality: 0.7,
            exif: true,
        })


        if (!picture?.uri) return

        setSelectedImage(picture.uri)

        console.log(picture)
    }


    const onReturnCancelButtonPress = () => {
        //limpiar estado
        router.dismiss()
    }


    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const onConfirmImageButtonPress = () => {
        //TODO: guardar imagen en la base de datos
    }

    const retakePicture = () => {
        setSelectedImage(undefined)
    }

    if (selectedImage) {
        return (
            <View style={styles.container}>
                <Image source={{ uri: selectedImage }} style={styles.camera} />
                <ReturnCancelButton onPress={onReturnCancelButtonPress} />
                <ConfirmImageButton onPress={onConfirmImageButtonPress} />
                <RetakeImageButton onPress={retakePicture} />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing={facing}>

                {/*<TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Rotar cámara</Text>
          </TouchableOpacity> */}
                <ShutterButton onPress={onShutterButtonPress} />
                <FlipCameraButton onPress={toggleCameraFacing} />
                <GalleryButton onPress={() => { }} />
                <ReturnCancelButton onPress={onReturnCancelButtonPress} />
            </CameraView>
        </View>
    );
}

//custom components

const ShutterButton = ({ onPress = () => { } }) => {
    const dimensions = useWindowDimensions()
    const primaryColor = useThemeColor({}, 'primary')
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.shutterButton, {
                left: dimensions.width / 2 - 32,
                position: 'absolute',
                bottom: 70,
                borderColor: primaryColor
            }]}>
            <Text style={styles.text}>Capturar</Text>
        </TouchableOpacity>
    )
}

const FlipCameraButton = ({ onPress = () => { } }) => {
    const primaryColor = useThemeColor({}, 'primary')
    return (
        <TouchableOpacity style={styles.flipCameraButton} onPress={onPress}>
            <Ionicons name='camera-reverse-outline' size={30} color={'white'} />
        </TouchableOpacity>
    )
}
const GalleryButton = ({ onPress = () => { } }) => {
    const primaryColor = useThemeColor({}, 'primary')
    return (
        <TouchableOpacity style={styles.galleryButton} onPress={onPress}>
            <Ionicons name='images-outline' size={30} color={'white'} />
        </TouchableOpacity>
    )
}

const ReturnCancelButton = ({ onPress = () => { } }) => {
    const primaryColor = useThemeColor({}, 'primary')
    return (
        <TouchableOpacity style={styles.returnCancelButton} onPress={onPress}>
            <Ionicons name='arrow-back-outline' size={30} color={'white'} />
        </TouchableOpacity>
    )
}


const ConfirmImageButton = ({ onPress = () => { } }) => {
    const dimensions = useWindowDimensions()
    const primaryColor = useThemeColor({}, 'primary')
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.shutterButton, {
                left: dimensions.width / 2 - 32,
                position: 'absolute',
                bottom: 70,
                borderColor: primaryColor
            }]}>
            <Ionicons name='checkmark-outline' size={30} color={primaryColor} />
        </TouchableOpacity>
    )
}

const RetakeImageButton = ({ onPress = () => { } }) => {
    const primaryColor = useThemeColor({}, 'primary')
    return (
        <TouchableOpacity style={styles.flipCameraButton} onPress={onPress}>
            <Ionicons name='close-outline' size={30} color={'white'} />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },

    shutterButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'white',
        borderColor: 'red',
        borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    flipCameraButton: {
        width: 50,
        height: 50,
        borderRadius: 32,
        backgroundColor: '#17202A',
        position: 'absolute',
        bottom: 75,
        right: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },

    galleryButton: {
        width: 50,
        height: 50,
        borderRadius: 32,
        backgroundColor: '#17202A',
        position: 'absolute',
        bottom: 75,
        left: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },

    returnCancelButton: {
        width: 50,
        height: 50,
        borderRadius: 32,
        backgroundColor: '#17202A',
        position: 'absolute',
        top: 50,
        left: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
});