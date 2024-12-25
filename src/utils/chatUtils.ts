import { educationalTopics } from './educationalTopics';

export async function processMessage(input: string): Promise<string> {
  // Convert input to lowercase for easier matching
  const lowercaseInput = input.toLowerCase();
  
  // Check if the input is related to educational topics
  const isEducational = educationalTopics.some(topic => 
    lowercaseInput.includes(topic.toLowerCase())
  );

  if (!isEducational) {
    return "I'm your educational assistant. I can help you with studying, homework, and understanding academic concepts. Please ask me something related to education!";
  }

  // In a real application, this would call an AI service
  // For now, we'll return a simple response
  return generateEducationalResponse(input);
}

function generateEducationalResponse(input: string): string {
  if (input.includes('study') || input.includes('notes')) {
    return `Here's a structured way to study this topic:

1. Key Concepts
   - Break down the main ideas
   - Create bullet points
   - Use diagrams when helpful

2. Practice Questions
   - Start with basic concepts
   - Progress to complex problems
   - Regular self-testing

3. Review Strategy
   - Summarize in your own words
   - Teach concepts to others
   - Regular revision intervals`;
  }

  if (input.includes('solve') || input.includes('problem')) {
    return `Let's solve this step by step:

1. First, understand the problem clearly
2. Identify the key information
3. Choose the appropriate method
4. Work through systematically
5. Check your answer

Would you like me to explain any step in more detail?`;
  }

  return `I understand you're asking about ${input}. Let me help you break this down:

1. Core Concept
   - Basic definition and principles
   - Key terminology

2. Practical Applications
   - Real-world examples
   - Common uses

3. Further Learning
   - Related topics
   - Recommended resources

What specific aspect would you like to explore further?`;
}