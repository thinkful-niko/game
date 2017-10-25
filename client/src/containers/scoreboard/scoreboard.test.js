import React from 'react';
import { shallow } from 'enzyme';

import { ScoreBoard } from './scoreboard';
import { getHighScores } from './reducers';


describe('<ScoreBoard />', () => {
  let wrapper;
  const scores = [{name: 'Test', score: 100}]
  beforeEach(() => {
    wrapper = shallow(<ScoreBoard highScores={scores} />);
  });

  it('--- Render ScoreBoard ---', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('--- Contains div with class name first ---', () => {
    expect(wrapper.contains(<div className='name first'>{scores[0].name}</div>)).toBe(true);
  });

  it('--- div with name first content equals Test ---', () => {
    expect(wrapper.find('.name.first').get(0).props.children).toBe(scores[0].name);
  });

  it('--- Contains div with class scoreboard-score first ---', () => {
    expect(wrapper.contains(<div className='scoreboard-score first'>{scores[0].score}</div>)).toBe(true);
  });

  it('--- div with scoreboard-score first content equals 100 ---', () => {
    expect(wrapper.find('.scoreboard-score.first').get(0).props.children).toBe(scores[0].score);
  });
})
