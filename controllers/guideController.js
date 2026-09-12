exports.getGuides = async (req, res) => {
  // Dummy data (replace with DB + blockchainService check)
  res.json([
    { name: "Amit Kumar", photo: "assets/images/guide1.jpg", bio: "Expert in Ranchi region", isVerified: true },
    { name: "Ravi Das", photo: "assets/images/guide2.jpg", bio: "Specialist in adventure tours", isVerified: false }
  ]);
};
