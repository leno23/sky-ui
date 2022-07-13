import { defineComponent, toRefs } from 'vue';
export default defineComponent({
    name:'SButton',
    props:['type'],
    setup(props:any,{slots,emit}) {
        const {type} = toRefs(props)
        return () => {
            return <button class={`s-btn s-btn--${type.value}`}>{slots?.default?.()}</button>
        }
    },
})