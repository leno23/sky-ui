import { render } from '@testing-library/vue'
import Button from '../src/button'

test('shoud work',() => {
    const {getByRole} = render(Button)
    getByRole('button')
})