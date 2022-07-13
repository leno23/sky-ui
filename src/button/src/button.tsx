import { defineComponent, toRefs } from 'vue'
import { buttonProps } from './button-type'

export default defineComponent({
  name: 'SButton',
  props: buttonProps,
  setup(props: any, { slots, emit }) {
    const { type, size } = toRefs(props)
    return () => {
      return (
        <button class={`s-btn s-btn--${type.value}  s-btn--${size.value}`}>
          {slots?.default?.()}
        </button>
      )
    }
  }
})
