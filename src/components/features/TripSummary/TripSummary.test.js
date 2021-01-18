import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  const testData = {
    id: 'test',
    tags: ['tag1', 'tag2', 'tag3'],
    image: 'image.jpg',
    name: 'testName',
    cost: '6.500',
    days: 14,
  };
  
  it('should generate link with correct id', () => {
    const expectedLink = '/trip/test';
    const component = shallow(<TripSummary id={testData.id} />);
    const renderedLink = component.find('.link').prop('to');
    
    expect(renderedLink).toEqual(expectedLink);
  });
  
  it('should render correct title and image', () => {
    const extepctedTitle = 'testName';
    const expectedImage = 'image.jpg';
    const component = shallow(<TripSummary 
      id={testData.id} 
      image={testData.image}
      name={testData.name}
    />);
    
    expect(component.find('img').prop('src')).toEqual(expectedImage);
    expect(component.find('img').prop('alt')).toEqual(extepctedTitle);
    expect(component.find('.title').text()).toEqual(extepctedTitle);
  });
  
  it('should render correct cost and days values', () => {
    const expectedCost = 'from 6.500';
    const expectedDays = '14 days';
    const component = shallow(<TripSummary
      cost={testData.cost}
      days={testData.days}
    />);
    
    expect(component.find('.details').childAt(0).text()).toEqual(expectedDays);
    expect(component.find('.details').childAt(1).text()).toEqual(expectedCost);
  });
  
  it('should render tags in correct order', () => {
    const expectedFirstTag = 'tag1';
    const expectedSecondTag = 'tag2';
    const expectedThirdTag = 'tag3';
    const component = shallow(<TripSummary
      tags={testData.tags} 
    />);
    
    expect(component.find('.tags').childAt(0).text()).toEqual(expectedFirstTag);
    expect(component.find('.tags').childAt(1).text()).toEqual(expectedSecondTag);
    expect(component.find('.tags').childAt(2).text()).toEqual(expectedThirdTag);
  });
});