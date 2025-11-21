const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, AppToken } = require('../models');

class AuthService {
    async login(email, password, device, ip, tenant) {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) throw new Error('This email is not registered. Please check and try again.');

            const ok = await bcrypt.compare(password, user.password);
            if (!ok) throw new Error('Invalid credentials. Please try again.');

            const accessExpires = Number(process.env.JWT_EXPIRES_IN || 15);
            const refreshExpires = Number(process.env.JWT_REFRESH_EXPIRES_IN || 10080); // 7 days in minutes

            const accessToken = jwt.sign({ userId: user.id, tenantId: tenant?.id }, process.env.JWT_SECRET, {
                expiresIn: `${accessExpires}m`
            });

            const refreshToken = jwt.sign({ userId: user.id, tenantId: tenant?.id }, process.env.JWT_REFRESH_SECRET, {
                expiresIn: `${refreshExpires}m`
            });

            await AppToken.create(
                {
                    user_id: user.id,
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    expires_at: new Date(Date.now() + accessExpires * 60 * 1000),
                    refresh_expires_at: new Date(Date.now() + refreshExpires * 60 * 1000),
                    device,
                    ip_address: ip
                },
                {
                    userId: user.id // <- required for paper-trail to record actor
                }
            );

            return {
                user,
                accessToken,
                refreshToken
            };
        } catch (error) {
            console.error('Login error:', error.message);
            throw new Error(error.message || 'Login failed');
        }
    }

    async register(data) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const user = await User.create({
                email: data.email,
                password: hashedPassword
            });
            return user;
        } catch (err) {
            throw new Error(err.message || 'Registration failed');
        }
    }
}

module.exports = new AuthService();
