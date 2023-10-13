import classes from './LoadingSkeleton.module.css'
import Skeleton from 'react-loading-skeleton'

const LoadingSkeletonCard = () => {
  return (
    <div className={classes.cardContainer}>
          <Skeleton 
            width={100}
            height={20}
            count={3}
          />
          <Skeleton  
            width={160}
            height={20}
          />
          <Skeleton 
            width={50}
            height={50}
            className='rounded-full'
          />
    </div>
  )
}
export default LoadingSkeletonCard