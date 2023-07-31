import {mount} from '@vue/test-utils'
import SearchInput from "@/components/CommandPalette/SearchInput.vue"
import {expect, test} from "vitest"

test('it emits an event when updated', () => {
    const wrapper = mount(SearchInput, {propsData: {modelValue: 'old value'}})

    wrapper.find('input[type="text"]').setValue('new value')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
})