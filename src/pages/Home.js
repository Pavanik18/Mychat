import React, {Component} from 'react';
import { FlatList, View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import Login from './Login';
class Home extends Component {
    constructor(props) {
    super(props);
    this.state= {
    	users: []
    };
 }
 componentDisMount() {
 	this.getUserList();
 }
 getUserList=async () => {
 	let that=this;
 	axios.get('http://localhost:8000/userlist')
 	.then(function (response) {
 		if(response&& response.data) {
 			that.setState({users:response.data});
 		} else if(response && response.data && response.data.message) {
 			Toast.show(response.data.message,1000);
 		}
 	})
 	.catch(function (error){
 		console.log(error);
 	})
 }
 handleLoginPress(){
 	console.log("Pavani");
 	
 }
 render(){
 	return(
 		<View style={styles.container}>
 		{this.state.users && this.state.users.length>0?<FlatList
 			data={this.state.users}
 			renderItem={({item}) => <Text style={styles.item} key={item._id}>{item.name}</Text>}
 			/>:null}
 		//<Image source = {Logo} style={styles.image}/>
 		<Text style={styles.display}>Welcome to</Text>
 		<Text style={styles.display}>CHAT</Text>
 		<Text style={styles.display}>Application</Text>
 		
 		</View>
 		);
 }
}
export default Home;
const styles=StyleSheet.create({
	container:{
		flex:1,
		paddingTop:100
	},
	item: {
		padding:10,
		fontSize:18,
		height:44
	}
});