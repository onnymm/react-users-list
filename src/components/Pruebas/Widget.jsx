import { useState } from 'react';
import style from './Widget.module.css';

const Widget = () => {
	const [number, setNumber] = useState(0);
	return (
		<div className={style.widget}>
			<div className={style.box}>{number}</div>
			<div>
				<div className={style.btns}>
					<button
						className='btn-style btn-small'
						onClick={() => {
							setNumber(number - 1);
						}}
					>
						-1
					</button>
					<button
						className='btn-style btn-small'
						onClick={() => {
							setNumber(number + 1);
						}}
					>
						+1
					</button>
					<button
						className='btn-style btn-small'
						onClick={() => {
							setNumber(number + 2);
						}}
					>
						+2
					</button>
				</div>
			</div>
		</div>
	);
};

export default Widget;
