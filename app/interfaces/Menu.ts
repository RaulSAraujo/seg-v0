export interface Menu {
    icon: string | null;
    title: string;
    items: Page[]
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