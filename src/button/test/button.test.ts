import { render } from '@testing-library/vue'
import Button from '../src/button'

test('should work', () => {
  const { getByRole } = render(Button)
  getByRole('button')
})

test('default slot should be 按钮', () => {
  const { getByText } = render(Button)
  getByText('按钮')
})

test('slot should work', () => {
  const { getByText } = render(Button, {
    slots: {
      default() {
        return 'confirm'
      }
    }
  })
  getByText('confirm')
})

test('default prop tpye should be secondary', () => {
  const { getByRole } = render(Button)
  const button = getByRole('button')
  expect(button.classList.contains('s-btn--secondary')).toBe(true)
})

test('prop type should be work', () => {
  const { getByRole } = render(Button, {
    props: {
      type: 'primary'
    }
  })
  const button = getByRole('button')
  expect(button.classList.contains('s-btn--primary')).toBe(true)
})
