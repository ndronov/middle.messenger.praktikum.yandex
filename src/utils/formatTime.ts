function formatTime(dateISO: string): string {
  const date = new Date(dateISO);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes}`;
}

export default formatTime;
