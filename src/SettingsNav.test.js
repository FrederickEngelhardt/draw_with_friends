import React from "react"
import Enzyme,{ mount } from "enzyme"
import { expect } from 'chai'
import SettingsNav from "./components/SettingsNav"
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe("SettingsNav", () => {
  it('allows us to set props', () => {
    const wrapper = mount(<SettingsNav settingSelector={()=> true} />)
    expect(wrapper.props().settingSelector()).to.equal(true)
  });
});
