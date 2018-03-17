module.exports = componentName => `\
import ${componentName} from '../';
import ${componentName}Theme from '../__themes__/${componentName}.scss';

export default {
  component: ${componentName},
  props: {
    theme: ${componentName}Theme
  }
}
`;
