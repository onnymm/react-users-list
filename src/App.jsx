import Title from './components/Title';
import UsersList from './components/UsersList';

const USERS = [
	{
		name: 'Pablo Castellanos',
		active: true,
		role: 'teacher'
	},
	{
		name: 'José Miguel Fernández',
		active: true,
		role: 'teacher'
	},
	{
		name: 'Javier López',
		active: false,
		role: 'student'
	}
];

const App = () => (
	<UsersList users={USERS}>
		<Title>Tabla de usuarios</Title>
	</UsersList>
);

export default App;
