exports.verifyOnBlockchain = async (guideName) => {
  // Mock blockchain verification (true for first guide only)
  return guideName.includes("Amit");
};