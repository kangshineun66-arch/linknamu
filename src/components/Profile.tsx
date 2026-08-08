import Image from "next/image";
import type { Profile as ProfileType } from "@/lib/links";

type ProfileProps = {
  profile: ProfileType;
};

export default function Profile({ profile }: ProfileProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Image
        src={profile.photoUrl}
        alt={profile.name}
        width={96}
        height={96}
        className="h-24 w-24 rounded-full object-cover"
        priority
      />
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        {profile.name}
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{profile.bio}</p>
    </div>
  );
}
