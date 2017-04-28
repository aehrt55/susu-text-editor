import Button from './Button';
import Link from './Link';
import findLinkEntities from './findLinkEntities';

const Decorator = {
  strategy: findLinkEntities,
  component: Link,
};

export default Button;
export { Decorator, findLinkEntities, Link };
