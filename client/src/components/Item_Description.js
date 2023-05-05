import React from 'react'

const Item_Description = ({description}) => {
    let des = description.slice(0,140)
  return (
    <div>{des}....</div>
  )
}

export default Item_Description