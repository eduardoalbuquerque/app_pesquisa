import React, { useState, useEffect } from 'react';
import Filters from '../../components/Filters';
import './style.css';
import { barOptions, pieOptions } from './chart-options';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { buildBarSeries, getPlatformChartData, getGenderChartData } from './helpers'

type PieChartData = {
    labels: string[];
    series: number[];
}

type BarChartData = {
    x: string;
    y: number;
}

const initialPieData = {
    labels: [],
    series: []
}

const BASE_URL = 'http://localhost:8080';

const Charts = () =>{

const [barChartData, setbarChartData] = useState<BarChartData[]>([]);
const [platformData, setplatformData] = useState<PieChartData>(initialPieData);
const [genderData, setgenderData] = useState<PieChartData>(initialPieData);

useEffect(() =>{
    async function getDate(){
        const recordsResponse = await axios.get(`${BASE_URL}/records`);
        const gamesResponse = await axios.get(`${BASE_URL}/games/all`);
        const barData = buildBarSeries(gamesResponse.data, recordsResponse.data.content);
        setbarChartData(barData);
        const platformCharData = getPlatformChartData(recordsResponse.data.content);
        setplatformData(platformCharData);
        const genderChartData = getGenderChartData(recordsResponse.data.content);
        setgenderData(genderChartData);
    }
    getDate();
},[])

return (
    <div className="page-container">
        <Filters link= "/records" linkText="VER TABELA"/>
        <div className="chart-container">
            <div className="top-related">
                <h1 className="top-related-title">Jogos mais Votados</h1>
                <div className="games-container">
                    <Chart 
                    options={barOptions}
                    type="bar"
                    width="600"
                    height="650"
                    series={[{ data: barChartData }]}/>
                </div>
            </div>
            <div className="charts">
                <div className="platform-chart">
                    <h2 className="chart-title">Plataformas</h2>
                        <Chart 
                        options={{ ...pieOptions, lalels:platformData?.labels }}
                        type="donut"
                        series = {platformData?.series}
                        width="300"/>
                </div>
                <div className="gender-chart">
                    <h2 className="chart-title">Gêneros</h2>
                    <Chart 
                        options={{ ...pieOptions, lalels:genderData?.labels }}
                        type="donut"
                        series = {genderData?.series}
                        width="300"/>
                </div>

            </div>
        </div>
    </div>
)};

export default Charts;