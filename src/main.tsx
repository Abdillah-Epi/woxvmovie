import ReactDOM from 'react-dom/client';
import './tailwindcss/output.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import { location, routes } from './router';
import { Router } from '@tanstack/react-location';

const root = ReactDOM.createRoot(document.getElementById('root')!);

(async () => {
    // const isInDevelopmentMode = process.env.MODE === 'dev';

    // if (isInDevelopmentMode) {
    //     const { default: worker } = await import('../mocks');
    //     await worker.start();
    // }
    root.render(
        <div>
            <RecoilRoot>
                <Router {...{ location, routes }}>
                    <App />
                </Router>
            </RecoilRoot>
        </div>
    );
})();
