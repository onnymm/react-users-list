// import Title from './components/Title';
import UsersList from './components/UsersList';
// import Test from './Test';

const USERS = [
	{
		name: 'Pablo Castellanos',
		active: true,
		role: 'teacher'
	}
];

// const USERS1 = [
// 	{
// 		name: 'Pablo Castellanos',
// 		active: true,
// 		role: 'teacher'
// 	},
// 	{
// 		name: 'José Miguel Fernández',
// 		active: true,
// 		role: 'teacher'
// 	},
// 	{
// 		name: 'Javier López',
// 		active: false,
// 		role: 'student'
// 	}
// ];

const App = () => (
	<UsersList users={USERS}>
		{/* <Title>Tabla de usuarios</Title>
		<Widget /> */}
	</UsersList>
);

export default App;
