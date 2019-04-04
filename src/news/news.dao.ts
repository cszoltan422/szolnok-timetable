import News from "./news.model";
import NewsResponse from "./news.response";
import logger from "../util/logger";
import ErrorObjectBuilder from "../util/errorobject.builder";

export function getNews(): Promise<Array<NewsResponse>> {
    return new Promise((resolve, reject) => {
        logger.info(`Fetching all news from database!`);
        News.find({}).select({ "effectiveDate": 1, "title": 1, "detailed": 1, "content": 1, "_id": 0 }).exec((err: any, data: any) => {
            if (err || !data) {
                logger.error(`Can\'t fetch news! Error: [ ${err} ], data: [ ${data} ]`);
                const returnObject = new ErrorObjectBuilder()
                    .setMessage("Internal Server Error")
                    .setCode(500)
                    .setErr(err)
                    .build();
                reject(returnObject);
                return;
            }
            resolve(data.map((e: any) => {
                const effectiveDate = e.effectiveDate;
                const title = e.title;
                const detailed = e.detailed;
                const content = e.content;
                return { effectiveDate, title, detailed, content };
            }));
        });
    });
}