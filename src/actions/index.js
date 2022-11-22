import {filtersFetching, filtersFetched, filtersFetchingError} from '../components/heroesFilters/filtersSlice';
//суть в том, какой аргумент принимает - такой в payload и пушим.А дальше в reducer


export const fetchFilters =(request)=>(dispatch)=> {
    dispatch(filtersFetching()); //просто ставим статус загрузки в loading
        request("http://localhost:3001/filters")   //делаем запрос на сервер
            .then(data => dispatch(filtersFetched(data)))  //получаем фильтры и передаем в креатор
            .catch(() => dispatch(filtersFetchingError())) 
} 



