import User from "../models/User.js";

const createUser = async (req, res) => {
    try {
        // Ensure the required fields are present
        const { name, email, picture } = req.body;
        if (!name || !email || !picture) {
          return res
            .status(400)
            .json({ message: "Name, email, and picture are required" });
            
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(200).json({ message: "User already exists" },{user: existingUser});
          
        }
        const user = new User({ name, email, picture });
        await user.save();
        res.status(201).json({ message: "User created successfully", user });
        
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
        return;
        
    }
}

const getUserData = async (req, res) => {
    try {
        const email = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
       return res.status(200).json(user);
    } catch (error) {
       return res.status(500).json({ message: 'Error fetching user', error });
    }
}

const updateUserToProUser = async (req, res) => {
    try {
        const {email} = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.isPro = true;
        await user.save();
        return res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating user', error });
    }
}

export { createUser, getUserData, updateUserToProUser };