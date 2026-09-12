exports.createItinerary = async (req, res) => {
  const { interests, days, baseAmount, budget } = req.body;
  const validDays = Number(days) || 1;
  const validBaseAmount = Number(baseAmount) || 0;
  const validBudget = Number(budget) || validBaseAmount;

  const plan = [];
  for (let i = 1; i <= validDays; i++) {
    const remaining = Math.max(validBudget - (i * 500 + validBaseAmount), 0);
    plan.push(`Day ${i}: Visit top spots related to ${interests}. Base amount: ₹${validBaseAmount.toLocaleString("en-IN")}. Remaining estimate: ₹${remaining.toLocaleString("en-IN")}.`);
  }

  res.json({
    plan,
    baseAmount: validBaseAmount,
    budget: validBudget,
    interests,
    days: validDays
  });
};
