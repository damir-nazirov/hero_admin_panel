// import {useSelector, useDispatch} from 'react-redux'
// import { addElementToFilter } from '../../actions/actions'
// import cn from 'classnames'
// import { useRef } from 'react';

// // Задача для этого компонента:
// // Фильтры должны формироваться на основании загруженных данных
// // Фильтры должны отображать только нужных героев при выборе
// // Активный фильтр имеет класс active
// // Изменять json-файл для удобства МОЖНО!
// // Представьте, что вы попросили бэкенд-разработчика об этом




// const HeroesFilters = () => {
//     return (
//         <div className="card shadow-lg mt-4">
//             <div className="card-body">
//                 <p className="card-text">Отфильтруйте героев по элементам</p>
//                 <div className="btn-group">

//                     {<View/>}
//                 </div>
//             </div>
//         </div>
//     )
// }


// const View = () => {
//     const dispatch = useDispatch();
//     const {filters, filteredElements} = useSelector(state => state)

//     console.log(filteredElements);
    


//     // const myRef = useRef([]);
//     // const onActive = (index) => {
//     //     myRef.current.forEach((item) => {
//     //             item.classList.remove('active');
              
//     //     })
//     //     myRef.current[index].classList.add('active')
//     //     myRef.current[index].focus()
//     // }



//     const filterElement =  (name) => {
           
//             dispatch(addElementToFilter(name));
//     }
//        return (
//     filters.map(({className, label, name }, i) => 
//                     <button key={label} 
//                         // ref={el => myRef.current[i] = el} 
//                         onClick={() => {filterElement(name);
//                                         console.log(name);}
//                                         // onActive(i)}
//                                     } 
//                         // className={name ===  filteredElements ? cn(`btn ${className}`, 'active') : `btn ${className}`}>
//                         className={name ===  filteredElements ? `btn ${className} active` : `btn ${className}`}> 

//                     {label}
//                     </button>))
// }

// export default HeroesFilters;



import {useSelector, useDispatch} from 'react-redux'
import { addElementToFilter } from '../../actions/actions'
import cn from 'classnames'

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом




const HeroesFilters = () => {
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">

                    {<View/>}
                </div>
            </div>
        </div>
    )
}


const View = () => {
    const dispatch = useDispatch();
    const {filters, filteredElements} = useSelector(state => state)


    const filterElement =  (name) => {
           
            dispatch(addElementToFilter(name));
    }
       return (
    filters.map(({className, label, name }, i) => 
                    <button key={name} 
                        onClick={() => {filterElement(name)}} 
                        className={cn('btn', className, {'active': name ===  filteredElements})}> 
                    {label}
                    </button>))
}

export default HeroesFilters;