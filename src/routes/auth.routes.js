import { signup } from '#src/controllers/auth.controller.js';
import express from 'express';

const router = express.Router();

router.post('/sign-up', signup);

router.post('/sign-in', (req, res) => {
  // Handle signin logic here
  res.send('Signin endpoint');
});

router.post('/sign-out', (req, res) => {
  // Handle signout logic here
  res.send('Signout endpoint');
});

export default router;
