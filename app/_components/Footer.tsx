import Image from "next/image";
import { format } from "date-fns";

export const Footer = () => {
  const currentYear = format(new Date(), 'yyyy');

  return (
    <section className="flex justify-center mt-12 my-2">
      <p>© RavenTech 2023-{currentYear}</p>
      <Image className="" width={36} height={36} src="/RavenTech.png" alt="RavenTech's Logo" />
    </section>
  );
};