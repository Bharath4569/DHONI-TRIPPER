exports.generateAIItinerary = async (interests, days, budget) => {
  // Mock AI logic (you can replace with real OpenAI or Gemini API)
  const plan = [];
  for (let i = 1; i <= days; i++) {
    plan.push(`Day ${i}: Explore ${interests}-related attractions in Jharkhand. Remaining budget: ₹${budget - i * 500}.`);
  }
  return plan;
};