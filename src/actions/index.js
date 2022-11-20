//суть в том, какой аргумент принимает - такой в payload и пушим.А дальше в reducer

//тут просто обозначаем что отправали запрос на получение персов из сервера
export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}
//получили персонажей с сервера
export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}
//тут получаем ошибку при загрузке персонажей
export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}
//когда происходит загрузка фильтров с сервера
export const filtersFetching =()=> {
    return {
        type: 'FILTERS_FETCHING'
    }
}
//когда фильтры с сервера получены и передаем их дальше  
export const filtersFetched =(filters)=> {
    return {
        type:'FILTERS_FETCHED',
        payload:filters
    }
}
//когда ошибка загрузки фильтров
export const filtersFetchingError=()=> {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}
//когда меняется активный фильтр, принимает в себя какой именно фильтр 
export const activeFilterChanged =(filter)=> {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter
    }
}
//создали персонажа и передаем в payload
export const heroCreated =(hero)=> {
    return {
        type:'HERO_CREATED',
        payload: hero
    }
}
//принимает в себя id персонажа, которого нужно удалить
export const heroDeleted =(id)=> {
    return {
        type:'HERO_DELETED',
        payload: id
    }
}
