export interface ConfigMenu {
    icon: string | null;
    title: string;
    subMenus: SubMenu[]
}

export interface SubMenu {
    title: string;
    pages: Page[]
}

export interface Page {
    icon: string | null;
    title: string;
    name: string;
    menu: string;
    backUrl: string;
    auth: boolean;
    child: boolean;
}