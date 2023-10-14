import { api_id, api_secret } from "../utils"

type Props = {
  lat: string
  lon: string
}
const WeatherMap = ({ location }:{location:Props}) => {

  const mapURL = `https://maps.aerisapi.com/${api_id}_${api_secret}/flat,admin,radar/250x250/${location.lat},${location.lon},8/current.png`;
  return (
    <div className="flex justify-center my-5 md:my-0">
      <img
       src={mapURL}
       style={
         {
           width: '80%', 
           height: '60%', 
           borderRadius: "5px"
         }
       }
       alt={`Weather Map for`}
     />
    </div>
  );
};

export default WeatherMap;
