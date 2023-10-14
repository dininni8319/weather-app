import classes from './LoadingSkeleton.module.css'
import Skeleton from 'react-loading-skeleton'

const LoadingMapSkeleton = () => {
  return (
    <div className={classes.cardContainer}>
          <Skeleton  
            width={200}
            height={160}
          />
        
    </div>
  )
}
export default LoadingMapSkeleton