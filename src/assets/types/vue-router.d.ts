export {}

declare module "vue-router" {
  interface RouteMeta {
    dashboard_menu?: string
    dashboard_breadcrumb?: string[]
    depth: number
  }
}
