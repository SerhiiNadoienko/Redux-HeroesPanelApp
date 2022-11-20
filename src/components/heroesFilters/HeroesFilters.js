import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from 'classnames'; 

import {filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged} from '../../actions';
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state=> state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    //делаем запрос на сервер для получения всех фильтров
    useEffect(() => {
        dispatch(filtersFetching()); //просто ставим статус загрузки в loading
        request("http://localhost:3001/filters")   //делаем запрос на сервер
            .then(data => dispatch(filtersFetched(data)))  //получаем фильтры и передаем в креатор
            .catch(() => dispatch(filtersFetchingError())) //если не получили, то ошибку
        // eslint-disable-next-line
    }, []);

    if(filtersLoadingStatus === 'loading') { //если загрузка то спинер
        return<Spinner/>
    } else if (filtersLoadingStatus === 'error') { //если ошибка то текст
        return <h5 className ="text-center mt-5">Loading error...</h5>
    }

    const renderFilters =(arr)=> { //принимает массив фильтров
        if(arr.length === 0) {  
            return <h5 className="text-center mt-5">Filters not Found..</h5>
        }


        return arr.map(({name, className, label})=> {  //у фильтров в json есть и name, className-цвет, label
            const btnClass = classNames('btn', className, { //все будут кнопками+свой цвет
                'active': name === activeFilter  //стиль атива, если имя совпадает с активным фильтром
            });
             return <button
                        key={name}
                        id={name}
                        className={btnClass} //формируем тут стиль, который выше писали
                        onClick={()=>dispatch(activeFilterChanged(name))} //передаем имя кнопки в редюсер
                >{label}</button>
        })
    }

    const elements = renderFilters(filters)
    return (
        <div className="card shadow-lg mt-4" style={{"background": "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)", "color":"white"}}>
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                   {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;

