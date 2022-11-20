import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { createSelector } from 'reselect';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const filteredHeroesSelector = createSelector(
        (state)=> state.filters.activeFilter,
        (state)=> state.heroes.heroes,
        (filter, heroes)=> {
            if(filter === 'all')  {
                return heroes;
            } else {
                return heroes.filter(item=> item.element === filter);
            }
        }
    )

    const filteredHeroes = useSelector(filteredHeroesSelector)
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);//достали только статус и поместили в переменную 
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes") //достаем всем героев 
            .then(data => dispatch(heroesFetched(data))) //передаем в reducer всех героев
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

   const onDelete = useCallback((id) => { // при нажатии на кнопку принимает id персонажа
        // Удаление персонажа по его id
        request(`http://localhost:3001/heroes/${id}`, "DELETE") //удаляем по определенному id
            .then(data => console.log(data, 'Deleted')) //консолим id Deleted
            .then(dispatch(heroDeleted(id))) //передаем в редюсер id удаленного перса
            .catch(err => console.log(err));
        // eslint-disable-next-line  
    }, [request]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => { //принимает массив героев
        if (arr.length === 0) {  //если героев нет то:
            return (
                <CSSTransition
                        timeout={0}
                        className='hero'>
                            <h5 className="text-center mt-5" style={{"color": 'white'}}>Героев пока нет</h5>
                </CSSTransition>
            )
        }

         return arr.map(({id, ...props}) => {  //достает id и прочие пропсы(name, description, element)
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            <TransitionGroup component='ul'>
            {elements}
            </TransitionGroup>
        </ul>
    )
}

export default HeroesList;