module.exports = componentName => `\
// @flow

import React, { PureComponent } from 'react';

type Props = {
  /** CSS modules style object */
  theme: {
    class${componentName}: string
  }
};

/**
 * NavBar
 * @extends PureComponent<Props>
 */
class ${componentName} extends PureComponent<Props> {
  render() {
    const { class${componentName} } = this.props;
    return (
      <div className={class${componentName}}>
        <h1>Hello from ${componentName}</h1>
      </div>
    );
  }
}

export default ${componentName};
`;
