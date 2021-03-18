import { searchingWoeid } from '../sagas/wheather'
import { call, all, put } from 'redux-saga/effects'
import { fetchApi } from '../sagas/wheather'
import { actions as wheatherActions } from '../reducers/wheather'

describe('should search successfully', () => {
    const txt = 'london';
    const iterator = searchingWoeid({ payload: {txt} });
    it('should call api', () => {
        expect(iterator.next().value).toEqual(all([
            fetchApi(txt, 5),
            fetchApi(txt, 4),
            fetchApi(txt, 3),
            fetchApi(txt, 2),
            fetchApi(txt, 1),
        ]));
    })
    
    it('should put the response to reducer', () => {
        const data = [{ max_temp: 1, min_temp: 2}]
        expect(iterator.next(data).value).toEqual(put(wheatherActions.searchingSuccess(data)))
    })

    it('should end iterator', () => {
        expect(iterator.next().done).toBe(true)
    })
})

describe('should search failure', () => {
    const txt = 'london';
    const iterator = searchingWoeid({ payload: {txt} });
    it('should call api', () => {
        expect(iterator.next().value).toEqual(all([
            fetchApi(txt, 5),
            fetchApi(txt, 4),
            fetchApi(txt, 3),
            fetchApi(txt, 2),
            fetchApi(txt, 1),
        ]));
    })
    
    it('should throw error', () => {
        expect(iterator.throw('error').value).toEqual(put(wheatherActions.searchingError('error')));
    });

    it('should end iterator', () => {
        expect(iterator.next().done).toBe(true)
    })
})