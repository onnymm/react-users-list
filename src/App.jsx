// import Title from './components/Title';
import UsersList from './components/UsersList';
// import Test from './Test';


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
	<UsersList initialUsers={USERS}/>
);

export default App;
