export default function handler(req, res) {
    if (req.method === 'POST') {
        res.status(200).json({ coefficient1: 2.5, coefficient2: 3.7 });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}