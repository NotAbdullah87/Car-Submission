const Car = require('../models/Car');

exports.submitCar = async (req, res) => {
  const { carModel, price, phoneNumber, city, maxPictures } = req.body;
  const images = req.files.map((file) => file.buffer.toString('base64'));
  const userId = req.user.id;

  try {
    const newCar = new Car({
      carModel,
      price,
      phoneNumber,
      city,
      maxPictures,
      images,
      user: userId,
    });

    await newCar.save();
    res.status(201).json({ message: 'Car submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserSubmissions = async (req, res) => {
  const userId = req.user.id;

  try {
    const submissions = await Car.find({ user: userId }).populate('user', 'email');
    res.status(200).json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
