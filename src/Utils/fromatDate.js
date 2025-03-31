export const formatDate = (date) => {
  return new Date(date).toLocaleTimeString("en-IN", {
    day: "numeric",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
