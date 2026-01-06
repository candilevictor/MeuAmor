import bcrypt from 'bcryptjs';

const users = [
    { name: 'Giovanna', passwordHash: '$2a$10$u1wJ6EXAMPLEHASHb1xWpzq/6xRzM7pZ1uFak1u1t6gF9dG5fL9mK' }, // AmorDoVictor
    { name: 'Victor', passwordHash: '$2a$10$V7yEXAMPLEHASHQhK6x7nqf4l7jL2b9tR2zN3e6uR5xG4mF1pT0sWq' } // AmorDaGiovanna
];


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, password } = req.body;
        const user = users.find(u => u.name === name);
        if (user && await bcrypt.compare(password, user.passwordHash)) {
            res.status(200).json({ success: true });
        } else {
            res.status(401).json({ success: false });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
