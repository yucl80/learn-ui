import React from 'react'
import { shallow } from 'enzyme'

import R1 from './r1.js'

it('renders without props', () => {
  shallow(<R1 />)
})
