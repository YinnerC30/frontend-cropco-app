export function extractValueFromParentheses(inputString: string) {
  // Create a regular expression pattern to match the text within parentheses
  const regex = /\(([^)]+)\)/;

  // Apply the regular expression to the input string and capture the matched group
  const match = inputString.match(regex);

  // If there's a match, extract the captured value
  if (match) {
    return match[1];
  } else {
    return "No value found within parentheses";
  }
}
