import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import { RecordResponse } from './types'
import { formatDate } from './helpers';
import Pagination from './pagination';
import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:8080'

const Records = () => {

    const [state, setstate] = useState<RecordResponse>();
    const [activePage,setActivePage] = useState(0);

    useEffect(() => {
        axios.get(`${BASE_URL}/records?min=2020-01-01T00:00:00Z&max=2020-07-31T00:00:00Z&page=${activePage}&linesPerPage=12&orderBy=moment&direction=DESC`)
        .then(response => setstate(response.data))
    }, [activePage])

    const handlePageChange = (index: number) => {
        setActivePage(index);
    }

    return (
        <div className="page-container">
            <div className="filters-container records-actions">
                <Link to="/charts">
                    <button className="action-filters">VER GRÁFICO</button>
                </Link>
            </div>
            <table className="records-table" cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <th>INSTANTE</th>
                        <th>NOME</th>
                        <th>IDADE</th>
                        <th>PLATFORMA</th>
                        <th>GÊNERO</th>
                        <th>TÍTULO DO GAME</th>
                    </tr>
                </thead>
                <tbody>
                    {state?.content.map(record =>(
                        <tr key={record.id}>
                            <td>{formatDate(record.moment)}</td>
                            <td>{record.name}</td>
                            <td>{record.age}</td>
                            <td className="text-secundary">{record.gamePlatform}</td>
                            <td>{record.genreName}</td>
                            <td className="text-primary">{record.gameTitle}</td>

                        </tr>
                    ))}
    
                </tbody>
            </table>
            <Pagination 
                activePage={activePage}
                goToPage={handlePageChange}
                totalPages={state?.totalPages}
            />
        </div>
    );
}


export default Records
