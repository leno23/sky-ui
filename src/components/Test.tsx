// 1.函数式组件
// export default () => <div>123</div>

import { defineComponent, ref, withModifiers } from 'vue';

// 2.defineComponent
// export default defineComponent({
//     render(){
//         return <div>test1</div>
//     }
// })

// 3.defineComponents setup
// 摒弃this 对ts支持最好
// 借助babel-plugin-jsx
export default defineComponent({
    directives:{
        focus:{
            mounted(el){
                el.focus()
            }
        }
    },
    emits:['click'],
    setup(props,{slots,emit}){
        const count = ref(0)
        const inc = () => {
            emit('click')
            count.value++
        }
        
        return () => (
            <>
                <div>{slots?.title?.()}</div>
                <div onClick={()=>console.log(111)}>
                    {/* 带修饰符的事件处理函数 */}
                    <div className="w-20 inline-block hover:border-transparent cursor-pointer hover:shadow-lg text-sky-800 border border-red-800 px-2" onClick={withModifiers(inc,['self','stop'])}>test1</div>
                    --
                    <div className='font-bold underline text-3xl '>{count.value}</div>
                    <input v-focus type="text" v-model={[count.value,'modelValue',['modifier','trim','lazy','number']]} />
                </div>
                <div>{slots?.default?.()}</div>
            </>
        )
    }
})