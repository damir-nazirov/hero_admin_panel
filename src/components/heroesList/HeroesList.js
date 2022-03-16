import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {CSSTransition,TransitionGroup,} from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDelete } from '../../actions/actions';
import HeroesListItem from  "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss'

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, heroesLoadingStatus, filteredElements} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Что то не то со списком героев</h5>
    }

    const deleteElement = (id) => {
        const term = heroes.filter((item) => {return item.id !== id })
             request(`http://localhost:3001/heroes/${id}`, 'DELETE')
             .then(dispatch(heroDelete(term)))
             .then(console.log(term))   
            .catch(() => dispatch(heroesFetchingError()))
    }


    const renderHeroesList = (arr) => {
        
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        // if (filteredElements === 'all') {


 
        return arr.map(({id, ...props}) => {


            
            return (
            
                <CSSTransition
                key={id}  
                timeout={300}
                classNames="hero">
            <HeroesListItem deleteElement={deleteElement} id={id} {...props}/>
            </CSSTransition>
        )})
    // }
    }


    const elements = filteredElements === 'all'? renderHeroesList(heroes) : renderHeroesList(heroes.filter(item => item.element === filteredElements))
    // let term = heroes.filter(item => item.element === filteredElements)
    // let elements2 = renderHeroesList(term)


    return (
        <ul>
            <TransitionGroup component={null}>
                    {elements}
                </TransitionGroup>
        </ul>
    )
}

export default HeroesList;