declare module '*.vue' {
  import { ComponentOptions } from 'vue'

  const componentOptions: ComponentOptions

  export default componentOptions
}

declare module '*.jpeg' {
  const src: string
  export default src
}