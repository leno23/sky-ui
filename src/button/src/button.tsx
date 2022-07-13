import { defineComponent, toRefs } from 'vue'
import { buttonProps } from './button-type'

export default defineComponent({
  name: 'SButton',
  props: buttonProps,
  setup(props: any, { slots, emit }) {
    const { type, size,disabled,block } = toRefs(props)
    return () => {
      const blockCls = block.value ? 's-btn--block' : ''
      return (
        <div class={`s-btn s-btn--${type.value}  s-btn--${size.value} ${blockCls} ${disabled.value && 'disabled'}`}>
          {slots?.default?.()}
        </div>
      )
    }
  }
})
