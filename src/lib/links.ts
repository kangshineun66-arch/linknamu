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
  name: "강신은",
  bio: "공기업인 : 법률(건설법), AI에 관심이 많아요",
  photoUrl: "/me.jpg",
};

export const links: LinkItem[] = [
  {
    id: "facebook",
    label: "🐴 페이스북",
    url: "https://www.facebook.com/gangsin.eun",
  },
  {
    id: "instagram",
    label: "🐯 인스타그램",
    url: "https://www.instagram.com/shin_eun_kang",
  },
  {
    id: "blog",
    label: "🦀 블로그",
    url: "https://blog.naver.com/ksemax",
  },
  {
    id: "email",
    label: "🦜 이메일",
    url: "mailto:kangshineun66@gmail.com",
  },
];
