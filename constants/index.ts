export const headerLinks = [
  {
    label: "About",
    route: "/about",
    protected: false,
    organization: false,
  },
  {
    label: "Events",
    route: "/events",
    protected: false,
    organization: false,
  },
  {
    label: "Rank",
    route: "/rank",
    protected: false,
    organization: false,
  },
  {
    label: "Create Event",
    route: "/events/create",
    protected: true,
    organization: true,
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

