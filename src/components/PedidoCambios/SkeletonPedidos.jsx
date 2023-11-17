import { nanoid } from 'nanoid'
import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const SkeletonPedidos = () => {
  return (
<>

    {Array.from({ length: 10 }).map(() => (
        <tr key={nanoid()}>

          <td> 
            <SkeletonTheme baseColor="#202020" highlightColor="blue">
            <Skeleton />
          </SkeletonTheme>
          </td>
          <td> 
            <SkeletonTheme baseColor="#202020" highlightColor="blue">
            <Skeleton />
          </SkeletonTheme>
          </td>
          <td>
             <SkeletonTheme baseColor="#202020" highlightColor="blue">
            <Skeleton />
          </SkeletonTheme>
          </td>
          <td> 
            <SkeletonTheme baseColor="#202020" highlightColor="blue">
            <Skeleton />
          </SkeletonTheme>
          </td>
          <td> 
            <SkeletonTheme baseColor="#202020" highlightColor="blue">
            <Skeleton />
          </SkeletonTheme>
          </td>
          <td> 
            <SkeletonTheme baseColor="#202020" highlightColor="blue">
            <Skeleton />
          </SkeletonTheme>
          </td>
          <td>
            <SkeletonTheme baseColor="#202020" highlightColor="blue">
              <Skeleton />
            </SkeletonTheme>
          </td>
        </tr>

))}
</>

  )
}

export default SkeletonPedidos