import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/heroesFilters/filtersSlice';
import { apiSlice } from '../api/apiSlice';

const stringMiddleware =()=>(next)=>(action)=> {
    if(typeof action === 'string') {
        return next({
            type:action
        })
    }
    return next(action);
}

/* const store = createStore(combineReducers({heroes, filters}),
                compose(applyMiddleware(ReduxThunk, stringMiddleware),
                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
               );

export default store; */

const store = configureStore({
    reducer:{filters,
            [apiSlice.reducerPath]: apiSlice.reducer
    },
    //к встроенному middleware добавляем наши собственные мидлы с помощью concat
    middleware: getDefaultMiddleware=>getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    devTools:process.env.NODE_ENV !== 'production',
    

})

export default store;