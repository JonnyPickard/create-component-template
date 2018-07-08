module.exports = componentName => `\
import React from 'react';
import { ${componentName} } from '../';

describe('<${componentName} />', () => {
  it('renders succesfully', () => {
    const wrapper = mount(<${componentName} />);
    expect(wrapper).toMatchSnapshot();
  });
});
`;
