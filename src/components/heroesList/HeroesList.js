import {  useCallback, useMemo } from 'react';
import {  useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import {useGetHeroesQuery, useDeleteHeroMutation} from '../../api/apiSlice'
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {

    const {
        data: heroes =[],
        isLoading,
        isError
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroMutation();

    const activeFilter = useSelector(state=> state.filters.activeFilter)
    
    const filteredHeroes =useMemo(()=> {
        const filteredHeroes = heroes.slice();
        if(activeFilter === 'all')  {
            return filteredHeroes;
        } else {
            return filteredHeroes.filter(item=> item.element === activeFilter);
        }
    }, [heroes, activeFilter])
 
   const onDelete = useCallback((id)=> { 
        deleteHero(id)
        // eslint-disable-next-line  
    }, []);

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => { //принимает массив героев
        if (arr.length === 0) {  //если героев нет то:
            return (
                <CSSTransition
                        timeout={0}
                        className='hero'>
                            <h5 className="text-center mt-5" style={{"color": 'white', 'position': 'absolute'}}>Героев пока нет</h5>
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