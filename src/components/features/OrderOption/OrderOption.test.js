import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';

describe('Component OrderOption', () => {
  const option = 'icons';
  const name = 'testName';
  it('should render without crashing', () => {
    const component = shallow(<OrderOption type={option} name={name} />);
    
    expect(component).toBeTruthy();
  });
  
  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    
    expect(component).toEqual({});
  });
  
  it('should render with correct title', () => {
    const expectedTitle = name;
    const component = shallow(<OrderOption type={option} name={name} />);
    
    expect(component.find('.title').text()).toEqual(expectedTitle);
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: true,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes) {
  describe(`Component OrderOption with type=${type}`, () => {
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;
    
    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(<OrderOption 
        type={type} 
        setOrderOption={mockSetOrderOption}
        {...mockProps} 
        {...mockPropsForType[type]}
      />);
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1); 
    });
    
    switch (type) {
      case 'dropdown': {
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);
        
          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(0);
        
          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });
        
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'number': {
        it('contains div with input', () => {
          const select = renderedSubcomponent.find('div .inputSmall');
          
          expect(select.prop('value')).toBe(1);
          expect(select.length).toBe(1);
        });
        
        it('should run setOrderOption function on change', () => {
          const select = renderedSubcomponent.find('div .inputSmall');
          select.simulate('change', {currentTarget: {value: testValueNumber}});
          
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: 3});
        });
        break;
      }
      case 'text': {
        it('contains div with input', () => {
          const select = renderedSubcomponent.find('div input[type="text"]');
          
          expect(select.length).toBe(1);
        });
        
        it('should run setOrderOption function on change', () => {
          const select = renderedSubcomponent.find('div input[type="text"]');
          select.simulate('change', {currentTarget: {value: testValue}});
          
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValue});
        });
        break;
      }
      case 'icons': {
        it('contains div with options', () => {
          const select = renderedSubcomponent.find('div div');
          
          expect(select.length).toBe(2);
          expect(select.at(0).text()).toBe('<Icon />' + 'Lorem A $0');
          expect(select.at(1).text()).toBe('<Icon />' + 'Lorem X $100');
        });
        
        it('should run setOrderOption function on click', () => {
          const select = renderedSubcomponent.find('div div');
          select.at(1).simulate('click');
          
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({'abc': 'xyz'});
        });
        break;
      }
      case 'checkboxes' : {
        it('contains div with inputs', () => {
          const select = renderedSubcomponent.find('.checkboxes');
          const inputsSize = select.find('input[type="checkbox"]').length;
          const inputs = select.find('input[type="checkbox"]');

          expect(inputsSize).toBe(2);
          expect(inputs.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(inputs.at(1).prop('value')).toBe(mockProps.values[1].id);
        });
        
        it('should run setOrderOption function on change', () => {
          const select = renderedSubcomponent.find('.checkboxes');
          const input = select.find(`input[value='${testValue}']`);
          input.simulate('change', {currentTarget: {checked: true}});
          
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: [mockProps.currentValue, testValue]});
        });
        break;
      }
    }
  });
}