import ReactDOMClient from 'react-dom/client';
import './index.css';

const USERS = [
	{
		name: 'Pablo Castellanos',
		active: 'Activo',
		role: 'Profesor'
	},
	{
		name: 'José Miguel Fernández',
		active: 'Activo',
		role: 'Profesor'
	}
];

const Title = ({ children }) => <h1>{children}</h1>;

const User = ({ name, active, role }) => (
	<div className='user'>
		<span className='name'>{name}</span>
		<span className='active'>{active}</span>
		<span className='role'>{role}</span>
	</div>
);

const List = ({ users, children }) => {
	const usersRendered = users.map(user => <User key={user.name} {...user} />);
	return (
		<div className='list'>
			{children}
			{usersRendered}
		</div>
	);
};

const App = () => (
	<List users={USERS}>
		<Title>Listado de usuarios</Title>
	</List>
);

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
