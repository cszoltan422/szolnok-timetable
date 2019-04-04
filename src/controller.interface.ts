import { Router } from 'express';

interface Controller {
    path: string;
    router: Router;

    setupRoutes(): void;
}

export default Controller;