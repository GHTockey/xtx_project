import { rest } from "msw";
import { faker } from "@faker-js/faker/locale/zh_CN";
import Req from "@/utils/request";

// 定义请求拦截器
export const handlers = [
   rest.get('/test', (req, res, ctx) => {
      return res(
         ctx.status(200),
         // ctx.json({ message: 'Hello World' })
         ctx.json(
            makeArray(faker.number.int(20), () => ({
               name: faker.person.firstName(),
               avatar: faker.internet.avatar(),
               phone: faker.phone.number(),
               cityName: faker.location.city(),
               email: faker.internet.email(),
            }))
         )
      )
   }),
   // 我的收藏
   rest.get(`${Req.baseURL}/member/collect`, (req, res, ctx) => {
      return res(
         ctx.json({
            code: 200,
            message: "获取成功",
            result: {
               counts: 50,
               page: req.url.searchParams.get('page'),
               pageSize: req.url.searchParams.get('pageSize'),
               pages: 0,
               items: makeArray(10, () => {
                  return {
                     id: faker.string.uuid(),
                     name: faker.internet.userName(),
                     desc: faker.commerce.productDescription(),
                     price: faker.commerce.price(),
                     picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${faker.number.int(
                        { min: 1, max: 8 }
                     )}.jpg`,
                  }
               })
            }
         })
      )
   })
];

function makeArray(length: number, generator: () => any) {
   return Array.from({ length }, generator);
};