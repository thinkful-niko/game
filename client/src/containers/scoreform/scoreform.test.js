import React from 'react';
import { shallow } from 'enzyme';

import { resetGame } from '../random/randomMap.js';
import ScoreForm from './scoreform';

describe('<ScoreForm />', () => {
  let wrapper;
  const testScore = 100;
  beforeEach(() => {
    wrapper = shallow(<ScoreForm score={testScore}  resetGame={resetGame}/>);
  });

  it('--- Render ScoreForm ---', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('--- Contains h1 ---', () => {
    expect(wrapper.contains(<h1 className='game-over'>GAME OVER</h1>)).toBe(true);
  });

  it('--- Contains p with final score ---', () => {
    expect(wrapper.contains(<p className='final-score'>{testScore}</p>)).toBe(true);
  });
  

  it('---- p with final score value ---', () => {
    expect(wrapper.find('p').get(0).props.children).toBe(testScore);
  });



  // it('--- handleSubmit ---', () => {
  //   wrapper.find('form').simulate('submit', { target: {name: "DVader"} });
  // });
});
