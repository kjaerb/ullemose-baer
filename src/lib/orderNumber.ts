export function orderNumberGenerator() {
  const min = 10000000; // Minimum 8-digit number (10,000,000)
  const max = 99999999; // Maximum 8-digit number (99,999,999)
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}
