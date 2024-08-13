export const headerLinks = [
  {
    label: "About",
    route: "/about",
    protected: false,
    admin: false
  },
  {
    label: "Events",
    route: "/events",
    protected: false,
    admin: false
  },
  {
    label: "Rank",
    route: "/rank",
    protected: false,
    admin: false
  },
  {
    label: "Create Event",
    route: "/events/create",
    protected: true,
    admin: true
  },
  {
    label: "My Profile",
    route: "/profile",
    protected: true,
    admin: false
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  url: "",
};

export const profilDefaultValues = {
  name: undefined,
  image: undefined,
  username: undefined,
  email: undefined,
  bio: undefined,
  password: undefined,
  newPassword: undefined,
};

