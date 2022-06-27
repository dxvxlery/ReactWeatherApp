import React, {useEffect, useRef, useState} from 'react';
import s from "./Weather.module.css";
import Visibility from "../../assets/visibility.svg"
import Humidity from "../../assets/humidity.svg"
import Temp from "../../assets/temp.svg"
import Wind from "../../assets/wind.svg"
import axios from 'axios';


const WeatherLayout: React.FC = () => {
    const [current, setCurrent] = useState<any>([]);
    const [location, setLocation] = useState<any>([]);
    const [conditions, setConditions] = useState<any>([]);
    const country = useRef<HTMLInputElement | null>(null);

    const getData = async (city?: string) => {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_KEY}&q=${city}&aqi=no`);
        setCurrent(response.data.current)
        setLocation(response.data.location)
        setConditions(response.data.current.condition)
    }
    useEffect(() => {
        getData('Moscow');
    }, []);
    console.log(conditions)
    const footerData = [
        {img: Visibility, name: "Visibility", value: current.vis_km},
        {img: Humidity, name: "Humidity", value: current.humidity},
        {img: Temp, name: "Feels like", value: current.feelslike_c},
        {img: Wind, name: "Wind", value: current.wind_kph}
    ];
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.setCountry}>
                    <input placeholder="Type any city" className={s.countyInput} ref={country} type="text"/>
                    <button className={s.searchButton} onClick={() => getData(country.current?.value)}>Search</button>
                </div>
                <div className={s.cardTop}>
                    <img className={s.cardImage} src={`https:${conditions.icon}`} alt=""/>
                    <div className={s.localInfo}>
                        <h3 className={s.locationName}>{location.name}</h3>
                        <p className={s.locationDate}>{location.localtime}</p>
                    </div>
                </div>
                <div className={s.cardMiddle}>
                    <h2 className={s.cardTemp}>{Math.round(current.temp_c)}°C</h2>
                    <p className={s.weatherDesc}>Mostly cloudy</p>
                </div>
                <div className={s.cardFooter}>
                    {
                        footerData.map((data, index) => (
                                <div className={s.moreInfo} key={index}>
                                    <img src={data.img} alt=""/>
                                    <p className={s.moreInfoTitle}>{data.name}</p>
                                    <p>{data.value}km</p>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default WeatherLayout;
