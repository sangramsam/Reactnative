/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Button,
    BackAndroid,
    ListView,
    TextInput,
    Text,
    ActivityIndicator,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import {Actions, Scene, Router, Animations} from 'react-native-router-flux'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        return fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson),
                }, function () {
                    // do something with new state
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            );
        }
        return (<View style={{flex: 1}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text style={styles.red}>Title {rowData.title} \n,
                        Body {rowData.body}</Text>}
                />
            </View>
        );
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', password: ''};
        this._onPressButton = this._onPressButton.bind(this);
    }

    _onPressButton() {
        if (this.state.text === 'sam' && this.state.password === "123") {
            Actions.Home();
        } else {
            ToastAndroid.show('Username / password wrong', ToastAndroid.SHORT);
        }
    }

    onFocus() {
        this.setState({
            backgroundColor: 'green'
        })
    }

    onBlur() {
        this.setState({
                backgroundColor: '#ededed'
            }
        )
    }

    render() {
        let pic = {
            uri: 'https://www.appinessworld.com/images/appiness-logo.png'
        };

        return (
            <View style={styles.container}>
                <TextInput
                    style={{
                        width: 300,
                        borderColor: this.state.backgroundColor || '#ccc',
                        borderWidth: 1,
                        padding: 20,
                        paddingTop: 10,
                        paddingBottom: 10,
                        marginBottom: 0,
                        borderBottom: 0,
                        borderTopLeftRadius:2
                    }}
                    placeholder="Username" underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({text})} onBlur={() => this.onBlur()}
                    onFocus={() => this.onFocus()}
                />
                <TextInput
                    style={{
                        width: 300,
                        borderColor: this.state.backgroundColor || '#ccc',
                        borderWidth: 1,
                        padding: 20,
                        paddingTop: 10,
                        paddingBottom: 10,
                        marginBottom: 0,
                        borderBottom: 0,
                        borderBottomLeftRadius:2

                    }}
                    placeholder="password"
                    onChangeText={(password) => this.setState({password})} onBlur={() => this.onBlur()}
                    onFocus={() => this.onFocus()}
                />
                <View style={{flexDirection: 'column', height: 100, width: 300}}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: '#0BB67A',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop:10
                        }}
                        onPress={this._onPressButton}>
                        <Text style={styles.whiteFont}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: '#D81D49',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop:10
                        }}>
                        <Text style={styles.whiteFont}>Login without password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="Login" component={Login} title="Login / Register"/>
        <Scene key="Home" component={Home} title="Home"/>
    </Scene>
);
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            return true
        });
    }

    render() {
        return <Router scenes={scenes}/>
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    red: {
        color: 'red',
    },
    whiteFont: {
        color: 'white'
    },

});
