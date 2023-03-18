import User from "../models/user.js"

export const findById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}


export const findAll = async (req, res) => {
    try {;
        const users = await User.find();
        res.status(200).json(users);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const save = async (req, res) => {
    try {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error saving user");
    }
};

export const edit = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).send('User not found');
      }
      res.send(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating user');
    }
  };
  
  export const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).send('User not found');
      }
      res.send(`User ${id} deleted successfully`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting user');
    }
  };


export const getPaginated = async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    try {
      const count = await User.countDocuments();
      const users = await User.find({})
        .sort({ [sortBy]: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit);  
      res.send({
        users,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving users');
    }
  };
  