export const sidebar = [
  {
    route: "home",
    name: "home",
    icon: "mdi:home-outline",
  },
  {
    route: "search",
    name: "search",
    icon: "mdi:magnify",
  },
  {
    route: "programs",
    name: "programs_list",
    icon: "mdi:format-list-group",
  },
];

export const adminSidebar = [
  {
    route: "universities",
    name: "universities",
    icon: "mdi:format-list-group",
  },
  {
    route: "university-add?mode=create",
    name: "add_university",
    icon: "mdi:format-list-group-plus",
  },
  {
    route: "users-all",
    name: "users",
    icon: "mdi:account-group-outline",
  },
  {
    route: "news",
    name: "news",
    icon: "iconamoon:news-duotone"
  },
  {
    route: "news-add",
    name: "add_news",
    icon: "material-symbols:add-notes-outline"
  }
];

export interface IMenuItem {
    route: string;
    name: string;
    icon: string;
}