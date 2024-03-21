import { Component } from 'react';
import style from './UserStatus.module.css';

class UserStatus extends Component {
	render() {
		const activeClassName = this.props.active ? style.active : style.inactive;

		return (
			<span className={activeClassName}>
				{this.props.active ? 'Activo' : 'Inactivo'}
			</span>
		);
	}
}

export default UserStatus;
