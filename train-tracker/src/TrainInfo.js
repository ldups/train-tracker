import './styles/TrainInfo.css'

function TrainInfo({train}){
    console.log(train);
    const renderedStops = train.stations.map((s) => {
            return <tr><td>{s.stationCode}</td><td>{s.arrivalTime}</td>
            <td>{s.departureTime}</td></tr>
        })
    let punctualityClassName = train.punctuality == 'ON TIME' ? 'ontime' : 'late';
    return(
        <div className='train-info'>
            <h2 className='route'>{train.routeName} (#{train.number})</h2>
            <h3 className='direction'>From: {train.from}</h3>
            <h3 className='direction'>To: {train.to}</h3>
            <div className={punctualityClassName} >{train.punctuality}</div>
            <div>Last updated: {train.lastUpdate}</div>
            <table>
                <tr><th>Station</th><th>Arrived</th><th>Departed</th></tr>
                {renderedStops}
            </table>
        </div>
    )
}

export default TrainInfo;