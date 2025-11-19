import type { RouteLocationAsRelativeTyped, RouteMapGeneric } from "vue-router";

export interface Notifications {
    id: number;
    author: string;
    message: string;
    date: string;
    redirect?: RouteLocationAsRelativeTyped<RouteMapGeneric, string>;
}