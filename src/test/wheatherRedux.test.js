import Reducer, {
    actions as wheatherActions, selectors as wheatherSelectos, SEARCHING_REQUEST,
    SEARCHING_SUCCESS, SEARCHING_FAILURE,
} from '../reducers/wheather/index';

describe('actions', () => {
    it('searchingRequest action', () => {
        const txt = 'london'
        expect(wheatherActions.searchingRequest(txt)).toEqual({
            type: SEARCHING_REQUEST,
            payload: {
                txt
            }
        })
    });

    it('searchingSuccess action', () => {
        const data = [{
            city_id: "4119617",
            city_name: "London",
            country_code: "US",
            data: [{ rh: 80.1, max_wind_spd_ts: 1615597200, t_ghi: 5855.7, max_wind_spd: 4.6, solar_rad: 114.4 }],
            lat: 35.32897,
            lon: -93.25296,
            sources: ["723429-53920", "US1ARJH0001", "US1ARPP0017", "US1ARPP0008", "US1ARPP0001", "US1ARPP0012"],
            state_code: "AR",
            station_id: "723429-53920",
            timezone: "America/Chicago",
        }]
        expect(wheatherActions.searchingSuccess(data)).toEqual({
            type: SEARCHING_SUCCESS,
            payload: {
                wheather: data
            }
        });
    });
});

describe('Reducer', () => {
    it('should set a list', () => {
        const wheather = [{ test: 1 }]
        const state = {
            wheather: [],
            error: null,
        }
        const newState = Reducer(state, wheatherActions.searchingSuccess(wheather));
        expect(newState).toEqual({ wheather, error: '' });
    })
})