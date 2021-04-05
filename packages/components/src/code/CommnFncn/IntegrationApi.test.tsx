import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { searchComplaintsApi } from './IntegrationAPI';

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1ODg5LCJ1c2VybmFtZSI6InBheXRtIiwiZXhwIjoxNjE3MzcxNTcwLCJlbWFpbCI6IiIsIm9yaWdfaWF0IjoxNjE3MzUzNTcwfQ.4DM0WiERHY01_fGn5ehaNgbCV8m7Qe5tfS2rG4vEzVk"

// it("Api response", async function () {
//     const res = await searchComplaintsApi(token,
//         10,
//         1,
//         "2021-01-25T07:52:06.920Z",
//         "2021-02-08T07:52:06.919Z");
//     console.warn(await res.api());
//     expect(res.status).toEqual(200)
// })

describe('exception test', () => {
    it('should throw an error', async () => {
        const res = await searchComplaintsApi(token,
            10,
            1,
            "2021-01-25T07:52:06.920Z",
            "2021-02-08T07:52:06.919Z");
        expect(res.status).toEqual(200)
    })
})






