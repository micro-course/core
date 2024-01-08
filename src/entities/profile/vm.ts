import { Profile } from "./domain";

export const getProfileDisplayName = (profile: Profile) => {
  return profile.name && profile.name.length > 2 ? profile.name : profile.email;
};

export const getProfielLetters = (profile: Profile) => {
  const displaName = getProfileDisplayName(profile);

  const [a, b] = displaName.split("@")[0].split(/\.|\s|-/);

  if (!b) {
    return `${a[0]?.toUpperCase()}${a[1]?.toUpperCase()}`;
  }

  return `${a[0]?.toUpperCase()}${b[0]?.toUpperCase()}`;
};
