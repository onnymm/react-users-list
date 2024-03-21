import ReactDOMClient from 'react-dom/client';
import './styles/index.css';
import './styles/resets.css';

// Components
import App from './App';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
