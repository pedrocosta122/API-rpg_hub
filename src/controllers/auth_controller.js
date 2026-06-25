import UserService from '../services/user_service.js';

class AuthController {
    static async login(req, res, next) {
        try {
            const { email, password} = req.body;

            const result = await UserService.login(email, password);

            res.status(200).json(result);
        } catch(error) {
            next(error);
        }
    }
}

export default AuthController;