// middlewares/validateRegister.js

const validateRegister = (req, res, next) => {
    const { fullname, email, password } = req.body;
    // console.log("Validating registration data:", req.body);

    if (!fullname || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // const allowedCategories = ['Buyer', 'Seller', 'Agent', 'Builder'];
    // if (!allowedCategories.includes(category)) {
    //     return res.status(400).json({ message: 'Invalid category' });
    // }

    next(); // all good, proceed to controller
};

export default validateRegister;
