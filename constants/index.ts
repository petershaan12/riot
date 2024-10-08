export const headerLinks = [
  {
    label: "About",
    route: "/about",
    protected: false,
  },
  {
    label: "Events",
    route: "/events",
    protected: false,
  },
  {
    label: "Rank",
    route: "/rank",
    protected: false,
  },
  {
    label: "Create Event",
    route: "/events/create",
    protected: true,
  },
  {
    label: "Account",
    route: "/account",
    protected: true,
  },
  {
    label: "Rank Point",
    route: "/rank-point",
    protected: true,
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
  role: undefined,
  points: undefined,
};

