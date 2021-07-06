import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false} className="row m-0 p-0 sec-main-bg text-white">
      <div>
        <span className="ml-1">&copy; 2021 Gilda Given.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
