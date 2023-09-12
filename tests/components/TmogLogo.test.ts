import {mount} from '@vue/test-utils'
import Logo from "@/components/TmogLogo.vue"
import {expect, test} from "vitest"

test('it shows correct logo for light theme', () => {
    const wrapper = mount(Logo, {props: {theme: 'light'}})

    expect(wrapper.find('img').attributes()['src']).toMatch(/white/)
})

test('it shows correct logo for dark theme', () => {
    const wrapper = mount(Logo, {props: {theme: 'dark'}})

    expect(wrapper.find('img').attributes()['src']).toMatch(/black/)
})
