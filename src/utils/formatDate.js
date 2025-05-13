import { CalendarMonth } from "@mui/icons-material";

export function formatDate(dateInput) {
  const date = new Date(dateInput);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return <div>
      <CalendarMonth /> {month} {day},{year}
  </div>;
}
