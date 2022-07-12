import React from 'react';
import ReactDOM from 'react-dom';
import './tailwindcss/output.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import { location, routes } from './router';
import { Router } from '@tanstack/react-location';

(async () => {
    const isInDevelopmentMode = process.env.MODE === 'dev';

    if (isInDevelopmentMode) {
        const { default: worker } = await import('./mocks');
        await worker.start();
    }
    ReactDOM.render(
        <React.StrictMode>
            <RecoilRoot>
                <Router {...{ location, routes }}>
                    <App />
                </Router>
            </RecoilRoot>
        </React.StrictMode>,
        document.getElementById('root')
    );
})();
