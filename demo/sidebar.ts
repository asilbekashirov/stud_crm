export const sidebar = [
  {
    route: "home",
    name: "Home",
    icon: "mdi:home-outline",
  },
  {
    route: "search",
    name: "Search",
    icon: "mdi:magnify",
  },
  {
    route: "programs",
    name: "Programs List",
    icon: "mdi:format-list-group",
  },
];

export const adminSidebar = [
  {
    route: "users",
    name: "Users",
    icon: "mdi:account-group-outline",
  },
  {
    route: "universities",
    name: "Universities",
    icon: "mdi:format-list-group",
  },
  {
    route: "university-add",
    name: "Add University",
    icon: "mdi:format-list-group-plus",
  },
  {
    route: "users-all",
    name: "Users List",
    icon: "mdi:account-group-outline",
  }
];

export interface IMenuItem {
    route: string;
    name: string;
    icon: string;
}