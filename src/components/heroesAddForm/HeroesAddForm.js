// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
 
import {useHttp} from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { heroCreated } from '../../actions'; //экшн принимающий перса и заносящий в стейт ко всем  персам
import './heroesAddForm.scss';

 const HeroesAddForm = () => {
    //состояния контроля формы. Тут имя, описание и элемент
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr]= useState('');
    const [heroElement, setHeroElement] = useState('');

    const {filters, filtersLoadingStatus} = useSelector(state=> state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (e)=> {
        e.preventDefault();
        
        const newHero = {
            id:uuidv4(),
            name:heroName,          //подвязаны к useState
            description:heroDescr, //подвязаны к useState
            element: heroElement  //подвязаны к useState
        } 
        
        
        
        // Отправляем данные на сервер в формате JSON
        // ТОЛЬКО если запрос успешен - отправляем персонажа в store
        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
        .then(res => console.log(res, 'Отправка успешна'))
        .then(dispatch(heroCreated(newHero)))
        .catch(err => console.log(err));

        setHeroName('');
        setHeroDescr('');
        setHeroElement('');
    }


    const renderFilters = (filters, status)=> {
        if(status === 'loading') {                   
            return <option>Loading elements...</option>
        }else if (status === 'error') {
            return <option>Loading Error</option>
        }

        // Если фильтры есть, то рендерим их
        if(filters && filters.length > 0) {    //ЕСЛИ ЧЕ ТУТ ФОРМИРУЕМ ВЫПАДАЮЩИЙ СПИСОК
            return filters.map(({name, label})=> {  // перебираем все фмльтры("name": "water", "label": "Вода")
                // eslint-disable-next-line
                if(name === 'all') return;    //если name фильтра all то не рендерим этот опшен

                return <option key={name} value={name}>{label}</option> //иначе возвращаем опшены где лейбл это имя на русском 
            })
        }
    }

        

        return (
        <form /* className="border p-4 shadow-lg rounded" */  className='addForm glow ' onSubmit={onSubmitHandler}>
            <div className='grad'></div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    style={{
                        "height": '70px',
                        "backgroundColor": "#0F161D",
                        "color":"white"
                    }}
                    value={heroName} //делаем контролируемую форму, что попадает в стейт то и в инпут
                    onChange={(e)=> setHeroName(e.target.value)}  //записываем в стейт то что пишем 
                    />
                    
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px',
                    "resize": "none",
                    "backgroundColor": "#0F161D",
                    "color":"white"}}
                    
                    value={heroDescr}
                    onChange={(e)=>setHeroDescr(e.target.value)}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select xex" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    style={{"backgroundColor": "#0F161D",
                    "color":"white",
                    
                   }}
                    onChange={(e)=>setHeroElement(e.target.value)}>
                    <option value="">Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)} 
                </select> 
            </div>
            
            <button type="submit" className='btn-gradient' /* className="btn btn-primary" */>Создать</button>
        </form>
    )
}

export default HeroesAddForm;