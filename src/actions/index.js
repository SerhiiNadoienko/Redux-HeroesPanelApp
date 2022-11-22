import { createAction } from '@reduxjs/toolkit'

//суть в том, какой аргумент принимает - такой в payload и пушим.А дальше в reducer
export const fetchHeroes =(request)=>(dispatch)=> {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes") //достаем всем героев 
        .then(data => dispatch(heroesFetched(data))) //передаем в reducer всех героев
        .catch(() => dispatch(heroesFetchingError())) 
} 

export const fetchFilters =(request)=>(dispatch)=> {
    dispatch(filtersFetching()); //просто ставим статус загрузки в loading
        request("http://localhost:3001/filters")   //делаем запрос на сервер
            .then(data => dispatch(filtersFetched(data)))  //получаем фильтры и передаем в креатор
            .catch(() => dispatch(filtersFetchingError())) 
} 


//тут просто обозначаем что отправали запрос на получение персов из сервера
export const heroesFetching =createAction('HEROES_FETCHING');

//получили персонажей с сервера
export const heroesFetched =createAction('HEROES_FETCHED');

//тут получаем ошибку при загрузке персонажей
export const heroesFetchingError =createAction('HEROES_FETCHING_ERROR');

//когда происходит загрузка фильтров с сервера
export const filtersFetching =createAction('FILTERS_FETCHING');

//когда фильтры с сервера получены и передаем их дальше  
export const filtersFetched =createAction('FILTERS_FETCHED');

//когда ошибка загрузки фильтров
export const filtersFetchingError =createAction('FILTERS_FETCHING_ERROR');

//когда меняется активный фильтр, принимает в себя какой именно фильтр 
export const activeFilterChanged =createAction('ACTIVE_FILTER_CHANGED');

//создали персонажа и передаем в payload
export const heroCreated =createAction('HERO_CREATED');

//принимает в себя id персонажа, которого нужно удалить
export const heroDeleted =createAction('HERO_DELETED');
