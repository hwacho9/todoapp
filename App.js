import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { theme } from './colors';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native';

const STORAGE_KEY = '@toDos';

export default function App() {
	const [working, setWorking] = useState(true);
	const [text, setText] = useState('');
	const [toDos, setToDos] = useState({});
	const travel = () => setWorking(false);
	const work = () => setWorking(true);
	const onChangeText = (payload) => setText(payload);
	const saveToDos = async (toSave) => {
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
	};
	const loadToDos = async () => {
		const s = await AsyncStorage.getItem(STORAGE_KEY);
		setToDos(JSON.parse(s));
		console.log(JSON.parse(s));
	};
	// similar with local storage
	useEffect(() => {
		loadToDos();
	}, []);

	const addToDo = async () => {
		if (text === '') {
			return;
		}
		//save to do
		// const newToDos = Object.assign({}, toDos, {
		// 	[Date.now()]: { text, work: working },
		// });

		const newToDos = { ...toDos, [Date.now()]: { text, working } };
		setToDos(newToDos);
		await saveToDos(newToDos);
		setText('');
		// alert(text);
	};
	// console.log(toDos);
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
				{Object.keys(toDos).map((key) =>
					toDos[key].working === working ? (
						<View style={styles.toDo} key={key}>
							<Text style={styles.toDoText}>{toDos[key].text}</Text>
						</View>
					) : null,
				)}
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
