import Image from "next/image";
import type { Profile as ProfileType } from "@/lib/links";

type ProfileProps = {
  profile: ProfileType;
};

export default function Profile({ profile }: ProfileProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="rounded-full bg-gradient-to-br from-white/80 to-orange-100/40 p-1.5 shadow-[0_8px_24px_-8px_rgba(180,110,60,0.45)]">
        <Image
          src={profile.photoUrl}
          alt={profile.name}
          width={112}
          height={112}
          className="h-28 w-28 rounded-full object-cover ring-1 ring-white/70"
          priority
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-[#3a2f28]">
          {profile.name}
        </h1>
        <p className="text-sm text-[#7a6a5c]">{profile.bio}</p>
      </div>
    </div>
  );
}
