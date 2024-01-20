export {}

declare module "vue-router" {
  interface RouteMeta {
    auth?: boolean
  }
}
