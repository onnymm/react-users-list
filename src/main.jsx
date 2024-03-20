import ReactDOM from 'react-dom';
import './index.css';

// const app = <img src='/react.svg' alt="" />
// const container = document.getElementById('root')

// ReactDOM.createRoot(app, container)

const App = () => <img src='/react.svg' alt='' />;

const container = document.getElementById('root');

ReactDOM.createRoot(container).render(<App />);
