import {mount} from '@vue/test-utils'
import AppOverlay from "@/components/AppOverlay.vue"
import {expect, test} from "vitest"

test('it is shown depending on props', async () => {
    const wrapper = mount(AppOverlay, {
        props: {show: true},
        global: {
            stubs: {'font-awesome-icon': true}
        }
    })

    expect(wrapper.find('.tmog-overlay').classes()).toContain('fixed')
    await wrapper.setProps({show: false})
    expect(wrapper.find('.tmog-overlay').classes()).toContain('hidden')
})