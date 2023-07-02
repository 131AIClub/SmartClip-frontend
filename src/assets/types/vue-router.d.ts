export {}

declare module "vue-router" {
  interface RouteMeta {
    auth?: true
    depth: number
    dashboard_menu?: string
    dashboard_breadcrumb?: string[]
  }
}
