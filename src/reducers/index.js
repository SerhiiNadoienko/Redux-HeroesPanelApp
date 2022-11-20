const initialState = {
    heroes: [], //тут все персонажи
    heroesLoadingStatus: 'idle', //тут статус загрузки, по ум никакой
    filters: [], //тут фильтры  - all/вода/огонь и тд
    filtersLoadingStatus:'idle', //тут статус  загрузки фильтров
    activeFilter:'all', //по умолчанию активный фильтр стоит на all
    filteredHeroes:[] //тут только отфильтрованные персонажи
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
                heroes: action.payload,  //в heroes пушим всех героев полученных с сервера
                filteredHeroes: state.activeFilter === 'all' ? //если сейчас фильтр стоит в all
                    action.payload: //то в filteredHeroes пушим все фильтры с сервера
                    action.payload.filter(item => item.element ===state.activeFilter), //иначе фильтруем каждый филтр чтобы он совпадал с активным фильтром, который не all
                    heroesLoadingStatus: 'idle' //загрузку ставим в бездействие
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
                activeFilter: action.payload, //активным фильтров ставим тот который приходит
                filteredHeroes: action.payload === 'all' ? //если filteredHeroes стоит на all
                    state.heroes: //то туда пушим всех персов со стейта
                    state.heroes.filter(item=> item.element === action.payload)//иначе фильтруем каждого персонажа из стейта, сравниваем значение элемента с пришедшим элементом(вода/огонь/воздух...)
            }
            
            
       
        case 'HERO_CREATED':
            let newCreatedHeroList = [...state.heroes, action.payload];//разворачиваем персов и пушим сюда новосозданного перса
            return {
                ...state,
                heroes:newCreatedHeroList,//теперь в heroes все старые персы + новый
                filteredHeroes: state.activeFilter === 'all'?
                newCreatedHeroList:
                newCreatedHeroList.filter(item=> item.element === state.activeFilter) //в newCreatedHeroList всё те же heroes, поэтому так же фильтруем по элементам как всегда выше
            }
           

        case 'HERO_DELETED':
            const newHeroList = state.heroes.filter(item => item.id !== action.payload); //остаылкс всех персонажей у которых не совпадает id
            return {
                ...state,
                heroes: newHeroList,
                filteredHeroes:state.activeFilter ==='all'?
                newHeroList:
                newHeroList.filter(item=> item.element === state.activeFilter)
            }    
        default: return state
    }
}

export default reducer;