import Profile from "@/components/Profile";
import LinkCard from "@/components/LinkCard";
import { profile, links } from "@/lib/links";

export default function Home() {
  return (
    <div className="flex flex-1 items-start justify-center px-6 py-20 sm:px-8">
      <main className="flex w-full max-w-md flex-col items-center gap-10">
        <Profile profile={profile} />
        <div className="flex w-full flex-col gap-5">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>
      </main>
    </div>
  );
}
