import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { theme } from './colors';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';

export default function App() {
	const [working, setWorking] = useState(true);
	const [text, setText] = useState('');
	const [toDos, setToDos] = useState({});
	const travel = () => setWorking(false);
	const work = () => setWorking(true);
	const onChangeText = (payload) => setText(payload);
	const addToDo = () => {
		if (text === '') {
			return;
		}
		//save to do
		// const newToDos = Object.assign({}, toDos, {
		// 	[Date.now()]: { text, work: working },
		// });

		const newToDos = { ...toDos, [Date.now()]: { text, work: working } };
		setToDos(newToDos);
		setText('');
		// alert(text);
	};
	console.log(toDos);
	return (
		<View style={styles.container}>
			<StatusBar style='auto' />
			<View style={styles.header}>
				<TouchableOpacity onPress={work}>
					<Text style={{ ...styles.btnText, color: working ? 'white' : theme.gray }}>
						Work
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={travel}>
					<Text
						style={{ ...styles.btnText, color: !working ? 'white' : theme.gray }}>
						Travel
					</Text>
				</TouchableOpacity>
			</View>

			<TextInput
				// keyboardType='number-pad'
				returnKeyType='done'
				onSubmitEditing={addToDo}
				onChangeText={onChangeText}
				value={text}
				placeholder={working ? 'Add a To Do' : 'Where do you want to go?'}
				style={styles.input}
			/>
			<ScrollView>
				{Object.keys(toDos).map((key) => (
					<View style={styles.toDo} key={key}>
						<Text style={styles.toDoText}>{toDos[key].text}</Text>
					</View>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.bg,
		paddingHorizontal: 20,
	},
	header: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginTop: 70,
	},
	btnText: {
		fontSize: 34,
		fontWeight: '600',
	},
	input: {
		backgroundColor: 'white',
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 30,
		marginTop: 20,
		fontSize: 18,
		marginVertical: 20,
	},
	toDo: {
		backgroundColor: theme.toDoBg,
		marginBottom: 18,
		paddingVertical: 20,
		paddingHorizontal: 40,
		borderRadius: 15,
	},
	toDoText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '500',
	},
});
