import React, { useState, useEffect, useCallback, useRef} from 'react';
import { View, Image, Text, ActivityIndicator, KeyboardAvoidingView, Modal, Dimensions, TextInput, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    AmigosContainer,
    ModalContainer,
    ModalImagesListContainer,
    ModalImagesList,
    ModalImageItem,
    ModalButtons,
    CameraButtonContainer,
    CancelButtonText,
    ContinueButtonText,
    TakePictureButtonContainer,
    TakePictureButtonLabel
} from './styles';
import Api from '../../Service';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ImageEditor from '@react-native-community/image-editor';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-root-toast';
import { RNCamera } from 'react-native-camera';
const Tabs = createMaterialTopTabNavigator();

const Perfil = (props) => {
    const [info, setInfo] = useState();
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [cameraModalOpened, setCameraModalOpened] = useState(false);
    const [images, setImages] = useState([]);
    const camera = useRef(null);

    async function getInfo() {
        const data = await Api.get('/users');
        setInfo(data.data || null);
    }

    useEffect(() => {
        getInfo();
    }, []);

    const w = (Dimensions.get('window').width / 2) - 20;

    if (!info) {
        return (
            <View style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color="#f4511e" size={80}></ActivityIndicator>
            </View>
        );
    } else {
        return (
            <KeyboardAvoidingView
                behavior={'position'}
                enabled
                style={{
                    backgroundColor: '#eee',
                    height: '100%',
                    alignItems: 'center',
                }}
            >
                <View style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 10,
                }}>
                    <TouchableOpacity onPress={() => {
                        setCameraModalOpened(!cameraModalOpened);
                    }}>
                        <Image style={{
                        width: 150,
                        height: 150
                    }} source={require('../../../assets/profile.png')} />
                    </TouchableOpacity>
                    
                    <Text>{info.name} {info.surname}</Text>
                    <Text style={{
                        color: '#999',
                        marginTop: 5,
                        marginBottom: 10
                    }}>{info.email}</Text>
                </View>

                <View 
                    style={{
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        paddingLeft: 30,
                        marginTop: 10
                    }}
                >
                    <TextInput
                        secureTextEntry={true}
                        style={{
                            height: 50,
                        }}
                        backgroundColor="#fff"
                        placeholder="Senha Atual"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Icon 
                    style={{
                        position: 'absolute',
                        left: 5
                    }} 
                    name="lock" size={20} />
                </View>
                <View 
                    style={{
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        paddingLeft: 30,
                        marginTop: 10,
                    }}
                >
                    <TextInput
                        secureTextEntry={true}
                        style={{
                            height: 50,
                        }}
                        backgroundColor="#fff"
                        placeholder="Nova Senha"
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <Icon 
                    style={{
                        position: 'absolute',
                        left: 5
                    }} 
                    name="lock" size={20} />
                </View>

                <View 
                    style={{
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        paddingLeft: 30,
                        marginTop: 10
                    }}
                >
                    <TextInput
                        secureTextEntry={true}
                        style={{
                            height: 50,
                        }}
                        backgroundColor="#fff"
                        placeholder="Cofirme a nova senha"
                        value={newPasswordConfirm}
                        onChangeText={setNewPasswordConfirm}
                    />
                    <Icon 
                    style={{
                        position: 'absolute',
                        left: 5
                    }} 
                    name="lock" size={20} />
                </View>
                <TouchableOpacity style={{
                    backgroundColor: '#f4511e',
                    borderRadius: 5,
                    padding: 15,
                    marginTop: 25,
                    alignSelf: 'center'
                }}
                    onPress={() => {
                        if (password && newPassword && newPasswordConfirm && newPassword == newPasswordConfirm) {
                            setLoading(true);
                            Api.put('users', {
                                oldPassword: password,
                                password: newPassword,
                                confirmPassword: newPasswordConfirm
                            }).then(d => {
                                setLoading(false);
                            }).catch(e => {
                                Toast.show('Ocorreu um erro.', {
                                    duration: Toast.durations.SHORT,
                                    position: Toast.positions.BOTTOM,
                                    shadow: true,
                                    animation: true,
                                    hideOnPress: true,
                                });
                                setLoading(false);
                            })
                        } else {
                            Toast.show('Verifique os campos.', {
                                duration: Toast.durations.SHORT,
                                position: Toast.positions.BOTTOM,
                                shadow: true,
                                animation: true,
                                hideOnPress: true,
                            });
                        }
                    }}
                >
                    {!loading &&
                        <Text style={{
                            color: '#fff',
                            textAlign: 'center',
                            fontSize: 16
                        }}>Atualizar senha</Text>
                    }

                    {loading &&
                        <ActivityIndicator color="#fff" size={30}></ActivityIndicator>
                    }
                </TouchableOpacity>
                <Modal
                    visible={cameraModalOpened}
                    transparent={false}
                    animationType="slide"
                    onRequestClose={() => setCameraModalOpened(!cameraModalOpened)}
                    >
                    <ModalContainer>
                        <ModalContainer>
                        <RNCamera
                            ref={camera}
                            style={{ flex: 1 }}
                            type={RNCamera.Constants.Type.back}
                            autoFocus={RNCamera.Constants.AutoFocus.on}
                            flashMode={RNCamera.Constants.FlashMode.off}
                            androidCameraPermissionOptions={{
                                title: "Permissão para usar camêra",
                                message: "Precisamos da sua permissão para acessar a camêra do seu celular."
                            }}
                        />
                        <TakePictureButtonContainer onPress={async () => {
                            if (camera) {
                                const options = { quality: 0.5, base64: true, forceUpOrientation: true, fixOrientation: true, };
                                const data = await camera.current.takePictureAsync(options)
                                const { uri, width, height, type } = data;
                                const cropData = {
                                    // 2b) By cropping from (0, 0) to (imgWidth, imgHeight),
                                    //    we maintain the original image's dimensions
                                    offset: { x: 0, y: 0 },
                                    size: { width, height },
                        
                                    // 2c) Use the displaySize option to specify the new image size
                                    displaySize: { width: width/5, height: height / 5 },
                                  };
                                const cropped = await ImageEditor.cropImage(uri, cropData);
                                data['uri'] = cropped;
                                setImages([...images, data]);
                            }
                        }}>
                            <TakePictureButtonLabel />
                        </TakePictureButtonContainer>
                        </ModalContainer>
                        { images.length > 0 && 
                            <ModalImagesListContainer>
                                <ModalImagesList horizontal>
                                { images.map((image, imgIndex) => (
                                    <ModalImageItem key={imgIndex} source={{ uri: image.uri }} resizeMode="stretch" />
                                ))}
                                </ModalImagesList>
                            </ModalImagesListContainer>
                        }
                        <ModalButtons>
                        <CameraButtonContainer onPress={() => setCameraModalOpened(!cameraModalOpened)}>
                            <CancelButtonText>Cancelar</CancelButtonText>
                        </CameraButtonContainer>
                        <CameraButtonContainer onPress={() => {
                            setCameraModalOpened(!cameraModalOpened);

                            const imagesData = new FormData();
                            images.forEach((image, index) => {
                                imagesData.append('file', {
                                    uri: image.uri.replace('file:///', 'file://'),
                                    type: 'image/jpeg',
                                    name: `${new Date().getTime()}_${index}_${info.name}${info.surname}.jpeg`,
                                });
                            });
                            Api.post('/files', imagesData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            }).then(d => console.log(d)).catch(e => {
                                Object.keys(e).forEach(x => {
                                    console.log(x, e[x]);
                                })
                            }); 

                          /*   fetch("http://192.168.15.13:2424/files", {
                                method: "POST",
                                body: imagesData,
                                headers: {
                                    Accept: "application/json",
                                    'Content-Type': 'multipart/form-data; boundary=sjwoqpaokswiplei'
                                }
                            })
                                .then(response => {
                                console.log("upload succes", response);
                              
                                })
                                  .catch(error => {
                                console.log("upload error", JSON.stringify(error));
                              
                                }); */

                        }}>
                            <ContinueButtonText>Continuar</ContinueButtonText>
                        </CameraButtonContainer>
                        </ModalButtons>
                    </ModalContainer>
                    </Modal>
        </KeyboardAvoidingView>
        );
    }
}

function Amigos(props) {
    const [input, setInput] = useState('');
    const [amigos, setAmigos] = useState();
    const [loadingIndexes, setLoadingIndexes] = useState([]);
    const [doneIndexes, setDoneIndexes] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    async function getAmigos() {
        const data = await Api.get('/user-friend/listFriendsAndInvites');
        setAmigos(data.data || []);
        setLoadingIndexes([]);
        setDoneIndexes([]);
        return true;
    }

    useEffect(() => {
        getAmigos();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAmigos().then(() => setRefreshing(false));
    }, []);

    return (
        <>
            {!amigos &&
                <View style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator color="#f4511e" size={30}></ActivityIndicator>
                    <Text>Resgatando sua lista de amigos...</Text>
                </View>
            }

            {amigos && amigos.length == 0 &&
                <AmigosContainer {...props} 
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    } 
                    style={{height: '100%'}}
                    contentContainerStyle={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            textAlign: 'center',
                            marginTop: 30
                        }}>Você ainda não tem amigos.</Text>
                </AmigosContainer>
            }

            {amigos && amigos.length > 0 &&
            <>
                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10
                }}>
                    <View 
                        style={{
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            paddingLeft: 30,
                            marginTop: 10
                        }}
                    >
                        <TextInput
                            style={{
                                height: 50,
                            }}
                            backgroundColor="#fff"
                            placeholder="Pesquisar"
                            value={input}
                            onChangeText={setInput}
                        />
                        <Icon 
                        style={{
                            position: 'absolute',
                            left: 5
                        }} 
                        name="magnify" color="#f4511e" size={20} />
                    </View>
                </View>
                <AmigosContainer {...props} 
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {amigos.map((v,i) => {
                        if (input.length == 0 || `${v.name} ${v.surname}`.toLowerCase().includes(input.toLowerCase())) {
                            return (
                                <View key={i} style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    padding: 10,
                                    marginBottom: 10 
                                }}>
                                    <View style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Image style={{
                                            width: 50,
                                            height: 50,
                                            marginRight: 10
                                        }} source={require('../../../assets/profile.png')} />
                                        <Text>{v.name} {v.surname} </Text>
                                    </View>
                                    
                                    {loadingIndexes.includes(i) && 
                                        <View
                                            style={{
                                                borderRadius: 5,
                                                backgroundColor: '#f4511e',
                                                padding: 5
                                            }}
                                        >
                                            <ActivityIndicator color="white"></ActivityIndicator>
                                        </View>
                                    }

                                    {v.tipo == 'Amigo' &&
                                        !loadingIndexes.includes(i) && 
                                        <TouchableOpacity
                                            style={{
                                                borderRadius: 5,
                                                backgroundColor: '#f4511e',
                                                padding: 5
                                            }}
                                            onPress={() => {
                                                setLoadingIndexes([...loadingIndexes, i]);
                                                Api.post('/user-friend/removeFriend', {
                                                    friend_id: v.id
                                                }).then(res => {
                                                    if (res.data) {
                                                        Toast.show('Convite aceitado com sucesso.', {
                                                            duration: Toast.durations.SHORT,
                                                            position: Toast.positions.BOTTOM,
                                                            shadow: true,
                                                            animation: true,
                                                            hideOnPress: true,
                                                        });
                                                        let newList = amigos.filter((value, index) => index != i);
                                                        setAmigos(newList);
                                                    }
                                                    const newLoadingIndexes = loadingIndexes.filter(x => x != i);
                                                    setLoadingIndexes(newLoadingIndexes);
                                                }).catch(e => {
                                                    Toast.show('Ocorreu um erro, tente novamente.', {
                                                        duration: Toast.durations.SHORT,
                                                        position: Toast.positions.BOTTOM,
                                                        shadow: true,
                                                        animation: true,
                                                        hideOnPress: true,
                                                    });
                                                    const newLoadingIndexes = loadingIndexes.filter(x => x != i);
                                                    setLoadingIndexes(newLoadingIndexes);
                                                })
                                            }}
                                        >
                                            <Text style={{ color: 'white' }}>Desfazer</Text>
                                        </TouchableOpacity>
                                    }

                                    {v.tipo == 'ConviteRecebido' &&
                                        !loadingIndexes.includes(i) && 
                                        <View style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <TouchableOpacity
                                                style={{
                                                    borderRadius: 5,
                                                    backgroundColor: '#37ad55',
                                                    padding: 5,
                                                    paddingHorizontal: 8,
                                                    marginRight: 5
                                                }}
                                                onPress={() => {
                                                    Api.post('/user-friend/accepted', {
                                                        requestor_id: v.id,
                                                        accepted: true
                                                    }).then(res => {
                                                        if (res.data) {
                                                            Toast.show('Convite aceitado com sucesso.', {
                                                                duration: Toast.durations.SHORT,
                                                                position: Toast.positions.BOTTOM,
                                                                shadow: true,
                                                                animation: true,
                                                                hideOnPress: true,
                                                            });
                                                            let tmp = amigos[i];
                                                            let newList = amigos.filter((value, index) => index != i);
                                                            tmp['tipo'] = 'Amigo';
                                                            newList.push(tmp);
                                                            setAmigos(newList);
                                                        }
                                                        const newLoadingIndexes = loadingIndexes.filter(x => x != i);
                                                        setLoadingIndexes(newLoadingIndexes);
                                                    }).catch(e => {
                                                        Toast.show('Ocorreu um erro, tente novamente.', {
                                                            duration: Toast.durations.SHORT,
                                                            position: Toast.positions.BOTTOM,
                                                            shadow: true,
                                                            animation: true,
                                                            hideOnPress: true,
                                                        });
                                                        const newLoadingIndexes = loadingIndexes.filter(x => x != i);
                                                        setLoadingIndexes(newLoadingIndexes);
                                                    })
                                                }}
                                            >
                                                <Text style={{ color: 'white' }}>Aceitar</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={{
                                                    padding: 5
                                                }}
                                                onPress={() => {
                                                    Api.post('/user-friend/accepted', {
                                                        requestor_id: v.id,
                                                        accepted: false
                                                    }).then(res => {
                                                        if (res.data) {
                                                            Toast.show('Convite recusado com sucesso.', {
                                                                duration: Toast.durations.SHORT,
                                                                position: Toast.positions.BOTTOM,
                                                                shadow: true,
                                                                animation: true,
                                                                hideOnPress: true,
                                                            });
                                                        }
                                                        const newLoadingIndexes = loadingIndexes.filter(x => x != i);
                                                        setLoadingIndexes(newLoadingIndexes);
                                                        const newList = amigos.filter((value, index) => index != i);
                                                        setAmigos(newList);
                                                    }).catch(e => {
                                                        Toast.show('Ocorreu um erro, tente novamente.', {
                                                            duration: Toast.durations.SHORT,
                                                            position: Toast.positions.BOTTOM,
                                                            shadow: true,
                                                            animation: true,
                                                            hideOnPress: true,
                                                        });
                                                        const newLoadingIndexes = loadingIndexes.filter(x => x != i);
                                                        setLoadingIndexes(newLoadingIndexes);
                                                    })
                                                }}
                                            >
                                                <Text style={{ color: '#f4511e' }}>Recusar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }

                                    {v.tipo == 'ConviteEnviado' &&
                                        !loadingIndexes.includes(i) && 
                                        <TouchableOpacity
                                            style={{
                                                padding: 5
                                            }}
                                            onPress={() => {
                                                Api.post('/user-friend/cancelInvite', {
                                                    requested_id: v.id
                                                }).then(res => {
                                                    if (res.data) {
                                                        Toast.show('Convite cancelado.', {
                                                            duration: Toast.durations.SHORT,
                                                            position: Toast.positions.BOTTOM,
                                                            shadow: true,
                                                            animation: true,
                                                            hideOnPress: true,
                                                        });
                                                    }
                                                    const newLoadingIndexes = loadingIndexes.filter(x => x != i);
                                                    setLoadingIndexes(newLoadingIndexes);
                                                    const newList = amigos.filter((value, index) => index != i);
                                                    setAmigos(newList);
                                                }).catch(e => {
                                                    Toast.show('Ocorreu um erro, tente novamente.', {
                                                        duration: Toast.durations.SHORT,
                                                        position: Toast.positions.BOTTOM,
                                                        shadow: true,
                                                        animation: true,
                                                        hideOnPress: true,
                                                    });
                                                    const newLoadingIndexes = loadingIndexes.filter(x => x != i);
                                                    setLoadingIndexes(newLoadingIndexes);
                                                });
                                            }}
                                        >
                                            <Text style={{ color: '#f4511e' }}>Cancelar Convite</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            );
                        }
                    })
                    }
                </AmigosContainer>   
                </>
            }
        </>
    );
}

function Encontre(props) {
    const [input, setInput] = useState('');
    const [usuarios, setUsuarios] = useState();
    const [loadingIndexes, setLoadingIndexes] = useState([]);
    const [doneIndexes, setDoneIndexes] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    async function getUsuarios() {
        const d = await Api.get('/user-friend/users');
        setUsuarios(d.data);
        setLoadingIndexes([]);
        setDoneIndexes([]);
        return true;
    }

    useEffect(() => {   
        getUsuarios();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getUsuarios().then(() => setRefreshing(false));
    }, []);

    return (
        <>
            {!usuarios &&
                <View style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator color="#f4511e" size={30}></ActivityIndicator>
                    <Text>Resgatando sua lista de amigos...</Text>
                </View>
            }

            {usuarios && usuarios.length == 0 &&
                <AmigosContainer {...props}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                    style={{height: '100%'}}
                    contentContainerStyle={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{
                        textAlign: 'center',
                        marginTop: 30
                    }}>Ninguém encontrado para adicionar.</Text>
                </AmigosContainer>
            }

            {usuarios && usuarios.length > 0 &&
                <>
                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10
                }}>
                    <View 
                        style={{
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            paddingLeft: 30,
                            marginTop: 10
                        }}
                    >
                        <TextInput
                            style={{
                                height: 50,
                            }}
                            backgroundColor="#fff"
                            placeholder="Pesquisar"
                            value={input}
                            onChangeText={setInput}
                        />
                        <Icon 
                        style={{
                            position: 'absolute',
                            left: 5
                        }} 
                        name="magnify" color="#f4511e" size={20} />
                    </View>
                </View>
                <AmigosContainer {...props}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {usuarios.map((v,i) => {
                        if (input.length == 0 || `${v.name} ${v.surname}`.toLowerCase().includes(input.toLowerCase())) {
                            return (
                                <View key={i} style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    padding: 10,
                                    marginBottom: 10 
                                }}>
                                    <View style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Image style={{
                                            width: 50,
                                            height: 50,
                                            marginRight: 10
                                        }} source={require('../../../assets/profile.png')} />
                                        <Text>{v.name} {v.surname}</Text>
                                    </View>
                                    {loadingIndexes.includes(i) && 
                                        <View
                                            style={{
                                                borderRadius: 5,
                                                backgroundColor: '#f4511e',
                                                padding: 5
                                            }}
                                        >
                                            <ActivityIndicator color="white"></ActivityIndicator>
                                        </View>
                                    }
                                    
                                    {doneIndexes.includes(i) &&
                                        <View  style={{
                                            borderRadius: 5,
                                            backgroundColor: '#f4511e',
                                            padding: 5,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Icon 
                                                style={{
                                                    marginRight: 5
                                                }} 
                                                name="check" color="white" size={22} />
                                            <Text style={{ color: 'white' }}>Enviado</Text>
                                        </View>
                                    }
                                    
                                    {!loadingIndexes.includes(i) && !doneIndexes.includes(i) && 
                                        <TouchableOpacity
                                            style={{
                                                borderRadius: 5,
                                                backgroundColor: '#f4511e',
                                                padding: 5
                                            }}
                                            onPress={() => {
                                                setLoadingIndexes([...loadingIndexes, i]);
                                                Api.post('/user-friend', {
                                                    requested_id: v.id
                                                }).then(res => {
                                                    Toast.show(res.data.success == false ? res.data.message : 'Convite enviado com sucesso.', {
                                                        duration: Toast.durations.SHORT,
                                                        position: Toast.positions.BOTTOM,
                                                        shadow: true,
                                                        animation: true,
                                                        hideOnPress: true,
                                                    });
                                                    
                                                    const newLoadingIndexes = loadingIndexes.filter(x => x != i);
                                                    setLoadingIndexes(newLoadingIndexes);
                                                    setDoneIndexes([...doneIndexes, i]);
                                                }).catch(e => console.log(e))
                                            }}
                                        >
                                            <Text style={{ color: 'white' }}>Enviar convite</Text>
                                        </TouchableOpacity>
                                    }

                                </View>
                            ); 
                        }
                    })
                }
                </AmigosContainer> 
                </>   
            }
        </>
    );
}


function TabsComponent(props) {
    const [propsState, setPropsState] = useState(props);
    return (
        <Tabs.Navigator lazy={true} lazyPlaceholder={() => (<Text>Loading...</Text>)}>
            <Tabs.Screen 
                name="Perfil"
                options={{
                    title: 'Perfil'
                }}
                children={ props => <Perfil {...props} user={propsState.user} />} />
            <Tabs.Screen 
                name="Amigos"
                options={{
                    title: 'Amizades'
                }}
                children={ props => <Amigos isInvite={true} {...props} user={propsState.user} />} />

            <Tabs.Screen 
                name="EncontrarPessoas"
                options={{
                    title: 'Encontre Pessoas'
                }}
                children={ props => <Encontre isInvite={true} {...props} user={propsState.user} />} />
        </Tabs.Navigator>
    );
}

export default TabsComponent;