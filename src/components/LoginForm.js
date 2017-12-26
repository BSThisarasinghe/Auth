import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import firebase from 'firebase';
import Button from './common/Button';
import Card from './common/Card';
import CardSection from './common/CardSection';
import { Spinner } from './common/Spinner';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log In
            </Button>
        );
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed', loading: false });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: '',
        });
    }

    render() {
        return (
            <Card>
                <CardSection style={styles.containerStyle}>
                    <Text style={styles.labelStyle}>Email</Text>
                    <TextInput
                        placeholder="user@gmail.com"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        style={styles.inputStyle}
                    />
                </CardSection>
                <CardSection style={styles.containerStyle}>
                    <Text style={styles.labelStyle}>Password</Text>
                    <TextInput
                        secureTextEntry
                        placeholder="password"
                        autoCorrect={false}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                        style={styles.inputStyle}
                    />
                </CardSection>
                <Text style={styles.errorStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        heght: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export { LoginForm };