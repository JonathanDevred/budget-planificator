import { ThemeToggleButton } from "./ThemeToggleButton";

export const Header = () => {
  return (
    <div className="flex flex-col items-center pt-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      <div className="flex-grow text-center md:pl-36">
        <h1 className="text-3xl sm:text-4xl font-bold">Planificateur de budget</h1>
      </div>
      <ThemeToggleButton />
    </div>
  );
};
