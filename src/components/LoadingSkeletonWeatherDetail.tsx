import classes from './LoadingSkeleton.module.css'
import Skeleton from 'react-loading-skeleton'

const LoadingSkeleton = () => {
  return (
    <div className={classes.cardContainer}>
          <Skeleton 
            width={100}
            height={20}

          />
          <Skeleton 
            width={120}
            height={50}
          />

          <Skeleton 
            width={40}
            height={15}
          />
          <Skeleton  
            width={180}
            height={20}
          />
          <Skeleton 
            width={120}
            height={20}
          />
    </div>
  )
}
export default LoadingSkeleton