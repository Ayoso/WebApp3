export default (req, res) => {
    if (req.method === 'POST') {
        // Ваш код для обработки POST-запроса
        res.status(200).json({ coefficient1: 1.5, coefficient2: 2.5 });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
