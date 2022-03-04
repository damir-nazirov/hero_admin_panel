import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { heroAdd, heroesFetchingError, filterFetchingError, filterFetching, filterFetched } from '../../actions/actions';
import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';



// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    // console.log('повтор')

    const {heroes, filters, filterLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();


   
    useEffect(() => {
        
        dispatch(filterFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filterFetched(data)))
            .catch(() => dispatch(filterFetchingError()))

        // eslint-disable-next-line
    }, []);


          

    const renderFilters = (filters, status) => {
        if (status === 'loading') {
            return <option>Элементы загружаются...</option>
        }

        if (status === 'error' || filters.length === 0) {
            return <option>Ошибка загрузки</option>
        }


        if (filters && filters.length > 0) {
            return filters.map(({name, label}) => {
                // Один из фильтров нам тут не нужен
                // eslint-disable-next-line
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
        
    }



    return (
        <Formik
        initialValues = {{
            name: '',
            description: '',
            element: '',
           
        }}

          validationSchema = {Yup.object({
            name: Yup.string()
                        .min(2, 'Must be at least 2 characters.')
                        .required('Обязательное поле'),
            description: Yup.string()
                        .min(5, 'Must be at least 15 characters.')
                        .required('Обязательное поле'),
            element: Yup.string().required('Выбери элемент'),
            
        })}

     onSubmit= {values =>  request(`http://localhost:3001/heroes/`, 'POST', JSON.stringify({...values, id: uuidv4()}))
     .then(dispatch(heroAdd([...heroes, {...values, id: uuidv4()}])))
     .catch(() => dispatch(heroesFetchingError()))
    }
            >

        <Form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <Field 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
                 <ErrorMessage name="name" component='div'/>    
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <Field
                    required
                    as='textarea'
                    name="description" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
                     <ErrorMessage name="description" component='div'/>   
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <Field 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    as='select'>
                         <option value="">Я владею элементом...</option>
                         {renderFilters(filters, filterLoadingStatus)}

                    
                </Field>
                <ErrorMessage name="element" component='div'/>   
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </Form>
        </Formik>
    )
}



export default HeroesAddForm;