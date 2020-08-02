import React, { Component} from 'react';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { View, Text,TouchableOpacity, TextInput, StyleSheet} from 'react-native';
class Login extends Component {
    constructor(props) {
    super(props);
    this.state ={
    email: '',
    password: '',
    errors: {}
    };
    this.validateForm=this.validateForm.bind(this);
    }

    handleEmail=(text)=>{
    this.setState({email: text})
    }
     handlePassword=(text) => {
    this.setState({password: text})
    }
    login=(email,pass) => {
        alert('email: '+email+'password: '+pass)
    }
    validateForm = () =>{
        const { errors } =this.state;
        const emailaddr=this.state.email;
        const pass=this.state.password;
        const reg=/^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
        if (emailaddr==='') {
            errors.email="Email address cannot be empty.";

        } else if (emailaddr.length >0 && !reg.test(emailaddr)) {
            errors.email="Please provide correct email address";
        } else{
            errors.email='';
        }
        if (pass===''){
            errors.pass ="Password cannot be empty.";
        } else if (pass && pass.length<5) {
            errors.pass="Password should be more than 5 characters";

        } else{
            errors.pass='';
        }
        this.setState({ errors })
        if (errors.email==='' && errors.pass ==='') {
            this.submitForm;
        }
    }
    submitForm=async() => {
        let that=this;
        axios.post('http://localhost:8000/loginuser',{
           email: this.state.email,
           password: this.state.password
        })
        .then(function (response){
            if(response && response.data && response.data._id){
                that.props.navigation.navigate('Home');
            } else {
                Toast.show(response.data.message,500);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    render(){
        const { errors } = this.state;
    return(
        <View style={styles.container}>
        <TextInput style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Email"
        placeholderTextColor="#000"
        autoCapitalize="none"
        onChangeText={this.handleEmail}/>
        <Text style={[styles.errorstyle]}>{errors.email}</Text>
        <TextInput style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Password"
        placeholderTextColor="#000"
        autoCapitalize="none"
        onChangeText={this.handlePassword}/>
        <Text style={[styles.errorstyle]}>{errors.pass}</Text>
        <TouchableOpacity
            style={styles.submitButton}
            onPress={this.validateForm}>
        <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
        </View>
    );
    }
}
export default Login;
const styles=StyleSheet.create({
    container:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    backgroundColor: 'white'
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        width: '70%',
        padding: 10,
        fontSize: 16,
        lineHeight: 20,
        color: '#000',
        borderRadius:7
    },
    submitButton: {
    backgroundColor: '#00cccc',
    padding: 10,
    margin: 15,
    height: 45,
    borderRadius:7
    },
    submitButtonText:{
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'}
})