/**
 * Format a given number or numeric string into Indian currency format
 * Example: 1234567 => ₹12,34,567.00
 */
export function formatToRupee(amount: number | string): string {
  const num = Number(amount);

  if (isNaN(num)) {
    throw new Error("Invalid amount: must be a number or numeric string");
  }

  return num.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
