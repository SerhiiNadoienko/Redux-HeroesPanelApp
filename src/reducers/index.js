const initialState = {
    heroes: [], //тут все персонажи
    heroesLoadingStatus: 'idle', //тут статус загрузки, по ум никакой
    filters: [], //тут фильтры  - all/вода/огонь и тд
    filtersLoadingStatus:'idle', //тут статус  загрузки фильтров
    activeFilter:'all' //по умолчанию активный фильтр стоит на all
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state, //разворот прошлого стейта
                heroesLoadingStatus: 'loading' //и просто статус в loading
            }
        case 'HEROES_FETCHED':
            return {
                ...state, //разворот прошлого стейта
                heroes: action.payload, 
                heroesLoadingStatus: 'idle' //в heroes пушим всех героев полученных с сервера
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error' //выдаем ошибку и в ui будем показывать какую то ошибку
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters:action.payload, //получили всех персонажей и пушим их в стейт filters
                filtersLoadingStatus: 'idle' //ставим загрузку в неактивную
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus:'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload //активным фильтров ставим тот который приходит
                
            }
        case 'HERO_CREATED':
            return {
                ...state,
                heroes: [...state.heroes, action.payload]
            }
           

        case 'HERO_DELETED':  
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload)
            }    
        default: return state
    }
}
export default reducer;