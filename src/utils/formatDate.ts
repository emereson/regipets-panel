export const formatDate = (dateInput: string) => {
  if (dateInput) {
    const delimiter = dateInput.includes("-") ? "-" : "/";
    const [year, month, day] = dateInput.split(delimiter).map(Number);

    const date = new Date(year, month - 1, day);

    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    const formattedDay = String(date.getDate()).padStart(2, "0");
    const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const formattedYear = date.getFullYear();

    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  }
};
