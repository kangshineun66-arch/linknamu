export type LinkItem = {
  id: string;
  label: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  photoUrl: string;
};

export const profile: Profile = {
  name: "홍길동",
  bio: "개발자 · 만드는 것을 좋아합니다",
  photoUrl: "/profile.svg",
};

export const links: LinkItem[] = [
  { id: "facebook", label: "Facebook", url: "https://facebook.com" },
  { id: "instagram", label: "Instagram", url: "https://instagram.com" },
  { id: "blog", label: "블로그", url: "https://example.com/blog" },
  { id: "github", label: "GitHub", url: "https://github.com" },
];
