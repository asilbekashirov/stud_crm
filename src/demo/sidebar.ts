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
    icon: "iconamoon:news-duotone",
  },
  {
    route: "news-add",
    name: "add_news",
    icon: "material-symbols:add-notes-outline",
  },
];

export const adminSidebar2 = [
  {
    name: "analytics",
    route: "analytics",
    icon: "ic:twotone-analytics"
  },
  {
    name: "universities",
    icon: "solar:buildings-3-bold-duotone",
    children: [
      {
        name: "list",
        route: "universities",
        icon: "solar:list-bold-duotone",
      },
      {
        route: "university-add",
        name: "add",
        icon: "solar:widget-add-line-duotone",
        params: "?mode=create",
      },
    ],
  },
  {
    name: "news",
    icon: "iconamoon:news-duotone",
    children: [
      {
        name: "list",
        route: "news",
        icon: "solar:list-bold-duotone",
      },
      {
        route: "news-add",
        name: "add",
        params: "?mode=create",
        icon: "solar:widget-add-line-duotone",
      },
    ],
  },
  {
    name: "users",
    route: "users-all",
    icon: "mdi:account-group-outline",
  }
];

export interface IMenuItem {
  route?: string;
  name: string;
  icon: string;
  children?: Omit<IMenuItem[], "children">;
  params?: string;
}
