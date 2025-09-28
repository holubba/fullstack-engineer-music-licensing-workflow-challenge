export function generateTransitionErrorMessage(
  status: string,
  newStatus: string,
) {
  return `Cannot change license from ${status} to ${newStatus}`
}
