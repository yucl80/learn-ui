import React from 'react'
import { shallow } from 'enzyme'

import D3graphviz from './D3graphviz.js'

it('renders without props', () => {
  shallow(<D3graphviz />)
})
