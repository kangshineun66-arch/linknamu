import Profile from "@/components/Profile";
import LinkList from "@/components/LinkList";
import { profile, links } from "@/lib/links";

export default function Home() {
  return (
    <div className="flex flex-1 items-start justify-center px-6 py-20 sm:px-8">
      <main className="flex w-full max-w-md flex-col items-center gap-10">
        <Profile profile={profile} />
        <LinkList links={links} />
      </main>
    </div>
  );
}
