import React, { PureComponent } from 'react'

import './R2.css'

import styled, { css } from 'styled-components';
import { RectAreaLight } from 'three';

const Title = styled.h1`   
  color:#F00;
  font-size: large;
  background-color: #ff00ff;
  
`
const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;

const Container = styled.div`
  text-align: center;
`

class R2 extends PureComponent {
  constructor(props){
    super(props);
    
  }

  render() {
    const style = { color: '#F00', fontSize: '62px' }
    return (
      <React.Fragment>
        <xxx>
          <Title>
            元素中的样式
          </Title>
          <ol>
            <li style={style}>元素中的样式</li>
            <li className="text-green-600">使用 class 的方式,但是在 react 中，class 要写成 className</li>
          </ol>
        </xxx>
        <Container>
          <Button>Normal Button</Button>
          <Button primary>Primary Button</Button>
        </Container>
      </React.Fragment>
    )
  }
}

export default R2
