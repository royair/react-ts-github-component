import {commitDates} from './commit-dates';
import {Calendar} from "./components/Calendar.tsx";

export default function App() {
  return (
      <div className="app">
        <Calendar commitDates={commitDates} />
      </div>
  );
}
