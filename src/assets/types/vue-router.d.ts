export {}

declare module "vue-router" {
  interface RouteMeta {
    dashboard_menu?: string
    depth: number
  }
}
