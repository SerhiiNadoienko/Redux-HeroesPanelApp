import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import store from '../../store';

import { filtersChanged, fetchFilters, selectAll } from './filtersSlice';
import Spinner from '../spinner/Spinner';


const HeroesFilters = () => {

    const {filtersLoadingStatus, activeFilter} = useSelector(state=> state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const {request} = useHttp();
    //делаем запрос на сервер для получения всех фильтров
    useEffect(() => {
        dispatch(fetchFilters(request)); //просто ставим статус загрузки в loading
        
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
                        onClick={()=>dispatch(filtersChanged(name))} //передаем имя кнопки в редюсер
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

