import compose from 'koa-compose'

import root from './root'

export default compose([
  root.routes(),
  root.allowedMethods()
])
