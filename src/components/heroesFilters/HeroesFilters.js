import {useSelector, useDispatch} from 'react-redux'
import { addElementToFilter } from '../../actions/actions'

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом




const HeroesFilters = () => {
    const {filters, filteredElements} = useSelector(state => state)
    const dispatch = useDispatch();
    // console.log(filters);

    const filterElement =  (name) => {
            dispatch(addElementToFilter(name));

            console.log(filteredElements);
    }
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">

                    {filters.map(({className, label, name}) => <button key={label} onClick={() => filterElement(name)} className={`btn ${className}`} >{label}</button>)}
                    {/* <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;