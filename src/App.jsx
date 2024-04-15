// import Title from './components/Title';
import UsersList from './components/UsersList';
// import Test from './Test';


const USERS = [
	{
		username: 'pablo',
		name: 'Pablo Castellanos',
		active: true,
		role: 'teacher'
	},
	{
		username: 'jose',
		name: 'José Miguel Fernández',
		active: true,
		role: 'teacher'
	},
	{
		username: 'javier',
		name: 'Javier López',
		active: false,
		role: 'student'
	}
];

const App = () => (
	<UsersList initialUsers={USERS}/>
);

export default App;
